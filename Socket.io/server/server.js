const http = require('http');
const path = require('path');
const express = require('express');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname,'../public');
const port = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

//register an event listener we listen for
// diffrent event and do something with that


//this is for server event
io.on('connection',(socket) => {
  console.log('new user connected!');
  socket.on('disconnect',() => {
    console.log('Disconnected from Client');
  });
});

server.listen(port,() => {
  console.log(`server is up on port ${port}`);
});
