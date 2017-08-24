const express = require('express');
const router = express.Router();

var mongodb = require('mongodb');

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
            
            var {name,street,city,sex,gpa,age} = req.body;
            var student1 = {name,street,city,sex,age,gpa};
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

module.exports = router;