// const MongoClient = require('mongodb').MongoClient;
// il codice sopra + uguale al codice sopra
// const {MongoClient} = require('mongodb');
const {MongoClient, ObjectId} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
  if(err){
    return console.log('Unable to connect to MongoDB server');
  }

  console.log('Connect to MongoDB server');

  // findOneAndUpdate
  // db.collection('Todos')
  //   .findOneAndUpdate({
  //     _id : new ObjectId("599725241c52d63554e890fd")
  //   }, {
  //     $set: {
  //       completed: true
  //     }
  //   }, {
  //     returnOriginal: false
  //   }).then((result) => {
  //     console.log(result);
  //   });

  db.collection('Users')
    .findOneAndUpdate({
      _id : new ObjectId("5997193c3b4e7a2130c16a02")
    }, {
      $set: {
        name: 'Marco'
      },
      $inc: {
        age: 1
      }
    }, {
      returnOriginal: false
    }).then((result) => {
      console.log(result);
    });

  //db.close();
});
