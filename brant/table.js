var appname = angular.module('appname', []);
appname.controller('appCtrl',function ($scope,getTableDataFactory){
  getTableDataFactory.getHTTP(function(data) {
    $scope.json = data;
  });
});
appname.factory('getTableDataFactory', function($http) {
  var path = 'data.json';
  return {
    getHTTP: function(data) {
      $http.get(path).success(data);
    }
  }
});
