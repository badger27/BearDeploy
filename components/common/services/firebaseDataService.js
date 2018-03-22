// FIREBASE DATA SERVICE START
(function () {
    'use strict';
    angular.module('poolBear.player')
        .factory('firebaseDataService', ['$rootScope', '$firebaseAuth', '$firebaseArray', '$firebaseObject', 'FIREBASE_URL',
            function ($rootScope, $firebaseAuth, $firebaseArray, $firebaseObject, FIREBASE_URL) {


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
                var getCurrentUserResults = function (callback) {
                    var ref = new Firebase(FIREBASE_URL);
                    var auth = $firebaseAuth(ref);
                    auth.$onAuth(function (authUser) {if (authUser) {

                            var individualRecordUserRef = new Firebase(FIREBASE_URL + 'bears/' + theme + '/result/' + $rootScope.currentUser.$id);
                            var individualRecordUserArray = $firebaseArray(individualRecordUserRef);

                            callback(individualRecordUserArray);

                        } // User Authenticated
                    }); // on Auth
                };
                //GET-CURRENT-USER-RESULTS START





                //GET-PLAYERS
                var getPlayers = function (callback) {
                    const ref = new Firebase(FIREBASE_URL);
                    const auth = $firebaseAuth(ref);
                    auth.$onAuth(function (authUser) {if (authUser) {

                       console.log("$rootScope.theme" , $rootScope.theme);

                        var PlayerUserRefAll = new Firebase(FIREBASE_URL + 'bears/'+ theme +'/users');
                        console.log("PlayerUserRefAll " ,PlayerUserRefAll );
                        var poolBearResultsAllFilter = $firebaseArray(PlayerUserRefAll);

                        console.log("poolBearResultsAllFilter" , poolBearResultsAllFilter);

                        callback(poolBearResultsAllFilter);

                    } // User Authenticated
                    }); // on Auth
                };
                //GET-CURRENT-USER-RESULTS START




                return {

                    getCurrentUserResults: getCurrentUserResults,
                    getPlayers:getPlayers


                };

            }
        ]);
}());

