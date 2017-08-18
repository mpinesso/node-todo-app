// const MongoClient = require('mongodb').MongoClient;
// il codice sopra + uguale al codice sopra
// const {MongoClient} = require('mongodb');
const {MongoClient, ObjectId} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
  if(err){
    return console.log('Unable to connect to MongoDB server');
  }

  console.log('Connect to MongoDB server');

  // var list = db.collection('Todos').find({completed: false}).toArray().then((docs) => {
  //   console.log(JSON.stringify(docs, undefined, 2));
  // }, (err) => {
  //   console.log('Unable to fetch todos', err);
  // });

  // var list = db.collection('Todos')
  //   .find({
  //     _id: new ObjectId('59971c461c52d63554e88fb7')
  //   })
  //   .toArray()
  //   .then((docs) => {
  //     console.log(JSON.stringify(docs, undefined, 2));
  //   }, (err) => {
  //     console.log('Unable to fetch todos', err);
  //   });

  // var list = db.collection('Todos').find().count()
  //   .then((count) => {
  //     console.log(`Todos count: ${count}`);
  //   }, (err) => {
  //     console.log('Unable to fetch todos', err);
  //   });

  var list = db.collection('Users')
    .find({
      name: 'Marco'
    })
    .toArray()
    .then((docs) => {
      console.log(JSON.stringify(docs, undefined, 2));
    }, (err) => {
      console.log('Unable to fetch users', err);
    });

  db.close();
});
