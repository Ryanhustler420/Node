// this function is for client side
var socket = io();

socket.on('connect',function(){
  console.log('connected to server');
  socket.emit('informAll',{userName:'Gaurav'});
});

//this function is as generic function and will be called as soon as user connected with server
// and trigger the server emitters.
socket.on('newMessage',function(emails){
  console.log('newMessage',emails);
  var li = jQuery('<li></li>');
  li.text(`${emails.from}: ${emails.text}`);

  jQuery('#messages').append(li);
});

// socket.emit('createMessage',{
//   from:'Frank',
//   text:'Hi\''
// },function(){
//   console.log('got it');
// });

jQuery('#message-form').on('submit',function(e){
  e.preventDefault();
  socket.emit('createMessage',{
    from:'User',
    text:jQuery('[name=message]').val()
  },function(){
    //some code here...
  })
});
