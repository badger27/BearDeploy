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
                        templateUrl: 'components/login/login.html'}
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
                        currentAuth: function(Authentication) {
                            return Authentication.requireAuth();
                        } //current Auth
                    } //resolve
                }
            }
        })

        $urlRouterProvider.otherwise('/login');

    }).controller('RegistrationController',
    ['$scope', '$rootScope', 'Authentication', '$state','$location', '$firebaseArray','FIREBASE_URL', '$firebaseObject', '$firebaseAuth','fileUpload', 'Upload', '$timeout', '$window',
        function($scope,$rootScope, Authentication, $state, $location,$firebaseArray , FIREBASE_URL, $firebaseObject, $firebaseAuth, fileUpload ,Upload, $timeout, $window) {

            console.log("RegistrationController-CTRL-FIRED" );
            // GET AUTH REFERENCE
            var ref = new Firebase(FIREBASE_URL);
            var auth = $firebaseAuth(ref);


            auth.$onAuth(function (authUser) {
                if (authUser) {


                    var bearAddRef = new Firebase(FIREBASE_URL + 'users/' + $rootScope.currentUser.$id);
                    var UserRef= new Firebase(FIREBASE_URL + 'bears/poolbear/users/' + $rootScope.currentUser.$id);
                    var registerBearRef = new Firebase(FIREBASE_URL + 'bears/poolbear/users/' + $rootScope.currentUser.$id + '/bearList');

                    var test=$firebaseObject(bearAddRef);

                    $scope.currentState = $state.current.name;
                    $scope.showPageHero = $location.path() === '/';
                    console.log("UserRef.userimage" , UserRef);
                    $scope.profileUser =  UserRef.userimage;

                    $scope.registeredBearsList = $firebaseObject(registerBearRef);
                    console.log("$scope.registeredBearsList" ,   $scope.registeredBearsList);




                    //CHECK IT IMAGE IS PRESENT


                    $firebaseObject(bearAddRef).$loaded(function (player) {
                        console.log("bearAddRef.userimage" , player.userimage);

                        if( player.userimage === "noImages") {
                            $scope.imageUploadShow = true;
                            $scope.bearShow = false;
                        }else {
                            $scope.imageUploadShow = false;
                            $scope.bearShow = true;
                        }


                    });





                    $scope.detail= false;
                    $scope.hideDetail = function(){
                        $scope.detail =  !$scope.detail;
                        console.log(" $scope.detail " +  $scope.detail );
                    }


                    $scope.checked = false ;
                    $scope.bearArray = [];


                    $scope.bearsList=[
                        {id:1, name:"poolBear"},
                        {id:2, name:"runningBear"},
                        {id:3, name:"footballBear"},
                        {id:4, name:"squashBear"}
                    ];

                    $scope.chosebear  = function () {
                        console.log("chosebears" );

                    }

                    Array.prototype.remove = function() {
                        console.log("REMOVE FIRED" );
                        var what, a = arguments, L = a.length, ax;
                        while (L && this.length) {
                            what = a[--L];
                            while ((ax = this.indexOf(what)) !== -1) {
                                this.splice(ax, 1);
                            }
                        }
                        return this;
                    };


                    //CHECK IN BEAR SELECT
                    $scope.isChecked =function (bear, checked) {
                        console.log("checked", checked);
                        console.log("bear", bear);
                        if(checked === true){
                            $scope.bearArray.push(bear);
                            console.log("$scope.bearArray " , $scope.bearArray);

                        }else{
                            $scope.bearArray.remove(bear);
                            console.log("$scope.bearArray" , $scope.bearArray);
                        }
                    }

                    //BEAR LIST
                    var bearListObject=$firebaseObject(bearAddRef);
                    console.log("  bearAddRef" ,   bearListObject);
                    $scope.bearLists = bearListObject ;

                } // User Authenticated
            }); // on Auth

            //ADD BEARS
            $scope.addbears=function () {

                console.log("ADD-BEARS FIRED " );



                var bearAddRef = new Firebase(FIREBASE_URL + 'users/' + $rootScope.currentUser.$id);
                var poolBearUserRef = new Firebase(FIREBASE_URL + 'bears/poolbear/users');
                var test=$firebaseObject(poolBearUserRef);
                console.log("test" , test);
                console.log("poolBearUserRef" , poolBearUserRef);

                //TO DO
                //Loop through bear selection array
                //pass in bear name
                //Add bear to ng repeat, this could be stored in main user profile
                //push user to user in respective bear slection.
                //REF OBJECTS FOR POOl/SQUASH BEAR



                bearAddRef.on('value', function(snap){

                    console.log("snap" , snap.val());

                   var mainPlayerInfo = snap.val();
                    mainPlayerInfo.wins = 0;
                    mainPlayerInfo.lost = 0;
                    mainPlayerInfo.points = 0;
                    mainPlayerInfo.cheats = 0;
                    mainPlayerInfo.declined = 0;
                    mainPlayerInfo.active = true;

                    console.log("mainPlayerInfo ", mainPlayerInfo );

                    poolBearUserRef.child($rootScope.currentUser.$id).set(mainPlayerInfo);
                });


                bearAddRef.update({
                    bearList:   $scope.bearArray
                } ); //user info


            }

            $scope.login = function() {
                console.log("LOGIN FIRED");
                Authentication.login($scope.user);

            }; //login

            $scope.logout = function() {
                Authentication.logout();
            }; //logouti

            $scope.register = function() {
                console.log("REGISTER FIRED");
                console.log("$scope.user " , $scope.user);
                Authentication.register($scope.user);
            }; // register




        }]) // Controller#

    .controller('SuccessController', ['$scope','$rootScope', '$firebaseAuth', '$firebaseObject', "$firebaseArray", 'FIREBASE_URL', 'fileUpload', 'Upload', '$timeout', '$window',
        function(                      $scope,$rootScope, $firebaseAuth, $firebaseObject, $firebaseArray, FIREBASE_URL ,fileUpload, Upload, $timeout , $window) {


            $scope.message = "Success!!!";
            var ref = new Firebase(FIREBASE_URL);
            var auth = $firebaseAuth(ref);



            auth.$onAuth(function (authUser) {
                if (authUser) {

                    console.log(" $rootScope.currentUser.$id", $rootScope.currentUser.$id);
//                   var PlayerRef = new Firebase(FIREBASE_URL + 'users/');
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
         

