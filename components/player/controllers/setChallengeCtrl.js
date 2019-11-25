(function(){
"use strict";

    angular.module("poolBear.player")

        .config(function ($stateProvider) {

            $stateProvider
        .state('app.playersetchallenge', {
            url: '/player/setchallenge/:id',
            data: {title: 'Set Challenge'},
            views: {
                'main': {

                    controller: 'SetChallengeController',
                    templateUrl: 'components/player/views/_setchallenge.html',

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
        .controller('SetChallengeController',
            ['$scope', '$rootScope', '$firebaseAuth', '$firebaseArray', 'FIREBASE_URL', '$firebaseObject', '$stateParams', '$state', 'confirmScoreService','firebaseDataService',
                function ($scope, $rootScope, $firebaseAuth, $firebaseArray, FIREBASE_URL, $firebaseObject, $stateParams, $state, confirmScoreService, firebaseDataService) {

                 console.log("SetChallengeController Fired" + $rootScope.currentUser.$id);


                    // CONNECT TO FIREBASE
                    var auth = firebase.auth();
                    var database = firebase.database();

                    auth.onAuthStateChanged(function (authUser) {
                        if (authUser) {
                            let userId = firebase.auth().currentUser.uid;

                            $scope.messageShow;
                            //****************************
                            // Notificatoin Post
                            // notificationRef is the location
                            // where the new Score Notifications
                            // are placed
                            //***********************************
                            //   showMessage();


                            //GET NOTIFICATION START
                            firebaseDataService.getNotifications(userId, function (notesArray) {
                                $scope.notifications = notesArray;
                            });
                            // NOTIFICATION END

                            // var notificationRef = new Firebase(FIREBASE_URL + 'bears/poolbear/challenges/' + $rootScope.currentUser.$id);
                            // var notificationInfoPost = $firebaseArray(notificationRef);
                            // $scope.notifications = notificationInfoPost;




                            // ENSURES THAT POSTS ARE LOADED ON THE PAGE LOAD
                            // notificationInfoPost.$loaded().then(function (data) {console.log("$loaded fired" );
                            //     console.log("$loaded fired" );
                            //     $rootScope.howManyNotification = notificationInfoPost.length;
                            //
                            // });
                            //Make sure meeting data is loaded

                            // notificationInfoPost.$watch(function (data) {
                            //     console.log("$watch fired" );
                            //     $rootScope.howManyNotification = notificationInfoPost.length;
                            // });


                            //*******************
                            // Notification Recieve: Below covers
                            // all the elements  required to populate
                            // the player recieving the notification
                            //*********************

                            //GETS PLAYER OBJECT START
                            // var setScorePlayerUserId = $stateParams.id;
                            // var PlayerRecieveRef = new Firebase(FIREBASE_URL + 'bears/poolbear/users/' + setScorePlayerUserId);
                            //
                            //
                            // var playerRecieveInfo = $firebaseObject(PlayerRecieveRef);
                            // $scope.playerRecieveScore = playerRecieveInfo;
                            // // $scope.currentBearObject= playerRecieveInfo;
                            //
                            // var notificationRefRecieve = new Firebase(FIREBASE_URL + 'bears/poolbear/notification/' +
                            //     //player clicked here
                            //     setScorePlayerUserId);
                            //
                            // var notificationInfoRecieve = $firebaseArray(notificationRefRecieve);
                            //
                            //
                            // notificationInfoRecieve.$loaded().then(function (data) {
                            //     $rootScope.howManyNotification = notificationInfoRecieve.length;
                            //
                            // });
                            //
                            // notificationInfoRecieve.$watch(function (data) {
                            //     $rootScope.howManyNotification = notificationInfoRecieve.length;
                            //
                            // });


                            // The addNotification function pushes
                            // Alerts to both the
                            $scope.addNotification = function (type) {

                                console.log("AddNotification" , type );

                                $scope.playerPostFirstNameRef = $rootScope.currentUser.firstname;
                                $scope.playerPostLastNameRef = $rootScope.currentUser.lastname;


                                $scope.totalGame = $scope.notificationWinsPost + $scope.notificationWinsRecieve;


                                $scope.playerPostLost = $scope.totalGame - $scope.notificationWinsPost;
                                $scope.playerRecieveLost = $scope.totalGame - $scope.notificationWinsRecieve;


                                //        ADD nofitication to post
                                notificationInfoPost.$add({
                                    playerPostLost: $scope.playerPostLost,
                                    playerRecieveLost: $scope.playerRecieveLost,
                                    notificationWinsPost: $scope.notificationWinsPost,
                                    notificationWinsRecieve: $scope.notificationWinsRecieve,
                                    playerPostFirstName: $scope.playerPostFirstNameRef,
                                    playerPostlastName: $scope.playerPostLastNameRef,
                                    playerRecieveFirstName: playerRecieveInfo.firstname,
                                    playerRecieveLastName: playerRecieveInfo.lastname,
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


                                }).then(function (notificationRef) {

                                    //          passes the result key reference into the sendesrnotification
                                    var resultId = notificationRef.key();
                                    var result = new Firebase(FIREBASE_URL + 'bears/poolbear/notification/' +
                                        $rootScope.currentUser.$id + '/' + resultId);

                                    var notificationInfoPostresult = $firebaseArray(result);
                                    notificationInfoPostresult.$add({
                                        resultID: resultId
                                    });


                                    //         Add post to reciever
                                    notificationInfoRecieve.$add({
                                        resultID: resultId,
                                        playerPostLost: $scope.playerPostLost,
                                        playerRecieveLost: $scope.playerRecieveLost,
                                        notificationWinsPost: $scope.notificationWinsPost,
                                        notificationWinsRecieve: $scope.notificationWinsRecieve,
                                        playerRecieveFirstName: playerRecieveInfo.firstname,
                                        playerRecieveLastName: playerRecieveInfo.lastname,
                                        postImage: playerRecieveInfo.userimage,
                                        recieveImage: $rootScope.currentUser.userimage,


                                        postTag: playerRecieveInfo.tagline,
                                        recieveTag: $rootScope.currentUser.tagline,
                                        playerPostFirstName: $scope.playerPostFirstNameRef,
                                        playerPostlastName: $scope.playerPostLastNameRef,
                                        playerPostUserId: $rootScope.currentUser.$id,
                                        totalGame: $scope.totalGame,
                                        confirmed: false,
                                        collapse: false,
                                        sender: false,
                                        confirmShow: false,
                                        confirmHide: false,
                                        date: Firebase.ServerValue.TIMESTAMP


                                    }).then(function (notificationRefRecieve) {

                                        var resultIdref = notificationRefRecieve.key();
                                        var resultref = new Firebase(FIREBASE_URL + 'bears/poolbear/notification/' +
                                            setScorePlayerUserId + '/' + resultIdref);

                                        var notificationInfoPostresultref = $firebaseArray(resultref);
                                        notificationInfoPostresultref.$add({
                                            resultID: resultIdref
                                        })
                                    })

                                    $scope.notificationWinsPost = '';
                                    $scope.notificationWinsRecieve = '';

                                }); //promise

                            }; // addMeeting


                            $scope.confirmHide = function (key, note) {
                                var confirmHideRef = new Firebase(FIREBASE_URL + 'bears/poolbear/notification/' + $rootScope.currentUser.$id + '/' + note.$id);
                                confirmHideRef.update({confirmHide: true});
                                showMessage();
                            }; //confirm Hide


                            var showMessage = function () {
                                notificationInfoPost.$loaded().then(function (data) {
                                    var noteTotal = notificationInfoPost.length;
                                    var hiddenNotes = _.filter(data, function (item) {
                                        return item.confirmHide == true;
                                    });
                                    var hiddenNotesTotal = hiddenNotes.length;

                                    if (hiddenNotesTotal === noteTotal) {
                                        $scope.messageShow = true;


                                    } else {
                                        $scope.messageShow = false;
                                    }

                                }); //Make sure meeting data is loaded
                            };

                            showMessage();


                            // //TO DO
                            // $scope.deleteMeeting = function (key) {
                            //     notificationInfoPost.$remove(key);
                            // }; // deleteMeeting
                            //
                            // $scope.confirmedHide = true;
                            // $scope.confirmScoreTrigger = function (key, note) {
                            //     confirmScoreService.confirmScore(key, note, $rootScope.currentUser.$id);
                            // }; // confirm


                        } // User Authenticated
                    }); // on Auth
                }])


}());


