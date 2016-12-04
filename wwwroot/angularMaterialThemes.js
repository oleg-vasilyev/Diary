angular.module('dairyApp').
    config(function ($mdThemingProvider) {

        $mdThemingProvider.theme('default')
            .primaryPalette('teal')

        $mdThemingProvider.theme('autumn')
            .primaryPalette('blue-grey')
        $mdThemingProvider.theme('winter')
            .primaryPalette('indigo')
        $mdThemingProvider.theme('spring')
            .primaryPalette('green')
        $mdThemingProvider.theme('summer')
            .primaryPalette('teal')

        $mdThemingProvider.alwaysWatchTheme(true);
    });