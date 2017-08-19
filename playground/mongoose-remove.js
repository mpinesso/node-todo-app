var {ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');

// Todo.remove(); => elimina tutto

// Todo.remove({}).then((res) => {
//   console.log(res);
// });

// Todo.findOneAndRemove
// Todo.findByIdAndRemove
Todo.findOneAndRemove('59987e8398b1ca6224163bea').then((res) => {
  console.log(res);
});
Todo.findByIdAndRemove('59987e8398b1ca6224163bea').then((res) => {
  console.log(res);
});

//   {
//     "text": "something to do"
// }
