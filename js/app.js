'use strict';
let app = angular.module("app", ['ui.grid', 'ngRoute', 'ui.grid.pagination', 'ngTouch', 'ui.grid.selection', 'ui.grid.grouping','ui.grid.selection','ui.grid.pagination','ui.grid.pinning','ui.grid.resizeColumns']);

app.config(['$routeProvider',
    function($routeProvider) {
        $routeProvider.
        when('/main', {
            templateUrl: 'partials/main.html',
            title: 'Главная',
            controller: 'mainCTRL'
        }).
        when('/temp', {
            templateUrl: 'partials/history.html',
            title: 'Список версий',
            controller: 'historyCTRL'
        }).
        otherwise({redirectTo : '/main'})
    }]);
