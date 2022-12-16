angular.module("mySchool").controller("homeController", function ($scope, students, config, localStorage, $location, $filter) {
  $scope.students = students.data;
  $scope.baseUrl = config.baseUrl;
  $scope.totalPages = Math.ceil(students.data.length / 6);

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
  $scope.index = 0;

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

});