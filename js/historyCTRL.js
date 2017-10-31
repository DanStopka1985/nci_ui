'use strict';

app.controller('historyCTRL', ['$scope', '$http', 'uiGridConstants', 'i18nService', '$window', '$routeParams', function($scope, $http, uiGridConstants, i18nService, $window, $routeParams) {
    console.log($routeParams);

    //let foundedRefType = $routeParams.refType;

    i18nService.setCurrentLang('ru');
    let paginationOptions = {
        pageNumber: 1,
        pageSize: 25,
        sort: null
    };

    $scope.gridOptions = {
        data: 'myData',
        enableRowHeaderSelection: false,
        multiSelect: false,
        enableFiltering: true,
        paginationPageSizes: [25, 50, 75],
        paginationPageSize: 25,
        useExternalPagination: true,
        columnDefs: [
            {field: 'resource.name', displayName: 'Название'},
            {field: 'resource.version', displayName: 'Версия'},
            {field: 'resource.publisher', displayName: 'Источник'},
            {field: 'resource.url', displayName: 'URL'},
        ],
        onRegisterApi: function(gridApi) {
            $scope.gridApi = gridApi;
            $scope.gridApi.core.on.sortChanged($scope, function(grid, sortColumns) {
                if (sortColumns.length === 0) {
                    paginationOptions.sort = null;
                } else
                    paginationOptions.sort = sortColumns[0].sort.direction;
                getPage();
            });
            gridApi.pagination.on.paginationChanged($scope, function (newPage, pageSize) {
                paginationOptions.pageNumber = newPage;
                paginationOptions.pageSize = pageSize;
                getPage();
            });
        }
    };

    let getPage = function() {
        let url =
            baseUrl + '/' + $routeParams.refType + '/' + $routeParams.refId + '/' + '_history' + '?' + '_page=' + (paginationOptions.pageNumber - 1) + '&_count=' + paginationOptions.pageSize;

        $http({
            method: 'GET',
            url: url
        }).then(function successCallback(response) {
            $scope.gridOptions.totalItems = response.data.total;
            let firstRow = (paginationOptions.pageNumber - 1) * paginationOptions.pageSize;
            $scope.myData = response.data.entry;
        }, function errorCallback(response) {
        });
    };

    $scope.search = function () {
        paginationOptions.pageNumber = 1;
        getPage();
        console.log($scope.refType);
    };

    getPage();

    $scope.goToHistory = function () {
        let history_url = baseUrl + '/' + foundedRefType + '/' + $scope.gridApi.selection.getSelectedRows()[0].resource.id + '/_history';
        $http({
            method: 'GET',
            url: history_url
        }).then(function successCallback(response) {
            let x = '#!' + foundedRefType + '/' + $scope.gridApi.selection.getSelectedRows()[0].resource.id + '/history';
            $window.location.href = x;
        }, function errorCallback(response) {
        });
    };

    $scope.selected1Row = function () {
        return  $scope.gridApi.selection.getSelectedRows()[0] !== undefined;
    };

}]);
