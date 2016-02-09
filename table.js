var appname = angular.module('appname', ["ui.bootstrap"]);
var path = 'data.json';
var returnPath = 'return_data.json'

appname.controller('appCtrl',function ($scope,$http,jsonData, $uibModal, $log){

  jsonData.getTableData().then(function(TableData){
    $scope.json = TableData;
  })

  $scope.animationsEnabled = true;

  $scope.open = function (typeValue,colIndex,rowIndex,approve,issue,note) {

    if (typeValue == "cell"){
      if (colIndex == 0){
        typeValue = "row"
      }
    }

    var modalInstance = $uibModal.open({
      animation: $scope.animationsEnabled,
      templateUrl: 'modal.html',
      controller: 'ModalInstanceCtrl',
      // typeValue: typeValue,
      // colIndex: colIndex,
      // rowIndex: rowIndex,
      // approve: approve,
      // issue: issue,
      // note: note,
      resolve: {
        typeValue: function() {
          return typeValue;
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
      console.log(response);
      console.log("Passing Data into getInputReturn");
      jsonData.getInputReturn(
        response['typeValue'],
        response['colIndex'],
        response['rowIndex'],
        response['approve'],
        response['issue'],
        response['note']
      );
    }, function () {
      $log.info('Modal dismissed at: ' + new Date());
    });
  }
});

appname.controller('ModalInstanceCtrl', function ($scope, $uibModalInstance, typeValue, colIndex, rowIndex, approve, issue, note) {

  $scope.typeValue = typeValue;
  $scope.colIndex = colIndex;
  $scope.rowIndex = rowIndex;
  $scope.approve = approve;
  $scope.issue = issue;
  $scope.note = note;

  $scope.ok = function () {
   $uibModalInstance.close({"typeValue" : $scope.typeValue, "colIndex" : $scope.colIndex, "rowIndex" : $scope.rowIndex, "approve" : $scope.approve, "issue" : $scope.issue, "note" : $scope.note});
  };

  $scope.cancel = function () {
    $uibModalInstance.dismiss('cancel');
  };
});


appname.service('jsonData', function($http) {

  $http.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded";

  this.getTableData = function() {
  	return $http({
  		url: path,
  		method: 'GET',
  	}).then(function(returnTableData){return returnTableData.data});
  };

  this.getInputReturn = function(typeValue,colIndexValue,rowIndexValue,approvedValue,issueValue,notesValue){
        if (typeValue == "cell"){
          var inputData = {
            "type":typeValue,
            "colIndex":colIndexValue,
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

});