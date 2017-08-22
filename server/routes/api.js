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

module.exports = router;