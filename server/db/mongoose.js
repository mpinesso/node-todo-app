var mongoose = require('mongoose');

mongoose.Promise = global.Promise;

console.log(process.env);

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/TodoApp', {
  useMongoClient: true
});

module.exports = {mongoose};
