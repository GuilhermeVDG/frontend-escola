angular.module("mySchool").controller("homeController", function ($scope, students, config, localStorage, $location, $filter, homeAPI, $timeout, fileReader, $window) {
  $scope.students = students.data;
  $scope.baseUrl = config.baseUrl;
  $scope.totalPages = Math.ceil(students.data.length / 6);
  $scope.index = 0;


  $scope.signOut = () => {
    localStorage.removeToken();
    $location.path('login');
  };

  const formatPages = data => {
    const pages = [];
    let page = [];
    for(aluno of data) {
      page.push(aluno);
      if(page.length === 6) {
        pages.push(page);
        page = [];
      }
    };
    if(page) pages.push(page);
    return pages;
  };

  $scope.pages = formatPages(students.data);


  $scope.nextPage = () => {
    $scope.index += 1;
  };

  $scope.backPage = () => {
    $scope.index -= 1;
  };

  $scope.gotoPage = page => {
    $scope.index = page;
  };

  $scope.filterStudents = (students, value) => {
    const listAlunos = $filter('filter')(students, value);
    console.log(listAlunos);
    $scope.pages = formatPages(listAlunos);
    $scope.totalPages = Math.ceil(listAlunos.length / 6);
    $scope.index = 0;
  };

  $scope.modalForm = {
    'display': 'none'
  };

  $scope.modalFoto = {
    'display': 'none'
  };

  $scope.modalEdit = {
    'display': 'none'
  };

  $scope.modalAlertDelete = {
    'display': 'none'
  };

  $scope.modalAlertAddFoto = {
    'display': 'none'
  };

  $scope.setModalAddAlunos = () => {

    if($scope.modalForm.display === 'none') {
      $scope.modalForm.display = 'block';
    } else if($scope.modalForm.display === 'block'){
      $scope.novoAluno = {};
      $scope.modalForm.display = 'none';
    }
  };

  $scope.addAluno = data => {
    if(!data) return;
    homeAPI.addAluno(data)
      .then(res => {
        $timeout(() => {
          $scope.students.unshift(res.data);
          $scope.pages = formatPages($scope.students);
          $scope.totalPages = Math.ceil($scope.students / 6);

          $scope.setModalAddAlunos();
        }); 
      })
      .catch(err => console.log(err));
  };

  $scope.setModalFotos = () => {
    if($scope.modalFoto.display === 'none'){
      $scope.modalFoto.display = 'block';
    } else if($scope.modalFoto.display === 'block') {
      $scope.modalFoto.display = 'none';
    }
  };

  $scope.getFile = (file) => {
    fileReader.readAsDataUrl(file, $scope)
      .then(result => $scope.imageSrc = result);
  };

  $scope.sendImg = function (aluno, image) {
    const originalname = document.getElementById('formFileLg').value.substr(12);

    if(aluno.Fotos[0]){
      $scope.info = { aluno, image, originalname };
      $scope.setModalAlertAddFoto();
      return;
    };
    
    homeAPI.sendImage(aluno, image, originalname).then(res => {
      $scope.setModalFotos();
      $window.location.reload();
    }).catch(err => console.log(err));
  };

  $scope.setModalEditAluno = aluno => {
    if($scope.modalEdit.display === 'none'){
      $scope.modalEdit.display = 'block';
    } else if($scope.modalEdit.display === 'block') {
      $scope.modalEdit.display = 'none';
    }
    $scope.alunoEdit = { ...aluno };
  };

  $scope.editAluno = aluno => {
    homeAPI.editAluno(aluno)
      .then(res => {
        $scope.setModalEditAluno();
        $window.location.reload();
      })
      .catch(err => console.log(err));
  };

  $scope.deleteAluno = id => {
    homeAPI.deleteAluno(id)
      .then(res => {
        $scope.setModalAlertDeleteAluno();
        $scope.setModalEditAluno();
        $window.location.reload();
      })
      .catch(err => console.log(err));
  };

  $scope.setModalAlertDeleteAluno = () => {
    if($scope.modalAlertDelete.display === 'none'){
      $scope.modalAlertDelete.display = 'block';
    } else if($scope.modalAlertDelete.display === 'block') {
      $scope.modalAlertDelete.display = 'none';
    }
  };

  $scope.setModalAlertAddFoto = () => {
    if($scope.modalAlertAddFoto.display === 'none'){
      $scope.modalAlertAddFoto.display = 'block';
    } else if($scope.modalAlertAddFoto.display === 'block') {
      $scope.modalAlertAddFoto.display = 'none';
    }
  };

  $scope.updateImg = () => {
    const { aluno, image, originalname } = $scope.info;

    if(!aluno.Fotos[0]){
      $scope.setModalAlertAddFoto;
      return;
    }

    homeAPI.sendImage(aluno, image, originalname)
      .then(res => {
        console.log(aluno.Fotos);
        $scope.setModalAlertAddFoto();
        $scope.setModalFotos();
        $window.location.reload();
      })
      .catch(err => console.log(err));
  };
});