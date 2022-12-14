
angular.module("mySchool").factory("localStorage", function ($window) {
  const _setToken = token => {
      $window.localStorage.setItem('BearerToken', token);
      $window.localStorage.setItem('TokenTime', new Date().getTime());
  };

  const _removeToken = () => {
      $window.localStorage.removeItem('BearerToken');
      $window.localStorage.removeItem('TokenTime');
  };

  const _token = () => {
      return $window.localStorage.getItem('BearerToken');
  };

  const _time = () => {
      return $window.localStorage.getItem('TokenTime');
  };

  return {
      token: _token,
      time: _time,
      removeToken: _removeToken,
      setToken: _setToken,
  };
});