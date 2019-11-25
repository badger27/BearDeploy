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



                            let loggedInPlayer;
                            let selectedPlayer;
                            let userId = firebase.auth().currentUser.uid;
                            let setScorePlayerUserId = $stateParams.id;

                            /** GET OPPONENTS DATA **/
                            let playerRef = database.ref('bears/poolbear/users/' + setScorePlayerUserId);
                            playerRef.once('value', function (snapshot) {
                                let opponentData = snapshot.val();
                                $scope.opponentUserData = opponentData;
                            });



                            //GET NOTIFICATION START
                            function getOpponentDetails() {
                                return new Promise((resolve, reject) => {
                                    firebaseDataService.getPlayerDetails(setScorePlayerUserId, function (opponentData) {
                                        if(opponentData){
                                            resolve(opponentData)

                                        }else {
                                            reject(Error("Error retrieving opponentData"))
                                        }
                                    });
                                })
                            }




                           function getUserDetails (playerRecieveInfo) {
                               return new Promise((resolve, reject) => {
                                   let users={playerRecieveInfo:playerRecieveInfo};
                                firebaseDataService.getPlayerDetails(userId, function (userData) {
                                    users.currentUserData = userData;
                                    if(userData){
                                        resolve(users)

                                    }else {
                                        reject(Error("Error retrieving userDetails"))
                                    }
                                });
                               })
                            }


                            function setloggedInPlayerNote(userdata) {
                                return new Promise((resolve, reject) => {

                                    let loggedInPlayer;

                                    let noteUserRef = database.ref('bears/poolbear/notification/' + userId).push();
                                    var key = noteUserRef.key;



                                        loggedInPlayer = {
                                            resultID: key,
                                            playerPostLost: $scope.totalGame - $scope.notificationWinsPost,
                                            playerRecieveLost: $scope.totalGame - $scope.notificationWinsRecieve,
                                            notificationWinsPost: $scope.notificationWinsPost,
                                            notificationWinsRecieve: $scope.notificationWinsRecieve,
                                            playerPostFirstName: $rootScope.currentUser.firstname,
                                            playerPostlastName: $rootScope.currentUser.lastname,
                                            playerRecieveFirstName: (userdata.playerRecieveInfo && userdata.playerRecieveInfo.firstname) ? userdata.playerRecieveInfo.firstname : "noName",
                                            playerRecieveLastName: (userdata.playerRecieveInfo && userdata.playerRecieveInfo.lastname) ? userdata.playerRecieveInfo.lastname : "noName",
                                            postImage: $rootScope.currentUser.userimage,
                                            recieveImage: userdata.playerRecieveInfo.userimage,


                                            postTag: $rootScope.currentUser.tagline,
                                            recieveTag: userdata.playerRecieveInfo.tagline,

                                            playerRecieveUserId: setScorePlayerUserId,
                                            totalGame: $scope.totalGame,
                                            confirmed: true,
                                            collapse: false,
                                            sender: true,
                                            confirmShow: false,
                                            confirmHide: false,
                                            date: Firebase.ServerValue.TIMESTAMP
                                        }





                                    noteUserRef.set(loggedInPlayer).then(function () {
                                        console.log("Player saved");
                                        resolve(loggedInPlayer)

                                    }).catch(function (error) {
                                        console.log("Data could not be saved." + error);
                                    });
                                })
                            }


                            function setOpponentPlayerNote(userdata, loggedInPlayer) {
                                return new Promise((resolve, reject) => {

                                    let noteOpponentRef = database.ref('bears/poolbear/notification/' + setScorePlayerUserId).push();
                                    let key = noteOpponentRef.key;


                                        selectedPlayer = {
                                            resultID: key,
                                            resultIDOppenent:loggedInPlayer.resultID,
                                            playerPostLost: $scope.totalGame - $scope.notificationWinsPost,
                                            playerRecieveLost: $scope.totalGame - $scope.notificationWinsRecieve,
                                            notificationWinsPost: $scope.notificationWinsPost,
                                            notificationWinsRecieve: $scope.notificationWinsRecieve,
                                            playerRecieveFirstName: userdata.playerRecieveInfo.firstname,
                                            playerRecieveLastName: userdata.playerRecieveInfo.lastname,
                                            postImage: userdata.playerRecieveInfo.userimage,
                                            recieveImage: $rootScope.currentUser.userimage,

                                            postTag: userdata.playerRecieveInfo.tagline,
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

                                        };

                                        noteOpponentRef.set(selectedPlayer).then(function () {
                                            console.log("Player saved");
                                            resolve(selectedPlayer)
                                        }).catch(function (error) {
                                            console.log("Data could not be saved." + error);
                                        });





                                })
                            }



                            // The addNotification function pushes
                            // Alerts to both the
                            $scope.addNotification = function (type) {
                                console.log("addNotification setScoreCtrl fired");
                                $scope.totalGame = $scope.notificationWinsPost + $scope.notificationWinsRecieve;

                                getOpponentDetails().then(data =>{
                                    let playerRecieveInfo = data;
                                   return getUserDetails(playerRecieveInfo);
                                }).then(userdata => {
                                    console.log("userdata", userdata);
                                    setloggedInPlayerNote(userdata).then(loggedInPlayer => {
                                        return setOpponentPlayerNote(userdata, loggedInPlayer);

                                    }).then(selectedPlayer => {
                                        let noteUserRefTest =  database.ref('bears/poolbear/notification/' + selectedPlayer.playerPostUserId + '/' + selectedPlayer.resultIDOppenent);
                                        /** TODO: rename **/
                                        noteUserRefTest.once('value', function (snapshot) {
                                            if (snapshot.val() === null) {
                                                console.log("Snap Shot = null");
                                            } else {

                                                noteUserRefTest.update({
                                                    "resultIDOppenent": selectedPlayer.resultID

                                                });
                                                console.log("UPDATE CURRENT USER VALUE  SUCCESS");
                                            }
                                        });
                                    })
                                });

                            }// add note end
                        } // User Authenticated
                    })
                }])
}());

