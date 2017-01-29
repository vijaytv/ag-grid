'use strict';

var angular = require('angular');

var moduleDependencies = [
  'agGrid',
  require('./grid').name
]; 

var app = angular.module('gridApp', moduleDependencies);
