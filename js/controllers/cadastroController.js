angular.module("mySchool").controller("cadastroController", function($scope, $location, cadastroAPI){
  $scope.submitCadastro = data => {
    cadastroAPI.cadastro(data)
      .then(response => $location.path('/login'))
      .catch(error => console.log(error));
  };
});