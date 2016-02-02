var appname = angular.module('appname', []);
appname.controller('appCtrl', ['$scope',
  function($scope) {
    $scope.greeting = { text: 'Sup bitchass' };

    $scope.json = {
  "metaData": {
     "columns": {
     "rank": {"label": "Rank"},
     "url": {"label": "URL"},
     "domainAuthority": {"label": "Domain Authority"},
     "exactKeywordMatch": {"label": "Exact Keyword Match"},
     "metric1": {"label": "metric1"}
   }
  }, 
  "data": [
   {
     "rank": 1,
     "url": "http://asdfasdfsdf.com/alksdjf",
     "domainAuthority": 45.432342,
     "exactKeywordMatch": true,
     "metric1": "asdf"
     },
     {
     "rank": 2,
     "url": "http://abcdefg.hij",
     "domainAuthority": 25.23723,
     "exactKeywordMatch": false,
     "metric1": "qwerty"
     }
   ]}


  // $scope.json_header_example = [
  //   {"label": "Header0"},
  //   {"label": "Header1"},
  //   {"label": "Header2"}
  // ]

  // $scope.json_body_example = [
  //   {"body_label": "value0"},
  //   {"body_label": "value1"},
  //   {"body_label": "value2"},
  // ]

  // $scope.json_header_example2 = [
  //   {"metaData": {
  //     {"label": "Header0"},
  //     {"label": "Header1"},
  //     {"label": "Header2"}
  //   },
  //     {"label": "Header0"},
  //     {"label": "Header1"},
  //     {"label": "Header2"}
  //   }
  // ]
}]);