(function () {
    'use strict';

    angular.module('poolBear.api', []).factory('bearApi', ['$rootScope', '$http', '$q', '$firebaseAuth', '$firebaseObject', 'FIREBASE_URL',

        function bearApi($rootScope, $http, $q, $firebaseAuth, $firebaseObject, FIREBASE_URL) {

            var getPlayers = function () {
//            return $http.get('http://micrositeifd.azurewebsites.net/api/v1/1ddfe01a-2ced-4b5d-92ce-899738a8e95a/localisation/languages')
                return $http.get('http://gatherngo.tonicdigitalmedia.com/json/player.json')
                //             return $http.get('../json/player.json')
                    .then(function (response) {
                        return response.data;
                    });
            };

            // SHOP DATA START
            var getShopData = function () {
                return $http.get('/json/shop.json')
                    .then(function (response) {
                        console.log("response shop", response);
                        return response.data;
                    });
            };
            // SHOP DATA END


            var getPlayersfireBase = function () {
                var userRef = new Firebase('https://thebear.firebaseio.com/users');

                return $http.get(userRef)
                    .then(function (response) {
                        return response.data;
                    });
            };


            return {
                getPlayersfireBase: getPlayersfireBase,
                getPlayers: getPlayers,
                getShopData: getShopData
            };


        }
    ]);

}());

















