angular.module("mySchool").factory("homeAPI", function($http, config) {
  const _getAlunos = () => $http.get(`${config.baseUrl}/students/index`);

  return {
    getAlunos : _getAlunos
  };
});
