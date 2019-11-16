(function () {
    'use strict';

    angular.module('poolBear')

        .factory('themeService', function () {
            let theme = "";
            let setTheme = function (themeName) {
                console.log("SET THEME FIRED ");
                theme = themeName
            }

            let getTheme = function (callback) {
                console.log("GET THEME FIRED");
                callback(theme);
            }

            return {
                getTheme: getTheme,
                setTheme: setTheme,

            };
        });
}());