compareApp.controller('compareScreenCtrl', function ($scope, $http) {
 $scope.url = "";
 $scope.getUrl = function(url) {
  $scope.inputUrl = url;
 }

//  $scope.submitScraperFeedback = function(approved, issue, note) {
//   $scope.scraperFeedback = { "approved" : approved,
//    "issue" : issue,
//    "note" : note }
//    console.log($scope.scraperFeedback);
//    $http({
//   	method : 'POST',
//   	url : 'return_compare.json',
//   	data : $scope.scraperFeedback
//   })
//  };
// });

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
  $http.post('return_compare.json', data, config)
  .success(function (data, status, headers, config) {
  	console.log(data);
  	$scope.postDataResponse = data;
  	console.log("success");

  })
  .error(function(data, status, header, config) {
  	$scope.responseDetails = "Data: " + data +
  	"<hr />status: " + status +
  	"<hr />headers: " + header + 
  	"<hr />config: " + config;
  });
 };
  
});
