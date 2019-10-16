// FIREBASE DATA SERVICE START
(function () {
    'use strict';
    angular.module('poolBear.player')
        .factory('firebaseDataService', ['$rootScope', '$firebaseAuth', '$firebaseArray', '$firebaseObject', 'FIREBASE_URL',
            function ($rootScope, $firebaseAuth, $firebaseArray, $firebaseObject, FIREBASE_URL) {

            var auth = firebase.auth();
                var database = firebase.database();

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


                //GET-PLAYERS
                var getPlayers = function (callback) {
                    auth.onAuthStateChanged(function (authUser) {
                        if (authUser) {
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
                        } // User Authenticated
                    }); // on Auth
                };
                //GET-PLAYERS END




                return {

                    getCurrentUserResults: getCurrentUserResults,
                    getPlayers:getPlayers


                };

            }
        ]);
}());

