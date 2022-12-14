angular.module("mySchool").factory("loginAPI", function ($http) {
  const _login = data => $http.post('http://localhost:3215/session', data);

  return {
    login: _login
  }
});