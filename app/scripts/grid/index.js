'use strict';



var grid = angular.module('grid', [])
.controller('GridCtrl',require('./grid-ctrl'))
.service('DataService', require('./data-service'))
;

module.exports = grid;
