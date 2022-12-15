angular.module("mySchool").config(function($routeProvider) {
  $routeProvider.when("/login", {
    templateUrl: 'view/login.html',
    controller: 'loginController'
  });
  $routeProvider.when("/cadastro", {
    templateUrl: 'view/cadastro.html',
    controller: 'cadastroController'  
  });

  $routeProvider.when("/home", {
    templateUrl: 'view/home.html'
  });

  $routeProvider.otherwise({
    redirectTo: '/login'
  });
});