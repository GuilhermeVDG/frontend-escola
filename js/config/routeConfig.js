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
    templateUrl: 'view/home.html',
    controller: 'homeController',
    resolve: {
      students : function(homeAPI, localStorage, $location){
        if(!localStorage.token()){
          $location.path('/login');
        };
        return homeAPI.getAlunos();
      }
    }
  });

  $routeProvider.otherwise({
    redirectTo: '/login'
  });
});