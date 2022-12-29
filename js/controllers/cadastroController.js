angular.module("mySchool").controller("cadastroController", function($scope, $location, cadastroAPI){
  $scope.alertCadastro = false;
  
  $scope.submitCadastro = data => {
    cadastroAPI.cadastro(data)
      .then(response => $location.path('/login'))
      .catch(error => {
        console.log(error);
        if(error.data.error[0] === 'email must be unique') $scope.alertCadastro = true;
      });
  };
});