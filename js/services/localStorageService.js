
angular.module("mySchool").factory("localStorage", function ($window) {
  const _setToken = token => {
      $window.localStorage.setItem('@school-token', token);
  };

  const _removeToken = () => {
      $window.localStorage.removeItem('@school-token');
  };

  const _token = () => {
      return $window.localStorage.getItem('@school-token');
  };

  return {
      token: _token,
      removeToken: _removeToken,
      setToken: _setToken,
  };
});