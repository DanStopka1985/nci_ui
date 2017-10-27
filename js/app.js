'use strict';
let app = angular.module("app", ['ui.grid', 'ngRoute', 'ui.grid.pagination', 'ngTouch', 'ui.grid.selection', 'ui.grid.grouping','ui.grid.selection','ui.grid.pagination','ui.grid.pinning','ui.grid.resizeColumns']);

app.config(['$routeProvider',
    function($routeProvider) {
        $routeProvider.
        when('/case1', {
            templateUrl: 'partials/case1.html',
            title: 'Использование ИЭМК',
            controller: 'case1CTRL'
        }).
        when('/znp1', {
            templateUrl: 'partials/znp1.html',
            title:'Доступность первичной медицинской помощи',
            controller: 'znp1CTRL'
        }).
        when('/ref1', {
            templateUrl: 'partials/ref1.html',
            title:'Доступность первичной медицинской помощи',
            controller: 'ref1CTRL'

        }).
        when('/caseStatistic', {
            templateUrl: 'partials/caseStatistic.html',
            title:'Статистика по случаям',
            controller: 'caseStatisticCTRL'
        }).
        when('/temp', {
            templateUrl: 'partials/temp.html',
            title:'temp',
            controller: 'tempCTRL'
        })
    }]);
