angular.module("mySchool").factory("homeAPI", function($http, config) {
  const _getAlunos = () => $http.get(`${config.baseUrl}/students/index`);

  const _addAluno = data => $http.post(`${config.baseUrl}/students/store`, data);

  return {
    getAlunos : _getAlunos,
    addAluno: _addAluno
  };
});
