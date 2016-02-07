var appname = angular.module('appname', []);
var path = 'data.json';
var returnPath = 'return_data.json'
appname.controller('appCtrl',function ($scope,$http,jsonData){
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

  $scope.selectedCell = function(selectedCellName,selectedCellIndex){
    $scope.typeValue = "cell";
    $scope.ColumnIndex = selectedCellIndex;
  };

  $scope.toggleShowModal = function(input){
    $scope.showModal = !$scope.showModal;
    $scope.returnClickedValue = input;
  };

  jsonData.getTableData().then(function(TableData){
    $scope.json = TableData;
  })

  $scope.getInput = function(typeValue,colIndexValue,rowIndexValue,approvedValue,issueValue,notesValue){
      $scope.showModal = !$scope.showModal;
      this.note = null;
      jsonData.getInputReturn(typeValue,colIndexValue,rowIndexValue,approvedValue,issueValue,notesValue)
  };
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
