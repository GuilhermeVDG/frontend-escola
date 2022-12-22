angular.module("mySchool").factory("homeAPI", function($http, config) {
  const _getAlunos = () => $http.get(`${config.baseUrl}/students/index`);

  const _addAluno = data => $http.post(`${config.baseUrl}/students/store`, data);

  const _sendImage = (aluno, file, originalname) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('student_id', aluno.id);
    formData.append(`originalname`, originalname);
    
    return $http({
      url: `${config.baseUrl}/foto`,
      headers: {"Content-Type": undefined },
      data: formData,
      method: "POST"
  });
  };

  const _editAluno = aluno => {
    return $http.put(`${config.baseUrl}/students/${aluno.id}`, aluno);
  };

  return {
    getAlunos : _getAlunos,
    addAluno: _addAluno,
    sendImage: _sendImage,
    editAluno: _editAluno
  };
});
