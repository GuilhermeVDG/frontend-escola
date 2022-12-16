angular.module("mySchool").controller("homeController", function ($scope, students, config, localStorage, $location) {
  console.log(students.data);
  $scope.alunos = students.data;
  $scope.baseUrl = config.baseUrl;

  $scope.signOut = () => {
    localStorage.removeToken();
    $location.path('login');
  };

});