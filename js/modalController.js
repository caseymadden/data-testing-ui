appname.controller('ModalInstanceCtrl', function ($scope, $uibModalInstance, typeValue, keyword, columnID, colIndex, rowIndex, approve, issue, note) {

  $scope.typeValue = typeValue;
  $scope.keyword = keyword;
  $scope.columnID = columnID
  $scope.colIndex = colIndex;
  $scope.rowIndex = rowIndex;
  $scope.approve = approve;
  $scope.issue = issue;
  $scope.note = note;

  $scope.ok = function () {
    $uibModalInstance.close({"typeValue" : $scope.typeValue, "keyword" : $scope.keyword, "columnID" : $scope.columnID, "colIndex" : $scope.colIndex, "rowIndex" : $scope.rowIndex, "approve" : $scope.approve, "issue" : $scope.issue, "note" : $scope.note});
  };

  $scope.cancel = function () {
    $uibModalInstance.dismiss('cancel');
  };
});