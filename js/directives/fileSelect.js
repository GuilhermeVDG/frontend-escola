angular.module("mySchool").directive("ngFileSelect", function () {
  return {
    link: function(scope, element) {
      element.bind('change', event => {
        scope.file = (event.srcElement || element.target).files[0];
        scope.getFile(scope.file);
      });
    }
  }
});