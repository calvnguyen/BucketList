console.log("future routes loading...");

var bucket_items = require('../controllers/buckets.js');
var users = require('../controllers/users.js');


module.exports = function(app) {

  app.get('/users/:id', users.index_others);
  app.get('/users', users.index_all);
  app.post('/users', users.create);
  app.get('/showuser/:id', users.show);

  app.get('/bucket_items', bucket_items.index);
  app.post('/bucket_items', bucket_items.create);
  app.get('/show_pending_items/:id', bucket_items.show_pending);
  app.get('/show_completed_items/:id', bucket_items.show_completed);
  app.post('/item_update/:id', bucket_items.update);

}