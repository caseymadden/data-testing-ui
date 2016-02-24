compareApp.controller('compareScreenCtrl', function ($scope, $http, $sce) {
 $scope.url = "";
 $scope.getUrl = function(url) {
  $scope.inputUrl = $sce.trustAsResourceUrl(url);
  $http({
    method: "GET",
    url : "endpoint.json",
  }).then(function success(response) {
    $scope.removeCommonUrl = $sce.trustAsResourceUrl(response.data.url);
  }), function error(response) {
    console.log(response.statusText);
  }
  
 }

 $scope.submitScraperFeedback = function(approved, issue, note) {
  var data = $.param({
  	"approved" : approved,
  	"issue" : issue,
  	"note" : note
  });
  var config = {
  	headers: {
  		'Content-Type' : 'application/x-www-form-urlencoded;charset=utf-8;'
  	}
   }
  $http.post('success.json', data, config)
  .success(function (data, status, headers, config) {
  	console.log(data.message);
  	$scope.postDataResponse = data;
  })
  .error(function(data, status, header, config) {
  	$scope.responseDetails = "Data: " + data +
  	"<hr />status: " + status +
  	"<hr />headers: " + header + 
  	"<hr />config: " + config;
  });
 };
  
});
