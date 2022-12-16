angular.module("mySchool").config(function($httpProvider) {
  $httpProvider.interceptors.push("authInterceptor");
});