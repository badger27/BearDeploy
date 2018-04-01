(function () {
    "use strict";

    angular.module('poolBear.login').controller('RegistrationController',


        ['$scope', '$rootScope', 'Authentication', '$state', '$location', '$firebaseArray', 'FIREBASE_URL', '$firebaseObject', '$firebaseAuth', 'fileUpload', 'Upload', '$timeout', '$window',
            function ($scope, $rootScope, Authentication, $state, $location, $firebaseArray, FIREBASE_URL, $firebaseObject, $firebaseAuth, fileUpload, Upload, $timeout, $window) {

                console.log("RegistrationController-CTRL-FIRED");
                // GET AUTH REFERENCE
                var ref = new Firebase(FIREBASE_URL);
                var auth = $firebaseAuth(ref);


                auth.$onAuth(function (authUser) {
                    if (authUser) {


                        var bearAddRef = new Firebase(FIREBASE_URL + 'users/' + $rootScope.currentUser.$id);
                        var UserRef = new Firebase(FIREBASE_URL + 'bears/poolbear/users/' + $rootScope.currentUser.$id);
                        var registerBearRef = new Firebase(FIREBASE_URL + 'bears/poolbear/users/' + $rootScope.currentUser.$id + '/bearList');

                        // var test = $firebaseObject(bearAddRef);

                        $scope.currentState = $state.current.name;
                        $scope.showPageHero = $location.path() === '/';
                        $scope.profileUser = UserRef.userimage;
                        $scope.registeredBearsList = $firebaseObject(registerBearRef);
                        console.log("$scope.registeredBearsList" , $scope.registeredBearsList);



                        //CHECK IT IMAGE IS PRESENT


                        $firebaseObject(bearAddRef).$loaded(function (player) {


                            if (player.userimage === "noImages") {
                                $scope.imageUploadShow = true;
                                $scope.bearShow = false;
                            } else {
                                $scope.imageUploadShow = false;
                                $scope.bearShow = true;
                            }


                        });


                        $scope.detail = false;
                        $scope.hideDetail = function () {
                            $scope.detail = !$scope.detail;

                        }


                        $scope.checked = false;
                        $scope.bearArray = [];


                        $scope.bearsList = [
                            {id: 1, name: "poolBear"},
                            {id: 2, name: "runningBear"},
                            {id: 3, name: "footballBear"},
                            {id: 4, name: "squashBear"}
                        ];


                        Array.prototype.remove = function () {

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
                        $scope.isChecked = function (bear, checked) {
                            if (checked === true) {
                                $scope.bearArray.push(bear);
                            } else {
                                $scope.bearArray.remove(bear);
                            }
                        }

                        //BEAR LIST
                        var bearListObject = $firebaseObject(bearAddRef);
                        $scope.bearLists = bearListObject;

                    } // User Authenticated
                }); // on Auth




                //ADD BEARS
                $scope.addbears = function (theme) {
                    console.log("ADD-BEARS FIRED " , theme);


                    theme.forEach(function(item) {


                   item = item.toLowerCase();
                        console.log("item",item);



                    let bearAddRef = new Firebase(FIREBASE_URL + 'users/' + $rootScope.currentUser.$id);
                    let poolBearUserRef = new Firebase(FIREBASE_URL + 'bears/' + item + '/users');
                    let newBearArray = [];


                        $scope.bearArray.forEach(function (item) {
                            newBearArray.push(item);
                        });
                        $scope.registeredBearsList.forEach(function (item) {
                            newBearArray.push(item);
                        })


                        var uniqList = _.uniq(newBearArray);
                        console.log("uniqList " , uniqList );

                        poolBearUserRef.child($rootScope.currentUser.$id).update({
                            bearList: uniqList
                        }); //user info

                    // ADD BEAR REF START
                    bearAddRef.on('value', function (snap) {
                        var mainPlayerInfo = snap.val();
                        mainPlayerInfo.wins = 0;
                        mainPlayerInfo.lost = 0;
                        mainPlayerInfo.points = 0;
                        mainPlayerInfo.cheats = 0;
                        mainPlayerInfo.declined = 0;
                        mainPlayerInfo.active = true;
                        mainPlayerInfo.bearList= uniqList;
                        mainPlayerInfo.elo= 5;

                        poolBearUserRef.child($rootScope.currentUser.$id).once("value", snapshot => {

                            const checkbear = snapshot.val();
                            console.log("checkbear" , checkbear );

                            if(checkbear === null || checkbear === undefined ){
                                console.log("user exists!");
                            }else{
                                console.log("bear created!");
                                poolBearUserRef.child($rootScope.currentUser.$id).set(mainPlayerInfo);
                            }
                        });
                    });



                    });
                }
                // ADD BEAR REF END //



                $scope.login = function () {
                    console.log("LOGIN In Registrator FIRED ?");
                    Authentication.login($scope.user);

                }; //login

                $scope.logout = function () {
                    Authentication.logout();
                }; //logouti

                $scope.register = function () {
                    Authentication.register($scope.user);
                }; // register


            }]) // Controller#


}());