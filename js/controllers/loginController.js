angular.module("mySchool").controller("loginController", function($scope, $location,loginAPI, localStorage) {
  $scope.alertLogin = false;
  
  $scope.submitLogin = credentials => { 
    loginAPI.login(credentials)
      .then(resp => {
        localStorage.setToken(resp.data.token);
        $scope.alertLogin = false;
        $location.path('/home');
      }).catch(error => {
        console.log(error);
        $scope.alertLogin = true;
      });
  };
});