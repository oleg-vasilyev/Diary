/*jshint esversion: 6 */
(function () { 'use strict'; } ());

angular.module('dairyApp').
    component('dairy', {
        templateUrl: 'wwwroot/dairy.html',
        controller: ($scope) => {
            $scope.logFiles = (files) => {
                console.log(files);
            }
        }
    });
