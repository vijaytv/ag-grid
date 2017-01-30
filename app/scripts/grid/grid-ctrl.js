'use strict';

var agGrid = require('ag-grid');

agGrid.initialiseAgGridWithAngular1(angular);

var GridCtrl = function($scope,DataService) {
  var columnDefs = [
          {headerName: "City", field: "city"},
          {headerName: "DOB", field: "dob"},
          {headerName: "Name", field: "name"}
      ];

  $scope.gridOptions = {
      columnDefs: columnDefs,
      rowData: null,
      enableSorting: true,
      enableFilter: false
  };

  DataService.getPeople().then(function(data){
      $scope.gridOptions.api.setRowData(data);
  })

};

GridCtrl.$inject = ['$scope','DataService'];

module.exports = GridCtrl;
