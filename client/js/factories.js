// Users Factory
myApp.factory('usersFactory', ['$http', function($http) {

  var login_user = {};
  var users = [];

  function UsersFactory(){
      var _this = this;
     this.index = function(callback){
      $http.get('/users').then(function(returned_data){
        console.log(returned_data);
        if (typeof(callback) == 'function'){
          users = returned_data.data;
          callback(users);
        }
        
      });

    };

    this.login_index = function(callback){
        if (typeof(callback) == 'function'){
          callback(login_user);
        }

    };


    this.create = function(newuser, callback){
      console.log("inside factory create user...")
      console.log(newuser);
      $http.post('/users', newuser).then(function(returned_data){
        console.log("back to users factory..");
        console.log(returned_data.data);
        if (typeof(callback) == 'function'){
          login_user = returned_data.data;
          callback(returned_data.data);
        }

      });
    };

    this.show = function(user_id, callback){
        $http.get('/users/'+user_id).then(function(returned_data){
          console.log(returned_data.data);
          if (typeof(callback) == 'function'){
            callback(returned_data.data);
          }

        });
      };
   
  }

  return new UsersFactory();

}]);


// Bucket Factory
myApp.factory('bucketFactory', ['$http', function($http) {
  var bucket_items = [];
  var bucket_item = {};

  function BucketFactory(){
    var _this = this;
    this.create = function(newtag, callback){
      console.log("inside bucket factory");
      console.log(newtag);
      $http.post('/bucket_items/', newtag).then(function(returned_data){
        console.log("orders controller - back from server")
        console.log(returned_data.data);
        if (typeof(callback) == 'function'){
          bucket_item = returned_data.data;
          callback(bucket_item);
        }

      });
    };
    
    this.index = function(callback){
      $http.get('/bucket_items').then(function(returned_data){
        console.log(returned_data);
        bucket_items = returned_data.data;
        callback(bucket_items);
      });

    };

    this.show = function(user_id, callback){
        $http.get('/bucket_items/'+user_id).then(function(returned_data){
          console.log(returned_data.data);
          if (typeof(callback) == 'function'){
            callback(returned_data.data);
          }

        });
    };
  }

  return new BucketFactory();

}]);