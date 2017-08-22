// Get dependencies
const express   = require('express');
const path      = require('path');
const http      = require('http');
const bodyParser= require('body-parser');

// Get our api routes
const api       = require('./server/routes/api');


const app       = express();

// Parser for POST Data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

// Point static path to Dist
app.use(express.static(path.join(__dirname,'dist')));

// set our api routes
app.use('/api',api);

// Cath all the other routes and return index file
app.get('*',(req,res)=>{
    res.sendFile(path.join(__dirname,'./dist/index.html'));
});

/**
* Get port from environment and store in Express
*/
const port = process.env.PORT || '3000';
app.set('port',port);

/**
* Create a HTTP Server
*/
const server  = http.createServer(app);

/** 
* Listen in provided port, on all network interfaces
*/

server.listen(port,()=> console.log(`API running on localhost ${port}`));