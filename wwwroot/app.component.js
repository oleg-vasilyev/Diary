/*jshint esversion: 6 */
(function () { 'use strict'; } ());

angular.module('dairyApp').
    component('app', {
        templateUrl: 'wwwroot/app.html',
        controller: function (dairyService, $scope) {
            onSelectedDateAsLineUpdated(dairyService.getSelectedDateAsLine());
            dairyService.selectedDateAsLineUpdated(onSelectedDateAsLineUpdated);

            function onSelectedDateAsLineUpdated(selectedDateAsLine) {
                let [, month,] = selectedDateAsLine.split('.');
                let seasons = ['winter', 'spring', 'summer', 'autumn'];
                let currentSeason;
                month == 12 || month == 1 || month == 2 ? currentSeason = seasons[0] :
                    month == 3 || month == 4 || month == 5 ? currentSeason = seasons[1] :
                        month == 6 || month == 7 || month == 8 ? currentSeason = seasons[2] :
                            month == 9 || month == 10 || month == 11 ? currentSeason = seasons[3] : null;

                $scope.season = currentSeason;
            }
        }
    });