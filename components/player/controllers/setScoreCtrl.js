(function () {
    "use strict";

    angular.module("poolBear.player")

        .config(function ($stateProvider) {

            $stateProvider
                .state('app.playersetscore', {
                    url: '/player/setscore/:id',
                    data: {title: 'Set Score'},
                    views: {
                        'main': {

                            controller: 'SetScoreController',
                            templateUrl: 'components/player/views/_setscore.html',

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
        .controller('SetScoreController',
            ['$scope', '$rootScope', '$firebaseAuth', '$firebaseArray', 'FIREBASE_URL', '$firebaseObject', '$stateParams', '$state', 'confirmScoreService', 'firebaseDataService',
                function ($scope, $rootScope, $firebaseAuth, $firebaseArray, FIREBASE_URL, $firebaseObject, $stateParams, $state, confirmScoreService, firebaseDataService) {
                    console.log("SetScoreController fired");


                    // CONNECT TO FIREBASE
                    let auth = firebase.auth();
                    let database = firebase.database();

                    auth.onAuthStateChanged(function (authUser) {
                        if (authUser) {
                            let userId = firebase.auth().currentUser.uid;
                            let setScorePlayerUserId = $stateParams.id;


                            //GET NOTIFICATION START
                            // firebaseDataService.getNotifications(userId, function (notesArray) {
                            //     let notificationInfoPost  = notesArray;
                            // });


                            //GET NOTIFICATION START

                            var getOpponentDetails =  function (callback) {
                               firebaseDataService.getPlayerDetails(setScorePlayerUserId, function (opponentData) {
                                    callback(opponentData)
                                });
                            }

                            var getUserDetails =  function (callback) {
                                firebaseDataService.getPlayerDetails(userId, function (userData) {
                                    callback(userData)
                                });
                            }


                            //create reference to get players detail
                            // let PlayerRecieveRef = new Firebase(FIREBASE_URL + 'bears/poolbear/users/' + setScorePlayerUserId);
                            // let playerRecieveInfo = $firebaseObject(PlayerRecieveRef);
                            //     $scope.playerRecieveScore = playerRecieveInfo;
                            // $scope.currentBearObject= playerRecieveInfo;


                            //GET NOTIFICATION START
                            // firebaseDataService.getNotifications(setScorePlayerUserId, function (notesArray) {
                            //     let notificationInfoRecieve   = notesArray;
                            // });

                            // var notificationRefRecieve = new Firebase(FIREBASE_URL + 'bears/poolbear/notification/' + setScorePlayerUserId);
                            // //       $firebaseArray creates an empty array and placed using the reference create above
                            // var notificationInfoRecieve = $firebaseArray(notificationRefRecieve);


                            // The addNotification function pushes
                            // Alerts to both the
                            $scope.addNotification = function (type) {
                                console.log("addNotification setScoreCtrl fired");

                                getOpponentDetails(function (data) {
                                    var playerRecieveInfo = data;
                                    $scope.totalGame = $scope.notificationWinsPost + $scope.notificationWinsRecieve;
                                    let noteUserRef = database.ref('bears/poolbear/notification/' + userId).push();
                                    // let noteUserPost = noteUserRef.push();
                                    // let key = noteUserRef.key;


                                    noteUserRef.set({
                                        playerPostLost: $scope.totalGame - $scope.notificationWinsPost,
                                        playerRecieveLost: $scope.totalGame - $scope.notificationWinsRecieve,
                                        notificationWinsPost: $scope.notificationWinsPost,
                                        notificationWinsRecieve: $scope.notificationWinsRecieve,
                                        playerPostFirstName: $rootScope.currentUser.firstname,
                                        playerPostlastName: $rootScope.currentUser.lastname,
                                        playerRecieveFirstName: (playerRecieveInfo && playerRecieveInfo.firstname) ? playerRecieveInfo.firstname : "noName",
                                        playerRecieveLastName: (playerRecieveInfo && playerRecieveInfo.lastname) ? playerRecieveInfo.lastname : "noName",
                                        postImage: $rootScope.currentUser.userimage,
                                        recieveImage: playerRecieveInfo.userimage,


                                        postTag: $rootScope.currentUser.tagline,
                                        recieveTag: playerRecieveInfo.tagline,

                                        playerRecieveUserId: setScorePlayerUserId,
                                        totalGame: $scope.totalGame,
                                        confirmed: true,
                                        collapse: false,
                                        sender: true,
                                        confirmShow: false,
                                        confirmHide: false,
                                        date: Firebase.ServerValue.TIMESTAMP
                                    }).then(() => {
                                        console.log('Successfully set1');


                                        getUserDetails(function (data) {

                                            let playerRecieveInfo = data;
                                            console.log("playerRecieveInfo", playerRecieveInfo);
                                            let noteOpponentRef = database.ref('bears/poolbear/notification/' + setScorePlayerUserId).push();
                                            noteOpponentRef.set({
                                                resultID: "test",
                                                playerPostLost: $scope.totalGame - $scope.notificationWinsPost,
                                                playerRecieveLost: $scope.totalGame - $scope.notificationWinsRecieve,
                                                notificationWinsPost: $scope.notificationWinsPost,
                                                notificationWinsRecieve: $scope.notificationWinsRecieve,
                                                playerRecieveFirstName: playerRecieveInfo.firstname,
                                                playerRecieveLastName: playerRecieveInfo.lastname,
                                                postImage: playerRecieveInfo.userimage,
                                                recieveImage: $rootScope.currentUser.userimage,

                                                postTag: playerRecieveInfo.tagline,
                                                recieveTag: $rootScope.currentUser.tagline,
                                                playerPostFirstName: $rootScope.currentUser.firstname,
                                                playerPostlastName: $rootScope.currentUser.lastname,
                                                playerPostUserId: $rootScope.currentUser.regUser,
                                                totalGame: $scope.totalGame,
                                                confirmed: false,
                                                collapse: false,
                                                sender: false,
                                                confirmShow: false,
                                                confirmHide: false,
                                                date: Firebase.ServerValue.TIMESTAMP

                                            })
                                        });
                                    })
                                })
                            }// add note end
                        } // User Authenticated
                    })
                }])
}());

