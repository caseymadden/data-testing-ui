appname.service('jsonData', function($http,$routeParams) {

  $http.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded";

  this.getTableData = function(keyword) {
    return $http({
      url: path,
      withCredentials: true,
      params: {"keyword":keyword},
      method: 'GET'
    }).then(function(returnTableData){
      return returnTableData.data
    });
  };

  this.getInputReturn = function(typeValue,keyword,columnID,colIndexValue,rowIndexValue,approvedValue,issueValue,notesValue){
    return $http({
        method: 'POST',
        url: returnPath,
        withCredentials: true,
        params:{
          "type":typeValue,
          "keyword":keyword,
          "field":columnID,
          "colIndex":colIndexValue,
          "rowIndex":rowIndexValue,
          "approved":approvedValue,
          "issue":issueValue,
          "notes":notesValue
        }
    }).success(function(data){
      console.log("");
      console.log("=======================================")
      console.log("From Post JSON file");
      console.log("Message : " + data["message"]);
      console.log("=======================================")
      console.log("");
    }).then(function(response){
      console.log(response);
    });
  };

  this.markFinished = function(keyword){
    return $http({
      method: 'POST',
      url: markFinishedEndpoint,
      params: {"keyword":keyword}
    })
  }

});