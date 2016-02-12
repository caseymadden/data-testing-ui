var appname = angular.module('appname', ["ui.bootstrap","ngRoute"]);
var path = ''
var returnPath = '';
var markFinishedEndpoint = '';

appname.config(function ($routeProvider){
  $routeProvider.when('/:keywordSearch', {
    controller: 'appCtrl',
    templateUrl: 'table.html'
  })
});

appname.controller('appCtrl',function ($scope,$http,jsonData, $uibModal, $log, $routeParams){

  $('#table_div').on('scroll',function() {
    $('#header_div').scrollLeft($(this).scrollLeft());
  });

  if ($routeParams.keywordSearch != null){
    jsonData.getTableData($routeParams.keywordSearch).then(function(TableData){
      $scope.json = TableData;
    })
  }

  $scope.markFinished = function(keyword){
    if (keyword != null){
      jsonData.markFinished(keyword);
    }
  }

  $scope.animationsEnabled = true;

  $scope.open = function(typeValue,colIndex,rowIndex,approve,issue,note) {

    if (typeValue == "cell"){
      if (colIndex == 0){
        typeValue = "row"
      }
    }

    var modalInstance = $uibModal.open({
      animation: $scope.animationsEnabled,
      templateUrl: 'modal.html',
      controller: 'ModalInstanceCtrl',
      resolve: {
        typeValue: function() {
          return typeValue;
        },
        columnID: function() {
          return columnID;
        },
        colIndex: function() {
          return colIndex;
        },
        rowIndex: function() {
          return rowIndex;
        },
        approve: function() {
          return approve;
        },
        issue: function() {
          return issue;
        },
        note: function() {
          return note;
        }
      }
    });

    modalInstance.result.then(function (response) {

      jsonData.getInputReturn(
        response['typeValue'],
        response['columnID'],
        response['colIndex'],
        response['rowIndex'],
        response['approve'],
        response['issue'],
        response['note']);

      if(response['typeValue'] == 'cell' || response['typeValue'] == 'row') {
        var id = $scope.json.columns[response['colIndex']].columnDef.id;
        $scope.json.rows[response['rowIndex']].rowData[id].testingStatus.approved=response['approve'];
        $scope.json.rows[response['rowIndex']].rowData[id].testingStatus.issue=response['issue'];
        $scope.json.rows[response['rowIndex']].rowData[id].testingStatus.notes=response['note'];
      } else
      if(response['typeValue'] == 'column'){
        $scope.json.columns[response['colIndex']].testingStatus.approved = response['approve'];
        $scope.json.columns[response['colIndex']].testingStatus.issue = response['issue'];
        $scope.json.columns[response['colIndex']].testingStatus.notes=response['note'];
      }

      console.log("Passing Data into getInputReturn");
    }, function () {
      $log.info('Modal dismissed at: ' + new Date());
    });
  }
});

appname.controller('ModalInstanceCtrl', function ($scope, $uibModalInstance, typeValue, columnID, colIndex, rowIndex, approve, issue, note) {

  $scope.typeValue = typeValue;
  $scope.columnID = columnID
  $scope.colIndex = colIndex;
  $scope.rowIndex = rowIndex;
  $scope.approve = approve;
  $scope.issue = issue;
  $scope.note = note;

  $scope.ok = function () {
    $uibModalInstance.close({"typeValue" : $scope.typeValue, "columnID" : $scope.columnID, "colIndex" : $scope.colIndex, "rowIndex" : $scope.rowIndex, "approve" : $scope.approve, "issue" : $scope.issue, "note" : $scope.note});
  };

  $scope.cancel = function () {
    $uibModalInstance.dismiss('cancel');
  };
});

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

  this.getInputReturn = function(typeValue,field,colIndexValue,rowIndexValue,approvedValue,issueValue,notesValue){
        if (typeValue == "cell"){
          var inputData = {
            "type":typeValue,
            "field":columnIDValue,
            "rowIndex":rowIndexValue,
            "approved":approvedValue,
            "issue":issueValue,
            "notes":notesValue
          }
        }
        if (typeValue == "row"){
          var inputData = {
            "type":typeValue,
            "rowIndex":rowIndexValue,
            "approved":approvedValue,
            "issue":issueValue,
            "notes":notesValue
          }
        }
        if (typeValue == "column"){
          var inputData = {
            "type":typeValue,
            "colIndex":colIndexValue,
            "approved":approvedValue,
            "issue":issueValue,
            "notes":notesValue
          }
        }
    return $http({
        method: 'POST',
        url: returnPath,
        data: inputData
    }).success(function(data){
      console.log("");
      console.log("=======================================")
      console.log("From Post JSON file");
      console.log("Message : " + data["message"]);
      console.log("=======================================")
      console.log("");
    }).then(function(response){
  // Output info via console. Can't test POST.
      console.log("");
      console.log("=======================================")
      console.log("Printing out POST data!");
      console.log("---------------------------------------")
      console.log("Input Type : " + inputData['type']);
      console.log("Column Index : " + inputData['colIndex']);
      console.log("Row Index : " + inputData['rowIndex']);
      console.log("Approved Status : " + inputData['approved']);
      console.log("Issue Status : " + inputData['issue']);
      console.log("Notes : " + inputData['notes']);
      console.log("=======================================")
      console.log("");
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
