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

var emailStore = [{
  from:'Gupta@example.com',
  text:'Hey. What is going on.',
  createdAt:123
},{
  from:'Mike@example.com',
  text:'Gaurav Happy Birthday',
  createdAt:123
},{
  from:'Jane@example.com',
  text:'Hey.Gaurav are you there',
  createdAt:123
}];

//this is for server event
io.on('connection',(socket) => {
  console.log('new user connected!');

  //Sender
  socket.emit('newMessage',emailStore);

  //Receiver
  socket.on('createMessage',(createdMessage) => {
    console.log('userCreatedMessage',createdMessage);
  });

});

server.listen(port,() => {
  console.log(`server is up on port ${port}`);
});
