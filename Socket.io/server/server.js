const http = require('http');
const path = require('path');
const express = require('express');
const socketIO = require('socket.io');

const {Users} = require('./utils/users');
const {generateMessage,generateLocationMessage} = require('./utils/message');
const {isRealString} = require('./utils/validation');
const publicPath = path.join(__dirname,'../public');
const port = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);
var io = socketIO(server);
var users = new Users();

app.use(express.static(publicPath));

io.on('connection',(socket) => {
  console.log('new user connected!');

  socket.on('join',(params,callback) => {
    if(!isRealString(params.name) || !isRealString(params.room)){
      callback('Name and room name are required.');
    }
    socket.join(params.room);
    //socket.leave('The Office fans');

    socket.join(params.room);
    users.removeUser(socket.id);
    users.addUsers(socket.id,params.name,params.room);

    io.to(params.room).emit('updateUserList',users.getUserList(params.room));

    //io.emit -> io.to('the Office fans') = sends to every one
    //socket.broadcast.emit -> socket.broadcast.to('the office fans') = send to everyone except the user
    // socket.emit = only one user emit


    //this function will called by all user who connect with the server and they have to
    // impliment this as socket.on('userConnected',function(mess)=>{console.log(mess);}) => to get message greeting
    socket.emit('newMessage',generateMessage('Admin','Welcome to chat app'));

    //here user information is populating via user connection to server
    socket.broadcast.to(params.room).emit('newMessage',generateMessage('Admin',`${params.name} is now joined`));

    callback();
  });

  //called by client like socket.emit('createMessage',{from:"user",text:'watching tv'});
  socket.on('createMessage',(createdMessage,callback) => {
    var user = users.getUser(socket.id);

    if(user && isRealString(createdMessage.text)){
      io.to(user.roomName).emit('newMessage',generateMessage(user.name,createdMessage.text));
      callback('');
    }
    // broadcast => with broadcast we can send data to all user but we cant
    // see the message back object this is very helpful when we connected to
    // the app where all users will know that "SomeUserName" connect and we will
    // see "welcone SomeUserName" as toast.
    // socket.broadcast.emit('newMessage',{
    //     from:createdMessage.from,
    //     text:createdMessage.text,
    //     createdAt:new Date().getTime()
    // });
  });

  socket.on('createLocationMessage',(coords) => {
    var user = users.getUser(socket.id);
    if(user)
      io.to(user.roomName).emit('newLocationMessage',generateLocationMessage(user.name,coords.latitude,coords.longitude));
  });

  socket.on('disconnect',() => {
    var user = users.removeUser(socket.id);
    if(user){
      io.to(user.roomName).emit('updateUserList',users.getUserList(user.roomName));
      io.to(user.roomName).emit('newMessage',generateMessage("Admin",`${user.name} has left`));
    }
  });
});

server.listen(port,() => {
  console.log(`server is up on port ${port}`);
});
