viewerApp.service('jsonData', function($http) {

  $http.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded";

  this.getTableData = function(keyword) {
    return $http({
      url: 'buy office furniture.json',
      withCredentials: true,
      params: {"keyword":keyword},
      method: 'GET'
    }).then(function(returnTableData){
      return returnTableData.data
    });
  }
})