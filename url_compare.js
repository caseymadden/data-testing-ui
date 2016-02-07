var compareApp = angular.module('compareApp', []);

compareApp.controller('compareScreenCtrl', function ($scope) {
	$scope.url = "";
  $scope.getUrl = function(url) {
  	$scope.inputUrl = url;
  }
});