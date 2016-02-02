var appname = angular.module('appname', []);
appname.controller('appCtrl', ['$scope',
  function($scope) {
    $scope.json = 

{
  "keyword": "medical billing software",
  "testingStatus": {
    "approved": false,
    "issue": false,
    "notes": "these are <b>notes</b>"         
  },
  "columns": [
    {
      "columnDef": {
        "id": "rank",
        "label": "Rank"
      },
      "testingStatus": {
        "approved": false,
        "issue": false,
        "notes": "these are <b>notes</b>"       
      }
    },
    {
      "columnDef": {
        "id": "url",
        "label": "Url"
      },
      "testingStatus": {
        "approved": false,
        "issue": false,
        "notes": "these are <b>notes</b>"       
      }
    },
    {
      "columnDef": {
        "id": "metric1",
        "label": "Metric 1"
      },
      "testingStatus": {
        "approved": false,
        "issue": false,
        "notes": "these are <b>notes</b>"       
      }
    }
    // more columns...
  ],
  "rows": [ 
    {
      "rowData": {
        "rank": {
          "value": 1,
          "testingStatus": {
            "approved": false,
            "issue": false,
            "notes": "these are <b>notes</b>"         
          }
        },
        "url": {
          "value": "http://laskjflaj.co",
          "testingStatus": {
            "approved": false,
            "issue": false,
            "notes": "these are <b>notes</b>"         
          }
        },
        "metric1": {
          "value": 12.1,
          "testingStatus": {
            "approved": false,
            "issue": false,
            "notes": "these are <b>notes</b>"         
          }
        }
      },
      "testingStatus": {
        "approved": false,
        "issue": false,
        "notes": "these are <b>notes</b>"
      }
    }
    // more rows...
  ]
}



}]);