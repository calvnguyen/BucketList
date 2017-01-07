

myApp.controller('DashController', ['$scope', 'bucketFactory', 'usersFactory', function($scope, bucketFactory, usersFactory) {
/* Private Methods */
  $scope.users = [];
  $scope.users_others = [];
  $scope.bucket_items = [];
  $scope.bucket_item = {};

  $scope.login_user = {};

  var usersIndexOthers = function() {
      usersFactory.index_others($scope.login_user._id, function (data) {
        $scope.users_others = data;
        // console.log("all users except login_user - back to dash controller:");
        // console.log(data);
    }); 
  }

  var usersIndex = function() {
      usersFactory.index_all(function (data) {
        $scope.users = data;
        // console.log("all users - back to dash controller:");
        // console.log(data);
    }); 
  }

  var login_userIndex = function() {
      usersFactory.login_index(function (data) {
        $scope.login_user = data;
        // console.log("login - back to dash controller:");
        // console.log("login user id is " + $scope.login_user._id);
    }); 
  }


  var bucketIndex = function() {
      bucketFactory.index(function (data) {
        $scope.bucket_items = data;
        console.log("bucket controller data:");
        console.log(data);

    }); 
  }

  $scope.changeStatus = function(item_id, status){
    console.log(typeof(status));
    bucketFactory.update_status(item_id, status, function (data){
      $scope.bucket_item = data;
    });

  }

  $scope.addTag = function(){
      // console.log("_users is " + $scope.newTag._users);
      // if ($scope.newTag._users == undefined){
      //   console.log("creating item for login user...");
      //   $scope.newTag._users = $scope.login_user._id;
      //   $scope.newTag.status = false;
      //   console.log($scope.login_user.name);
      // }
      console.log("current newTag:");
      console.log($scope.newTag);
      $scope.newTag._created_by = $scope.login_user._id;
      // console.log("creator is " + $scope.newTag._created_by);
      // console.log($scope.newTag);
      bucketFactory.create($scope.newTag, function(data){
      // console.log("back from factory in adding tag..")
      // console.log(data);
      $scope.bucket_item = data;
      $scope.newTag = {};
      bucketIndex();
    })

  }

  bucketIndex();
  login_userIndex();
  usersIndex();
  usersIndexOthers();

}]);


myApp.controller('LoginController', ['$scope', 'usersFactory', '$location', function($scope, usersFactory, $location) {
/* Private Methods */
  $scope.user = "";

  $scope.createUser = function() {
    usersFactory.create($scope.newuser, function(data){
      $scope.user = data;
      // console.log("login back from factory");
      // console.log(data);
      $scope.newuser = "";
      $location.url('/dash');
    })
  }


}]);

myApp.controller('ShowUserController', ['$scope', 'usersFactory', 'bucketFactory', '$location','$routeParams', function($scope, usersFactory, bucketFactory, $location, $routeParams) {
/* Private Methods */
  $scope.pending_items = [];
  $scope.completed_items = [];
  $scope.user = {};
  $scope.login_user = {};

  var getPendingItems = function(){
        bucketFactory.show_pending_items($routeParams.id, function(data){
        $scope.pending_items = data;
        console.log("Back to Show items - Pending - controller..")
        console.log(data);
      })
  }

  var getCompletedItems = function(){
        bucketFactory.show_completed_items($routeParams.id, function(data){
        $scope.completed_items = data;
        console.log("Back to Show items - Completed - controller..")
        console.log(data);
      })
  }

  var getUser = function(){
        usersFactory.show_user($routeParams.id, function(data){
        $scope.user = data;
        console.log("Back to Show user controller..")
        console.log(data);
      })
  }

 $scope.changeStatus = function(item_id, status){
    console.log(typeof(status));
    console.log("status is: " + status.code);
    bucketFactory.update_status(item_id, status, function (data){
      console.log("back inside show user - controller - change status");
      console.log(data);
      // getPendingItems();
      // getCompletedItems();
      // $route.reload();
    });

  }

  var login_userIndex = function() {
      usersFactory.login_index(function (data) {
        $scope.login_user = data;
    }); 
  }

  getPendingItems();
  getCompletedItems();
  login_userIndex();
  getUser();


}]);