[{
  id:'/.kdjsfoiwer12434',
  name:'Gaurav',
  room:'The Office fans'
}]


class Users {
  constructor(){
    this.users = [];
  }

  addUsers(id,name,roomName){
    var user = {id,name,roomName}
    this.users.push(user);
    return user;
  }

  removeUser(id){
    //return user that was removed
    var user = this.getUser(id);
    if(user){
      this.users = this.users.filter((user) =>  user.id !== id);
    }
    return user;
  }
  getUser(id){
    return this.users.filter((user) =>  user.id === id)[0];
  }
  getUserList(room){
    // ['Mike','Jan','Gaurav']
    var users = this.users.filter((user) =>  user.roomName === room);
    var namesArray = users.map((user) => user.name);
    return namesArray;
  }
}

module.exports ={ Users };


// add user[id,name,roomName]
// removeUser[id]
// getUesr(id)
// getUserList(roomName)

// class Person {
//   constructor(name,age){
//     this.name = name;
//     this.age = age;
//   }
//
//   getUserDescription(){
//     return `${this.name} is ${this.age} year(s) old`;
//   }
// }
//
// var me = new Person('Gaurav',21);
// var description = me.getUserDescription();
// console.log(description);
