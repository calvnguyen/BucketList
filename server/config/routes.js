console.log("future routes loading...");

var bucket_items = require('../controllers/buckets.js');
var users = require('../controllers/users.js');


module.exports = function(app) {

  app.get('/users', users.index);
  app.post('/users', users.create);

  app.get('/bucket_items', bucket_items.index);
  app.post('/bucket_items', bucket_items.create);
  app.get('/bucket_items/:id', bucket_items.show);

}