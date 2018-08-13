var {User} = require('../models/users');

var authenticate = (req,res,next) => {
  var token = req.header('x-auth');
  //this is static method and will not run automatically with document
  User.findByToken(token).then((user) => {
    if(!user){
      // res.status(401).send();
      return Promise.reject();
    }
    //we can set any property which we want to excess from outside
    req.user = user;
    req.token = token;
    next();
  }).catch((e) => {
    res.status(401).send();
  })
};

module.exports = {authenticate};
