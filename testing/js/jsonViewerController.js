viewerApp.controller('jsonViewCtrl', function($scope, $http, jsonData){
	$scope.hide_pre = true;
	$scope.getJson = function(endpoint){
		jsonData.getTableData(endpoint).then(function(data){
			$('#json-renderer').jsonViewer(data);
		})
	};
	$("#keyword").keyup(function(event){
      if(event.keyCode == 13){
          $("#button").click();
      }
  });
});