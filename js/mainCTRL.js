'use strict';

let baseUrl = 'http://localhost:8084/nci/fhir';

app.controller('reportCTRL', ['$scope', '$http', 'uiGridConstants', function($scope, $http, uiGridConstants) {

    let paginationOptions = {
        pageNumber: 1,
        pageSize: 25,
        sort: null
    };

     $scope.myData = [{resource: {name:'123'}}];
     $scope.gridOptions = {
         data: 'myData',
         enableRowHeaderSelection: false,
         multiSelect : false,
         enableFiltering: true,
         paginationPageSizes: [25, 50, 75],
         paginationPageSize: 25,
         useExternalPagination: true,
         useExternalSorting: true,
         columnDefs: [
            {field: 'resource.name', displayName: 'Название'}
        ],

         onRegisterApi: function(gridApi) {
             $scope.gridApi = gridApi;
             $scope.gridApi.core.on.sortChanged($scope, function(grid, sortColumns) {
                 if (sortColumns.length == 0) {
                     paginationOptions.sort = null;
                 } else {
                     paginationOptions.sort = sortColumns[0].sort.direction;
                 }
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
        let url;
        url = baseUrl + '/ValueSet?' + '_page=' + (paginationOptions.pageNumber - 1) + '&_count=' + paginationOptions.pageSize;

        $http({
            method: 'GET',
            url: url
        }).then(function successCallback(response) {
            console.log('get', paginationOptions.pageNumber);
            $scope.gridOptions.totalItems = response.data.total;
            var firstRow = (paginationOptions.pageNumber - 1) * paginationOptions.pageSize;
            $scope.myData = response.data.entry;
            //console.log(url);
        }, function errorCallback(response) {
        });




    };

    getPage();


}]);
