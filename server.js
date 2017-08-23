// Get dependencies
const express   = require('express');
const path      = require('path');
const http      = require('http');
const bodyParser= require('body-parser');


const app       = express();

/**
* Create a HTTP Server
*/
const server  = http.createServer(app);

const io        = require('socket.io')(server);

// Get our api routes
const api       = require('./server/routes/api');



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
 * SOCKET.IO
 */

io.on('connection',(socket)=>{
    console.log('user connected');

    socket.on('disconnect',()=>{
        console.log('user disconnected');
    });

    socket.on('leave',()=>{
        console.log('user left the tab');
    });

    socket.on('focus',()=>{
        console.log('user is back');
    });

    socket.on('add-message',(message)=>{
        io.emit('message',{type:'new-message',text:message});
    });
});

/** 
* Listen in provided port, on all network interfaces
*/

server.listen(port,()=> console.log(`API running on localhost ${port}`));