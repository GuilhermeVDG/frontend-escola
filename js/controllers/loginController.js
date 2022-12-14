angular.module("mySchool").controller("loginController", function($scope, $location,loginAPI, localStorage) {
  const submitLogin = async credentials => {
    try {
      
      const response = await loginAPI.login(credentials);
      localStorage.setToken(response.data.token);
      $location.path('/home');
    } catch (error) {
      console.log(error);
    }
  };

  $scope.submitLogin = credentials => {
    submitLogin(credentials);
  };
});