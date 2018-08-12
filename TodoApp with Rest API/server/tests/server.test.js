const expect = require('expect');
const request = require('supertest');
const {ObjectID} = require('mongodb');
const bcrypt = require('bcryptjs');

const { app } = require('./../server');
const { Todo } = require('./../models/todos');
const { User } = require('../models/users');
const {populateTodos,todos,users,populateUsers} = require('./seed/seed');

//run before every test case
beforeEach(populateTodos);
beforeEach(populateUsers);

describe('POST /todos',() => {
  it('should create a new todo',(done) => {
    // request(app).get('')
    var text = "Test todo text";

    request(app)
    .post('/todos')
    .send({text})
    .expect(200)
    .expect((res) => {
      expect(res.body.text).toBe(text);
    })
    .end((err,res) => {
      if(err) {
        return done(err);
      }
      Todo.find({text}).then((todos) => {
        expect(todos.length).toBe(1);
        expect(todos[0].text).toBe(text);
        done();
      }).catch(e => done(e))
    })
  });

  it('should not create todo with invalid body data',(done) => {
    request(app)
    .post('/todos')
    .send({})
    .expect(400)
    .end((err,res) => {
      if(err){
        return done(err);
      }
      Todo.find().then((todos) => {
        expect(todos.length).toBe(2);
        done();
      }).catch(e => done(e))
    })
  });
});

describe('GET /todos',() => {
  it('should get all todos',(done) => {
    request(app)
    .get('/todos')
    .expect(200)
    .expect((res) => {
      expect(res.body.todos.length).toBe(2);
    })
    .end(done);
  })
});


describe('GET /todos/:id',() => {
  it('should return todo doc',(done) => {
    request(app)
    .get(`/todos/${todos[0]._id.toHexString()}`)
    .expect(200)
    .expect((res) => {
      expect(res.body.todo.text).toBe(todos[0].text);
    })
    .end(done);
  });

  it('should return a 404 if todo not found',(done)=>{
      //make sure you get a 404 back if todo is not found

      var hexId = new ObjectID().toHexString();

      request(app)
      .get(`/todos/${hexId}`)
      .expect(404)
      .expect({})
      .end(done);
  });

  it('should return 404 for non-object ids',(done) => {
    // /todos/123
    request(app)
    .get(`/todos/123456789`)
    .expect(404)
    .expect({})
    .end(done);
  });
})

describe('DELETE /todos/:id',() => {
  it('should remove a todo',(done) =>{
    var hexid = todos[0]._id.toHexString();
    request(app)
    .delete(`/todos/${hexid}`)
    .expect(200)
    .expect((res) => {
      expect(res.body.todo._id).toBe(hexid);
    })
    .end((err,res) => {
      if(err){
        return done(err);
      }
      // query database using findById() - > !null toNotExsist
      Todo.findById(hexid).then((todo)=>{
         expect(todo).toBe(null);
         done();
      }).catch(e => done(e));

    });
  });

  it('should return 404 if todo not found',(done) => {
    var hexId = new ObjectID().toHexString();

    request(app)
    .delete(`/todos/${hexId}`)
    .expect(404)
    .expect({})
    .end(done);
  });

  it('should return 404 if object id is invalid',(done) => {
    request(app)
    .delete(`/todos/123456789`)
    .expect(404)
    .expect({})
    .end(done);
  });
});

describe('PATCH /todo/:id',() => {
  it('should update the todo',(done)=>{
    var text  = "it should change"
    var hexId = todos[0]._id.toHexString();
    request(app)
    .patch(`/todos/${hexId}`)
    .send({
      text,
      compeleted:true
    })
    .expect(200)
    .expect((res) => {
      var body = res.body.todo;
      expect(body._id).toBe(hexId);
      expect(body.text).toBe(text);
      expect(body.compeleted).toBe(true);
      expect(typeof body.completedAt).toBe('number');
    })
    .end(done);

    //provide if for the first item
    // update the text, set completed = true;
    // 200 back
    //custome assertion => res contain text change completed = true, completedAt should be number
  });

  it('should clear completedAt when todo is not completed',(done) => {

    var text  = "it should change!!"
    var hexId = todos[1]._id.toHexString();
    request(app)
    .patch(`/todos/${hexId}`)
    .send({
      text,
      compeleted:false
    })
    .expect(200)
    .expect((res) => {
      var body = res.body.todo;
      expect(body._id).toBe(hexId);
      expect(body.text).toBe(text);
      expect(body.compeleted).toBe(false);
      expect(body.completedAt).toBe(null);
    })
    .end(done);
      // grab id of second todo item
      // update text,set completed to false,
      //200,
      //completed = false text is changed completedAt = null
  });
});

describe('GET /users/me', () => {
  it('should return user if authenticated',(done) => {
    var authToken = users[0].tokens[0].token;
      request(app)
      .get('/users/me')
      .set('x-auth',authToken)
      .expect(200)
      .expect(res => {
        expect(res.body._id).toBe(users[0]._id.toHexString());
        expect(res.body.email).toBe(users[0].email);
      })
      .end(done);
  });

  it('should return 401 if not authenticated',(done) =>{
    request(app)
    .get('/users/me')
    .expect(401)
    .expect(res => {
      expect(Object.keys(res.body).length).toBe(0);
    })
    .end(done);
  });
});


describe('POST /users',() => {
    it('should create a user',(done) => {
      var email = "sauravGupta9840@gmail.com";
      var password = "123456abc";
      //email address must be unique for passing this test
      request(app)
      .post('/users')
      .expect(200)
      .send({email,password})
      .expect(res => {
        //we can check the data here also
        // expect(res.headers['x-auth']).toExist();
        // expect(res.body._id).toExist();
      })
      .end((err) => {
        if(err){
          return done(err);
        }

        User.findOne({email}).then((user) => {
          // expect(user).toExist();
          // expect(user.password).toNotBe(password);
          expect(user.email).toBe(email);
          bcrypt.compare(password,user.password, (err,result) => {
            expect(result).toBe(true);
          });
          done();
        })
      });
    });

    it('should return validation error if request invalid',(done) => {
      var email = "sauragmail.com";
      var password = "123abc";
      //email address must be unique for passing this test
      request(app)
      .post('/users')
      .expect(400)
      .send({email,password})
      .end(done);
    });

    it('should not create user if email in use',(done) => {
      var email = "sauravGupta9840@gmail.com";
      var password = "123456abc";
      //email address must be unique for passing this test
      request(app)
      .post('/users')
      .expect(200)
      .send({email,password})
      .expect(res => {
        //we can check the data here also
        // expect(res.headers['x-auth']).toExist();
        // expect(res.body._id).toExist();
      }).end(done);
    });
});
