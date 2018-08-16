// this function is for client side
var socket = io();


function scrollToBottom(){
  //Selectors
  var messages = jQuery("#messages");
  var newMessage = messages.children('li:last-child');
  //Heights
  var clientHeight = messages.prop('clientHeight');
  var scrollTop = messages.prop('scrollTop');
  var scrollHeight = messages.prop('scrollHeight');

  var newMessageHeight = newMessage.innerHeight();
  var lastMessageHeight = newMessage.prev().innerHeight;

  if(clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight){
    messages.scrollTop(scrollHeight);
  }
}


socket.on('connect',function(){
  console.log('connected to server');
  socket.emit('informAll',{userName:'Anonymouse'});
});

//this function is as generic function and will be called as soon as user connected with server
// and trigger the server emitters.
socket.on('newMessage',function(emails){
  var template = jQuery('#message-template').html();
  var html = Mustache.render(template,{
    from:emails.from,
    text:emails.text,
    time:emails.createdAt
  });

  jQuery('#messages').append(html);
  scrollToBottom();
});


socket.on('newLocationMessage',function(message){
  // var li = jQuery('<li></li>');
  // var a = jQuery('<a target="_blank">My Current Location</a>');
  //
  // li.text(`${message.from}:`);
  // a.attr('href',message.url);
  //
  // li.append(a);
  // url

  var template = jQuery('#location-message-template').html();
  var html = Mustache.render(template,{
    from:message.from,
    url:message.url,
    time:message.createdAt
  });

  jQuery('#messages').append(html);
  scrollToBottom();
});
// socket.emit('createMessage',{
//   from:'Frank',
//   text:'Hi\''
// },function(){
//   console.log('got it');
// });

jQuery('#message-form').on('submit',function(e){
  e.preventDefault();

  var messageTextbox = jQuery('[name=message]');

  socket.emit('createMessage',{
    from:'User',
    text:messageTextbox.val()
  },function(){
    messageTextbox.val('');
    //some code here...
  });
});

var locationButton = jQuery('#send-location');
locationButton.on('click',function(){
  if(!navigator.geolocation){
    return alert('Geolocation not supported by your browser');
  }

  locationButton.attr('disabled','disabled').text('Sending location...');

  navigator.geolocation.getCurrentPosition(function(position){
    locationButton.removeAttr('disabled').text('share location');
    // console.log(position);
    socket.emit('createLocationMessage',{
      latitude:position.coords.latitude,
      longitude:position.coords.longitude
    })
  },function(){
    locationButton.removeAttr('disabled').text('share location');
    alert('unable to fetch location');
  });
});
