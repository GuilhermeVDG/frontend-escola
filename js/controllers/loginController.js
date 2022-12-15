angular.module("mySchool").controller("loginController", function($scope, $location,loginAPI, localStorage) {
  $scope.submitLogin = credentials => { 
    loginAPI.login(credentials)
      .then(resp => {
        localStorage.setToken(resp.data.token);
        $location.path('/home');
      }).catch(error => console.log(error));
  };
});