

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
            ['$scope', '$rootScope', '$firebaseAuth', '$firebaseArray', 'FIREBASE_URL', '$firebaseObject', '$stateParams', '$state', 'confirmScoreService',
                function ($scope, $rootScope, $firebaseAuth, $firebaseArray, FIREBASE_URL, $firebaseObject, $stateParams, $state, confirmScoreService) {

                 console.log("SetScoreController Fired" + $rootScope.currentUser.$id);


                    // CONNECT TO FIREBASE
                    let ref = new Firebase(FIREBASE_URL);
                    var auth = $firebaseAuth(ref);



                    auth.$onAuth(function (authUser) {
                        if (authUser) {



                            let notificationRef = new Firebase(FIREBASE_URL + 'bears/poolbear/notification/' + $rootScope.currentUser.$id);
                            let notificationInfoPost = $firebaseArray(notificationRef);


                            //GETS PLAYER OBJECT START
                            let setScorePlayerUserId = $stateParams.id;
                            //create reference to get players detail
                            let PlayerRecieveRef = new Firebase(FIREBASE_URL + 'bears/poolbear/users/' +
                                setScorePlayerUserId);
                            let playerRecieveInfo = $firebaseObject(PlayerRecieveRef);
                            $scope.playerRecieveScore = playerRecieveInfo;
                            // $scope.currentBearObject= playerRecieveInfo;

                            var notificationRefRecieve = new Firebase(FIREBASE_URL + 'bears/poolbear/notification/' +
                                //player clicked here
                                setScorePlayerUserId);
                            //       $firebaseArray creates an empty array and placed using the reference create above
                            var notificationInfoRecieve = $firebaseArray(notificationRefRecieve);


                            // The addNotification function pushes
                            // Alerts to both the
                            $scope.addNotification = function (type) {

                                // $scope.playerPostFirstNameRef = $rootScope.currentUser.firstname;
                                // $scope.playerPostLastNameRef = $rootScope.currentUser.lastname;


                                $scope.totalGame = $scope.notificationWinsPost + $scope.notificationWinsRecieve;


                                //        ADD nofitication to post
                                notificationInfoPost.$add({
                                    playerPostLost: $scope.totalGame - $scope.notificationWinsPost,
                                    playerRecieveLost: $scope.totalGame - $scope.notificationWinsRecieve,
                                    notificationWinsPost: $scope.notificationWinsPost,
                                    notificationWinsRecieve: $scope.notificationWinsRecieve,
                                    playerPostFirstName: $rootScope.currentUser.firstname,
                                    playerPostlastName: $rootScope.currentUser.lastname,
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

                        } // User Authenticated
                    }); // on Auth
                }])






