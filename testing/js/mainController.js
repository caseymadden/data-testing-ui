appname.controller('appCtrl',function ($scope,$http,GET_DATA_ENDPOINT,POST_DATA_ENDPOINT,MARK_FINISHED_ENDPOINT,jsonData, $uibModal, $log, $routeParams){

  $('#table_div').on('scroll',function() {
    $('#header_div').scrollLeft($(this).scrollLeft());
    $('#freeze_container').scrollTop($(this).scrollTop());
  });

  $("#searchbox").keyup(function(event){
    if(event.keyCode == 13){
        $("#searchbtn").click();
    }
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

  $scope.open = function(typeValue,keyword,columnID,colIndex,rowIndex,approve,issue,note) {

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
        keyword: function() {
          return $routeParams.keywordSearch;
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
        response['keyword'],
        response['columnID'],
        response['colIndex'],
        response['rowIndex'],
        response['approve'],
        response['issue'],
        response['note']);

      if(response['typeValue'] == 'cell' || response['typeValue'] == 'row'){
        var id = $scope.json.columns[response['colIndex']].columnDef.id;
        $scope.json.rows[response['rowIndex']].rowData[id].testingStatus.approved = response['approve'];
        $scope.json.rows[response['rowIndex']].rowData[id].testingStatus.issue = response['issue'];
        $scope.json.rows[response['rowIndex']].rowData[id].testingStatus.notes = response['note'];
        if(response['typeValue'] == 'row'){
          $scope.json.rows[response['rowIndex']].testingStatus.approved = response['approve'];
          $scope.json.rows[response['rowIndex']].testingStatus.issue = response['issue'];
          $scope.json.rows[response['rowIndex']].testingStatus.notes = response['note'];
        }
      } else
      if(response['typeValue'] == 'column'){
        $scope.json.columns[response['colIndex']].testingStatus.approved = response['approve'];
        $scope.json.columns[response['colIndex']].testingStatus.issue = response['issue'];
        $scope.json.columns[response['colIndex']].testingStatus.notes = response['note'];
      }

      console.log("Passing Data into getInputReturn");
    }, function () {
      $log.info('Modal dismissed at: ' + new Date());
    });
  }
});
