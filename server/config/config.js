var env = process.env.NODE_ENV || 'development';
console.log('env *****', env);
/**
  * nel file package.json è stato settato questo elemento
  * "test": "export NODE_ENV=test || SET \"NDOE_ENV=test\" && mocha server/** /*.test.js",
  * Questo codice va bene nei sistemi MAC e LINUX: export NODE_ENV=test
  * Questo codice invece va per il sistema WINDOWS: SET \"NDOE_ENV=test\"
  */

// in questa maniera posso usare va
if(env === 'development'){
  process.env.PORT = 3000;
  process.env.MONGODB_URI = 'mongodb://localhost:27017/TodoApp';
}else if (env = 'test'){
  process.env.PORT = 3000;
  process.env.MONGODB_URI = 'mongodb://localhost:27017/TodoAppTest';
}
