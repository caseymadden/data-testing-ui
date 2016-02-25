viewerApp.service('jsonData', function($http,GET_DATA_ENDPOINT) {

  $http.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded";

  this.getTableData = function(keyword) {
    return $http({
      url: GET_DATA_ENDPOINT,
      withCredentials: true,
      params: {"keyword":keyword},
      method: 'GET'
    }).then(function(returnTableData){
      return returnTableData.data
    });
  }
})