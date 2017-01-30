'use strict';

function DataService($http,$q) {

  return {
    getPeople: getPeople
  }

  function getPeople(){
    var defer = $q.defer(),
        promise;

    promise = $http.get('/api/people');
    promise 
      .then(function(response){
        defer.resolve(response.data.data)
      })
      .catch(function(error){
        defer.reject(error);
      })
      return defer.promise;
  }

}

DataService.$inject = ['$http','$q'];
module.exports = DataService;
