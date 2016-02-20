var appname = angular.module('appname', ["ui.bootstrap","ngRoute"]);
var compareApp = angular.module('compareApp', []);

appname.config(function ($routeProvider){
  $routeProvider.when('/:keywordSearch', {
    controller: 'appCtrl',
    templateUrl: 'table.html'
  })
});
