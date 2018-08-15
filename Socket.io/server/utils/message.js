var moment = require('moment');

var generateMessage = (from,text) => {
  var createdAt = moment(new Date().getTime()).format('h:mm a');
  return {from,text,createdAt}
}

var generateLocationMessage = (from,latitude,longitude) => {
  var createdAt = moment(new Date().getTime()).format('h:mm a');
  return{
    from,
    url:`https://www.google.com/maps?q=${latitude},${longitude}`,
    createdAt
  };
}

module.exports = {generateMessage,generateLocationMessage};
