angular.module("mySchool").controller("homeController", function ($scope, students, config, localStorage, $location, $filter, homeAPI, $timeout) {
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

  $scope.setModalAddAlunos = () => {

    if($scope.modalForm.display === 'none') {
      $scope.modalForm.display = 'block';
    } else if($scope.modalForm.display === 'block'){
      $scope.novoAluno = {};
      $scope.modalForm.display = 'none';
    }
  };

  $scope.addAluno = data => {
    console.log(data);
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
});