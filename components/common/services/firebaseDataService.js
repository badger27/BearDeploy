// FIREBASE DATA SERVICE START
(function () {
    'use strict';
    angular.module('poolBear.player')
        .factory('firebaseDataService', ['$rootScope', '$firebaseAuth', '$firebaseArray', '$firebaseObject', 'FIREBASE_URL',
            function ($rootScope, $firebaseAuth, $firebaseArray, $firebaseObject, FIREBASE_URL) {

            let auth = firebase.auth();
            let database = firebase.database();

            let theme = $rootScope.theme;
            if( $rootScope.theme === undefined || null){
                // theme=  window.localStorage.getItem("theme");
                theme="poolbear";
                theme= theme.toLowerCase();
            }else{
                console.log("DATASERVICEs THEME" );
                theme= theme.toLowerCase();
            }



                //GET-CURRENT-USER-RESULTS START
                let getCurrentUserResults = function (callback) {

                    auth.onAuthStateChanged(function (authUser) {
                        if (authUser) {
                            let resultsArr = [];
                            var userId = firebase.auth().currentUser.uid;
                            var individualRecordUserRef = database.ref( 'bears/' + theme + '/result/' + userId );

                            individualRecordUserRef.once('value', function (snapshot) {

                                snapshot.forEach(childSnapshot => {
                                    let item = childSnapshot.val();
                                    item.key = childSnapshot.key;
                                    resultsArr.push(item);
                                });

                                callback(resultsArr);
                            });

                        } // User Authenticated
                    }); // on Auth
                };
                //GET-CURRENT-USER-RESULTS START


                //GET-PLAYERS START
                var getPlayers = function (callback) {

                    // TODO: Remove array indexice
                            let returnArr = [];
                            var PlayerUserRefAll = database.ref('bears/' + theme + '/users');
                            PlayerUserRefAll.once('value', function (snapshot) {

                                snapshot.forEach(childSnapshot => {
                                    let item = childSnapshot.val();
                                    item.key = childSnapshot.key;
                                    returnArr.push(item);
                                });

                                callback(returnArr);
                            });


                };
                //GET-PLAYERS END


                //GET-NOTIFICATION
                var getNotifications = function (userId, callback) {
                            let returnArr = [];
                            let notificationRef = database.ref('bears/poolbear/notification/' + userId);

                            notificationRef.once('value', function (snapshot) {
                                _.toArray(snapshot.val())
                                var notificationsList = _.toArray(snapshot.val())
                                callback(notificationsList);
                            });


                };
                //GET-NOTIFICATION END


                //GET-player-START
                var getPlayerDetails = function (userId, callback) {
                        let playerRef = database.ref('bears/poolbear/users/' + userId);
                            playerRef.once('value', function (snapshot) {
                            let playerInfo = snapshot.val();
                            callback(playerInfo);
                        });
                };
                //GET-OPPOSITION END

                //GET-OPPOSITION START
                var comfirmHide = function (userId, callback) {
                    var postData = {confirmHide: true};

                    var newPostKey = firebase.database().ref().child('posts').push().key;

                    var updates = {};
                    updates['/posts/' + newPostKey] = postData;
                    updates['/user-posts/' + uid + '/' + newPostKey] = postData;

                    return firebase.database().ref().update(updates);
                };
                //GET-OPPOSITION END



                return {
                    getCurrentUserResults: getCurrentUserResults,
                    getPlayers:getPlayers,
                    getNotifications:getNotifications,
                    getPlayerDetails:getPlayerDetails
                };
            }
        ]);
}());

