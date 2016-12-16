

myApp.controller('DashController', ['$scope', 'bucketFactory', 'usersFactory', function($scope, bucketFactory, usersFactory) {
/* Private Methods */
  $scope.users = [];
  $scope.bucket_items = [];
  $scope.bucket_item = {};

  $scope.login_user = {};

  var usersIndex = function() {
      usersFactory.index(function (data) {
        $scope.users = data;
        console.log("all users - back to dash controller:");
        console.log(data);
    }); 
  }

  var login_userIndex = function() {
      usersFactory.login_index(function (data) {
        $scope.login_user = data;
        console.log("login - back to dash controller:");
        console.log(data);
    }); 
  }


  var bucketIndex = function() {
      bucketFactory.index(function (data) {
        $scope.bucket_items = data;
        console.log("bucket controller data:");
        console.log(data);
    }); 
  }

  $scope.addTag = function(){
      // if ($scope.newTag._user = ""){
      //   console.log("creating item for login user...");
      //   $scope.newTag._user = $scope.login_user._id;
      //   console.log($scope.login_user.name);
      // }
      console.log("current newTag:");
      console.log($scope.newTag);
      $scope.newTag.creator = $scope.login_user.name;
      console.log("creator is " + $scope.newTag.creator);
      console.log($scope.newTag);
      bucketFactory.create($scope.newTag, function(data){
      console.log("back from factory in adding tag..")
      console.log(data);
      $scope.bucket_item = data;
      $scope.newTag = {};
      bucketIndex();
    })

  }

  usersIndex();
  bucketIndex();
  login_userIndex();

}]);


myApp.controller('LoginController', ['$scope', 'usersFactory', '$location', function($scope, usersFactory, $location) {
/* Private Methods */
  $scope.user = "";

  $scope.createUser = function() {
    usersFactory.create($scope.newuser, function(data){
      $scope.user = data;
      console.log("login back from factory");
      console.log(data);
      $scope.newuser = "";
      $location.url('/dash');
    })
  }


}]);

myApp.controller('ShowUserController', ['$scope', 'usersFactory', 'bucketFactory', '$location','$routeParams', function($scope, usersFactory, bucketFactory, $location, $routeParams) {
/* Private Methods */
  $scope.user = {};

  $scope.getUser= function(){
        usersFactory.show($routeParams.id, function(data){
        $scope.user = data;
      })
  }

getUser();

  
}]);