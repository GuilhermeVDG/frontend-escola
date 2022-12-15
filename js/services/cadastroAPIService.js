angular.module("mySchool").factory("cadastroAPI", function($http, config){
  const _cadastro = data => $http.post(`${config.baseUrl}/store`, data);

  return{
    cadastro: _cadastro
  };
});