// const MongoClient = require('mongodb').MongoClient;
// il codice sopra + uguale al codice sopra
// const {MongoClient} = require('mongodb');
const {MongoClient, ObjectId} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
  if(err){
    return console.log('Unable to connect to MongoDB server');
  }

  console.log('Connect to MongoDB server');

  // deleteMany
  // db.collection('Todos').deleteMany({
  //     text: 'Eat lunch'
  //   }).then((result) => {
  //     console.log(result);
  //   });

  // deleteOne
  // db.collection('Todos').deleteOne({
  //     text: 'Eat lunch'
  //   }).then((result) => {
  //     console.log(result);
  //   });


  // findOneAndDelete
  // db.collection('Todos')
  //   .findOneAndDelete({
  //     completed: false
  //   }).then((result) => {
  //     console.log(result);
  //   });

  // db.collection('Users').
  //   deleteMany({
  //     name: 'Marco'
  //   }).then((result)=>{
  //     console.log(result);
  //   });

  db.collection('Users').
    findOneAndDelete({
      _id: new ObjectId("59971ffb1c52d63554e8904d")
    }).then((result)=>{
      console.log(result);
    });

  //db.close();
});
