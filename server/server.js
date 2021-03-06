require('./config/config.js');

const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');

var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');
var {authenticate} = require('./middleware/authenticate')

var app = express();
const port = process.env.PORT;

app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.status(200).send('Pronto');
});

// POST /todos/{...}
app.post('/todos', authenticate, (req, res) => {
  var todo = new Todo({
    text: req.body.text,
    _creator: req.user._id
  });

  todo.save().then((doc) => {
    res.send(doc);
  }, (e) => {
    res.status(400).send(e);
  });
});

// GET /todos/

app.get('/todos', authenticate, (req, res) => {
  Todo.find({
    _creator: req.user._id
  }).then((todos) => {
    res.send({todos});
  }, (e) => {
    res.status(400).send(e);
  });
});

// GET /todos/12345
app.get('/todos/:id', authenticate, (req, res) => {
  var id = req.params.id;

  if(!ObjectID.isValid(id)){
    return res.status(404).send();
  }

  Todo.findOne({
      _id: id,
      _creator: req.user._id
    }).then((todo) => {
    if(!todo){
      return res.status(404).send();
    }

    res.status(200).send({todo});
  }, (e) => {
    res.status(400).send();
  });

});

// DELETE /todos/12345
app.delete('/todos/:id', authenticate, async (req, res) => {
  const id = req.params.id;

  if(!ObjectID.isValid(id)){
    return res.status(404).send();
  }

  try{
    const todo = await Todo.findOneAndRemove({
      _id: id,
      _creator: req.user._id
    });

    if(!todo){
      return res.status(404).send();
    }

    res.status(200).send({todo});
  }catch(e) {
    res.status(400).send();
  };
  
  // var id = req.params.id;
  //
  // if(!ObjectID.isValid(id)){
  //   return res.status(404).send();
  // }
  //
  // Todo.findOneAndRemove({
  //     _id: id,
  //     _creator: req.user._id
  //   }).then((todo) => {
  //   if(!todo){
  //     return res.status(404).send();
  //   }
  //   res.status(200).send({todo});
  // }).catch((e) => {
  //   res.status(400).send();
  // });

});

// UPDATE /todos/
app.patch('/todos/:id', authenticate, (req, res) => {
  var id = req.params.id;
  var body = _.pick(req.body, ['text', 'completed']);

  if(!ObjectID.isValid(id)){
    return res.status(404).send();
  }

  if(_.isBoolean(body.completed) && body.completed){
    body.completedAt = new Date().getTime();
  }else{
    body.completed = false;
    body.completedAt = null;
  }

  Todo.findOneAndUpdate({
      _id: id,
      _creator: req.user._id
    }, {$set: body}, {new: true}).then((todo) => {
    if(!todo){
      return res.status(404).send();
    }

    res.send({todo});
  }).catch((e) => {
    ret.status(400).send(e);
  });

});

// POST /users/{...}
app.post('/users', async (req, res) => {
  try{
    const body = _.pick(req.body, ['email', 'password']);
    const user = new User(body);
    await user.save();
    const token = await user.generateAuthToken();
    res.header('x-auth', token).send(user);
  } catch(e) {
    res.status(400).send(e);
  };
  // var body = _.pick(req.body, ['email', 'password']);
  // var user = new User(body);
  //
  // user.save().then(() => {
  //   return user.generateAuthToken();
  // }).then((token) => {
  //   res.header('x-auth', token).send(user);
  // }).catch((e) => {
  //   res.status(400).send(e);
  // });
});

// GET /users
app.get('/users', (req, res) => {

  User.find().then((users) => {
    res.send({users});
  }, (e) => {
    res.status(400).send(e);
  });
});

// GET /users/me
app.get('/users/me', authenticate, (req, res) => {
  res.send(req.user);
});

// POST /users/login {email, password}
app.post('/users/login', async (req, res) => {
  try{
    const body = _.pick(req.body, ['email', 'password']);
    const user = await User.findByCredentials(body.email, body.password);
    const token = await user.generateAuthToken();
    res.header('x-auth', token).send(user);
  }catch(e){
    res.status(400).send();
  }
  // User.findByCredentials(body.email, body.password).then((user) => {
  //   if(!user){
  //     return res.status(404).send();
  //   }
  //
  //   user.generateAuthToken().then((token) => {
  //     res.header('x-auth', token).send(user);
  //   });
  // }).catch((e) => {
  //   res.status(400).send();
  // });

});

// DELETE /users/logout {token}
app.delete('/users/me/token', authenticate, async (req, res) => {
  try{
    await req.user.removeToken(req.token);
    res.status(200).send();
  }catch(e){
    res.status(400).send();
  }
  // req.user.removeToken(req.token).then(() => {
  //   res.status(200).send();
  // }, () => {
  //   res.status(400).send();
  // });
});

app.listen(port, () =>{
  console.log(`Started on port ${port}`);
});

// usato per i test (per il momento)
module.exports = {app};
