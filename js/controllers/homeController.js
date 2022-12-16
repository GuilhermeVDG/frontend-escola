angular.module("mySchool").controller("homeController", function ($scope, students) {
  console.log(students.data);
  $scope.alunos = students.data;
});