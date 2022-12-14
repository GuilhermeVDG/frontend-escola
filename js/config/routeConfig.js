angular.module("mySchool").config(function($routeProvider) {
  $routeProvider.when("/login", {
    templateUrl: 'view/login.html'
  });
  $routeProvider.when("/cadastro", {
    templateUrl: 'view/cadastro.html'
  });
});