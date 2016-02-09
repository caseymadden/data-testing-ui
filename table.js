var appname = angular.module('appname', ["ui.bootstrap"]);
var path = 'data.json';
var returnPath = 'return_data.json'
appname.controller('appCtrl',function ($scope,$http,jsonData, $uibModal, $log){
  $scope.showModal = false;
  $scope.selectedColumn = function(selectedColumnName,selectedColumnIndex){
    $scope.typeValue = "column";
    // reset rowIndex when clicking the columns(only do it for this)
    $scope.rowIndex = ""
    $scope.ColumnIndex = selectedColumnIndex;
  };

  $scope.selectedRow = function(selectedRowName,selectedRowIndex){
    // As far as I am aware there is no way to select a row, only cells and columns.
    // When we have a "Select Row" button or whatever, use this?
    /*
    if($scope.ColumnIndex == 0){
      $scope.selectedType = "row";
    }else{
      $scope.selectedType = "cell";
    }
    $scope.rowIndex = selectedRowIndex;
    */
    $scope.rowIndex = selectedRowIndex;
  };

  $scope.selectedCell = function(selectedCellIndex){
    $scope.typeValue = "cell";
    $scope.ColumnIndex = selectedCellIndex;
  };

  $scope.toggleShowModal = function(input){
    $scope.showModal = !$scope.showModal;
    //$scope.returnClickedValue = input;
  };

  jsonData.getTableData().then(function(TableData){
    $scope.json = TableData;
  })

  $scope.getInput = function(typeValue,colIndexValue,rowIndexValue,approvedValue,issueValue,notesValue){
      $scope.showModal = !$scope.showModal;
      this.note = null;
      jsonData.getInputReturn(typeValue,colIndexValue,rowIndexValue,approvedValue,issueValue,notesValue)
  };
   $scope.animationsEnabled = true;

  $scope.open = function (typeValue,colIndex,rowIndex,approve,issue,note) {

    var modalInstance = $uibModal.open({
      animation: $scope.animationsEnabled,
      templateUrl: 'myModalContent.html',
      controller: 'ModalInstanceCtrl',
      typeValue: typeValue,
      colIndex: colIndex,
      rowIndex: rowIndex,
      approve: approve,
      issue: issue,
      note: note,
      resolve: {
        typeValue: function () {
          return typeValue;
        },
        colIndex: function () {
          return colIndex;
        },
        rowIndex: function () {
          return rowIndex;
        },
        approve: function () {
          return approve;
        },
        issue: function () {
          return issue;
        },
        note: function () {
          return note;
        }
      }
    });

    modalInstance.result.then(function (response) {
      console.log(response);
    }, function () {
      $log.info('Modal dismissed at: ' + new Date());
    });
  }
});

appname.service('jsonData', function($http) {
  $http.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded;charset=utf-8";

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
        /*
        if (typeValue == "row"){
          var inputData = {
            "type":typeValue,
            "rowIndex":rowIndexValue,
            "approved":approvedValue,
            "issue":issueValue,
            "notes":notesValue
          }
        }
        */
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
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        data: inputData
    }).then(function(){
      // Output info via console. Can't test POST.
      console.log("---------------------------------------")
      console.log("Input Type : " + inputData['type']);
      console.log("Column Index : " + inputData['colIndex']);
      console.log("Row Index : " + inputData['rowIndex']);
      console.log("Approved Status : " + inputData['approved']);
      console.log("Issue Status : " + inputData['issue']);
      console.log("Notes : " + inputData['notes']);
      console.log("---------------------------------------")
    });
  };

});

appname.controller('ModalInstanceCtrl', function ($scope, $uibModalInstance, typeValue, colIndex, rowIndex, approve, issue, note) {

  $scope.typeValue = typeValue;
  $scope.colIndex = colIndex;
  $scope.rowIndex = rowIndex;
  $scope.approve = approve;
  $scope.issue = issue;
  $scope.note = note;

  $scope.ok = function () {
    $uibModalInstance.close({"typeValue" : typeValue, "colIndex" : colIndex, "rowIndex" : rowIndex, "approve" : approve, "issue" : issue, "note" : note});
  };

  $scope.cancel = function () {
    $uibModalInstance.dismiss('cancel');
  };
});
