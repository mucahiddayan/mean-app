const express = require('express');
const router = express.Router();

var mongodb = require('mongodb');

const ObjectId = mongodb.ObjectID;
const MongoClient = mongodb.MongoClient;  
const URL = "mongodb://localhost:27017/mongo";

/* GET api listing. */
router.get('/', (req, res) => {
    res.send('api works');
});

// Get all posts
router.get('/posts', (req, res) => {
    MongoClient.connect(URL,(err,db)=>{
        if(err){
            console.log(`Unable to connect to the server`,err);
        }
        else{
            console.log("Connection established");
            
            var collection = db.collection('students');
            
            collection.find().toArray((err,result)=>{        
                if(err){
                    res.send(err);
                }
                else if(result.length){
                    res.json(result);                   
                }else{
                    res.send('No documents found');
                }
                
                db.close();
            });
        }
    });
});

function getNextSequence(counters,name) {
    var ret = counters.findAndModify(
        {
            query: { _id: name },
            update: { $inc: { seq: 1 } },
            new: true
        }
    );
    
    return ret.seq;
}

//add student
router.post('/addstudent',(req,res)=>{   
    
    console.log('post addstudent called');
    MongoClient.connect(URL,(err,db)=>{
        if(err){
            console.log(`Unable to connect to the server`,err);
        }
        else{
            console.log("Connection established");
            
            var collection = db.collection('students');
            var counters = db.collection('counters');
            
            var {name,street,city,sex,gpa,age} = req.body;
            var _id =  getNextSequence(counters,"userid");
            var student1 = {name,street,city,sex,age,gpa,_id};
            console.log(student1);
            
            collection.insert([student1],(err,result)=>{
                if(err){
                    console.log(`Unable to connect to the server`,err);
                }
                else{
                    res.redirect('posts');
                }
                
                db.close();
            });
        }
    });
});

router.post('/deletestudent',(req,res)=>{   
    MongoClient.connect(URL,(err,db)=>{
        if(err){
            console.log(`Unable to connect to the server`,err);
        }
        else{
            console.log("Connection established");
            
            var collection = db.collection('students');
            console.log(req.body);
            
            collection.remove({"_id":ObjectId(req.body._id)},(err,result)=>{
                if(err){
                    console.log(`Unable to connect to the server`,err);
                }
                else{
                    console.log('deleted successfully');
                    res.redirect('posts');
                }
                
                db.close();
            });
        }
    });
});

module.exports = router;