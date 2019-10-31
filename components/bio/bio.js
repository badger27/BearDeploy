(function () {
    "use strict";
angular.module('poolBear.bio', [])
    .config(function ($stateProvider) {

        $stateProvider
            .state('app.bio', {
                url: '/bio',
                data: {title: 'bio'},
                views: {
                    'main': {
                        controller: 'bioController',
                        templateUrl: 'components/bio/bio.html',

                        //This code restricts access to logged in users only
                        resolve: {
                            currentAuth: function (Authentication) {
                                return Authentication.requireAuth();
                            } //current Auth
                        } //resolve
                    }
                }
            })
    })


    .controller('bioController',
        ['$scope', '$rootScope', '$firebaseAuth', '$firebaseArray', '$firebaseObject', 'FIREBASE_URL', 'firebaseDataService',
            function ($scope, $rootScope, $firebaseAuth, $firebaseArray, $firebaseObject, FIREBASE_URL, firebaseDataService) {
                console.log("BIO FIRED");

            }])

}());