'use strict';
angular.module('poolBear.login', [

    'ngFileUpload',
    'poolBear.auth'

])
    .config(function ($stateProvider, $urlRouterProvider) {

        $stateProvider
            .state('app.home', {
                url: '/',

                views: {
                    'main': {
                        controller: 'RegistrationController',
                        templateUrl: 'components/login/login.html'
                    }
                }
            })

            .state('app.registration', {
                url: '/register',
                views: {
                    'main': {
                        controller: 'RegistrationController',
                        templateUrl: 'components/login/views/register.html',
                    }
                }
            })

            .state('app.score', {
                url: '/score',
                views: {
                    'main': {
                        controller: 'MeetingsController',
                        templateUrl: 'components/login/views/score.html',
                    }
                }
            }).state('app.success', {
            url: '/success',
            views: {
                'main': {
                    controller: 'SuccessController',
                    templateUrl: 'components/login/views/success.html',

                    resolve: {
                        currentAuth: function (Authentication) {
                            return Authentication.requireAuth();
                        } //current Auth
                    } //resolve
                }
            }
        })

        $urlRouterProvider.otherwise('/login');

    })

    .controller('SuccessController', ['$scope', '$rootScope', '$firebaseAuth', '$firebaseObject', "$firebaseArray", 'FIREBASE_URL', 'fileUpload', 'Upload', '$timeout', '$window',

                             function ($scope, $rootScope, $firebaseAuth, $firebaseObject, $firebaseArray, FIREBASE_URL, fileUpload, Upload, $timeout, $window) {


            $scope.message = "Success!!!";
            var ref = new Firebase(FIREBASE_URL);
            var auth = $firebaseAuth(ref);


            auth.$onAuth(function (authUser) {

                if (authUser) {


                    // CHANGE THEME START

                    $scope.changeTheme = function (themeName) {
                        console.log("CHANGE-THEME FIRED" , themeName );

                        $rootScope.theme =themeName;

                    }

                    var PlayerRef = new Firebase(FIREBASE_URL + 'users/' + authUser.uid);
                    var bearRef = new Firebase(FIREBASE_URL + 'bears/');

                    //       $firebaseArray creates an empty array and placed using the reference create above
                    $firebaseObject(PlayerRef).$loaded(function (player) {
                        $scope.player = player;
                        $scope.userBears = [];
                        // $firebaseArray(bearRef).$loaded(function(bears) {
                        //     player.bears.forEach(function(bearid) {
                        //         $scope.userBears.push(bears.$getRecord(bearid.name));
                        //     });
                        // });

                    });
                } // User Authenticated
            }); // on Auth

        }//controller

    ]);
         

