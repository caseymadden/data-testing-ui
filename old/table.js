var appname = angular.module('appname', []);
var path = 'data.json';

// commenting out getInput() because I can't test $http POST
appname.controller('appCtrl',function ($scope,jsonData){
  $scope.url = "";
  $scope.getUrl = function(url) {
    $scope.inputUrl = url;
  }

  $scope.showModal = false;
  $scope.toggleShowModal = function(input){
    $scope.showModal = !$scope.showModal;
    $scope.returnClickedValue = input;
  };

  $scope.submitFeedback = function(returnValue,approved,issue,note){
    $scope.feedbackValue = returnValue;
    $scope.feedbackApproved = approved;
    $scope.feedbackIssue = issue;
    $scope.feedbackNote = note;
  };

  jsonData.getTableData().then(function(TableData){
    $scope.json = TableData;
  })

  /*
  jsonData.getInput(paramsFromClick).then(function(dataFromServer) {
	   $scope.inputData = dataFromServer;
  });
  */

});

appname.service('jsonData', function($http) {
  this.getTableData = function() {
  	return $http({
  		url: path,
  		method: 'GET'
  	}).then(function(returnTableData){return returnTableData.data});
  };

  /*
  this.getInput = function(paramsFromClick){
    return $http({
			url: path,
			method: 'POST',
			data: paramsFromClick
		});
  };
  */
});

appname.directive('viewModal', function () {
  return {
    templateUrl: 'modal.html',
    restrict: 'E',
    transclude: true,
    replace:true,
    scope:true,
    link: function viewDetails(scope, element, attrs) {
      scope.title = attrs.title;
      scope.$watch(attrs.visible, function(value){
        if(value == true)
          $(element).modal('show');
        else
          $(element).modal('hide');
      });
      $(element).on('shown.bs.modal', function(){
        scope.$apply(function(){
          scope.$parent[attrs.visible] = true;
        });
      });
      $(element).on('hidden.bs.modal', function(){
        scope.$apply(function(){
          scope.$parent[attrs.visible] = false;
        });
      });
    }
  };
});

