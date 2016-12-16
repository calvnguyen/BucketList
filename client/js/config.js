 //  inject the ngRoute dependency in the module.

var myApp = angular.module('myApp', ['ngRoute', 'ngMessages', 'angularMoment', 'yaru22.angular-timeago']);
    //  use the config method to set up routing:
    myApp.config(function ($routeProvider) {
    $routeProvider
    .when('/dash',{
        templateUrl: 'partials/dashboard.html',
        controller: 'DashController'
    })
    .when('/',{
        templateUrl: 'partials/login.html',
        controller: 'LoginController'
    })
    .when('/user/:id',{
        templateUrl: 'partials/products.html',
        controller: 'ShowUserController'
    })
    .otherwise({
      redirectTo: '/'
    });
}); 