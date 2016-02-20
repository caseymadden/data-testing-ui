var appname = angular.module('appname', ["ui.bootstrap","ngRoute"]);
var compareApp = angular.module('compareApp', []);
var path = ''
var returnPath = '';
var markFinishedEndpoint = '';

appname.config(function ($routeProvider){
  $routeProvider.when('/:keywordSearch', {
    controller: 'appCtrl',
    templateUrl: 'table.html'
  })
});
