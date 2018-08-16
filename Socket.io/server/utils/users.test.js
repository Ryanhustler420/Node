const {Users} = require('./users');
const expect = require('expect');


describe('Users',() => {
  var users;

  beforeEach(() => {
    users = new Users();
    users.users = [{
      id:'1',
      name:'Mike',
      roomName:'Node Course'
    },{
      id:'2',
      name:'Jan',
      roomName:'React Course'
    },{
      id:'3',
      name:'Gaurav',
      roomName:'Node Course'
    }];
  });

  it('should add  new user',() => {
    var users = new Users();
    var user = {
      id:'134',
      name:'Gaurav',
      roomName:'The Office gang'
    };

    var resUser = users.addUsers(user.id,user.name,user.roomName);

    expect(users.users).toEqual([user]);
  });

  it('should remove a user',() => {
    var rmvUser = users.removeUser(users.users[0].id);
    expect(users.users.length).toBe(2);
  });

  it('should not remove a user with wrong id',() => {
    var rmvUser = users.removeUser('98');
    expect(rmvUser).toBeFalsy();
  });

  it('should not get a user with wrong id',() => {
    var rmvUser = users.getUser('65');
    expect(rmvUser).toBeFalsy();
  });

  it('should return a user by id',() => {
    var requestedUser = users.getUser(users.users[2].id);
    expect(requestedUser.name).toBe('Gaurav');
  });

  it('should return names for node course',() => {
      var userList = users.getUserList('Node Course');
      expect(userList).toEqual(['Mike','Gaurav'])
  });

  it('should return names for React course',() => {
      var userList = users.getUserList('React Course');
      expect(userList).toEqual(['Jan'])
  });
});
