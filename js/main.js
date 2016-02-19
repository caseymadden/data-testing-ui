var appname = angular.module('appname', ["ui.bootstrap","ngRoute"]);
var compareApp = angular.module('compareApp', []);

var path = 'http://hcdev9.jaymaul.com/+tls/service/testdata/getData'
var returnPath = 'http://hcdev9.jaymaul.com/+tls/service/testdata/updateData';
var markFinishedEndpoint = '';

appname.config(function ($routeProvider){
  $routeProvider.when('/:keywordSearch', {
    controller: 'appCtrl',
    templateUrl: 'table.html'
  })
});

