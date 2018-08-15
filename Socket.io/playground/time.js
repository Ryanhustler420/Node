var moment = require('moment');


//jan 1st 1970 00:00:00 am
var date = new Date();
var months = ['Jan','Feb'];
console.log(date.getMonth());


var date = moment();
date.add(1,'year').subtract(9,'months');
console.log(date.format(`MMM Do, YYYY`));

// var date = moment();
// console.log(date.format('h:mm a'));

// 10:35 am
// 6:01 am
