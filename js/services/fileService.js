angular.module("mySchool").factory("fileReader", function($q, $log) {
  
  const onLoad = (reader, deferred, scope) => {
      return () => {
          scope.$apply(function () {
              deferred.resolve(reader.result);
          });
      };
  };

  const onError = (reader, deferred, scope) => {
      return () => {
          scope.$apply(function () {
              deferred.reject(reader.result);
          });
      };
  };

  const onProgress = (reader, scope) => {
      return (event) => {
          scope.$broadcast("fileProgress",
              {
                  total: event.total,
                  loaded: event.loaded
              });
      };
  };

  const getReader = (deferred, scope)  => {
      const reader = new FileReader();
      reader.onload = onLoad(reader, deferred, scope);
      reader.onerror = onError(reader, deferred, scope);
      reader.onprogress = onProgress(reader, scope);
      return reader;
  };

  const readAsDataURL =  (file, scope) => {
      const deferred = $q.defer();
        
      const reader = getReader(deferred, scope);         
      reader.readAsDataURL(file);
        
      return deferred.promise;
  };

  return {
      readAsDataUrl: readAsDataURL  
  };

});