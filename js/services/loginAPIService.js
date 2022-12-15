angular.module("mySchool").factory("loginAPI", function ($http, config) {
  const _login = data => $http.post(`${config.baseUrl}/session`, data);

  return {
    login: _login
  };
});