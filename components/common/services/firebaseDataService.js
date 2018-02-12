
(function () {
    'use strict';

    angular.module('poolBear.player')

        .factory('firebaseDataService',[ '$rootScope', '$firebaseAuth', '$firebaseArray', '$firebaseObject', 'FIREBASE_URL',
                                  function ( $rootScope, $firebaseAuth, $firebaseArray, $firebaseObject, FIREBASE_URL) {




        //GET POOLBEAR DATA SERVICE
        var  getPoolBearResults = function (callback) {

            var ref = new Firebase(FIREBASE_URL);
            var auth = $firebaseAuth(ref);

            auth.$onAuth(function (authUser) {
                if (authUser) {

            var individualRecordUserRef = new Firebase(FIREBASE_URL + 'bears/poolbear/result/' + $rootScope.currentUser.$id);
            var individualRecordUserArray = $firebaseArray(individualRecordUserRef);

            callback(individualRecordUserArray);

                } // User Authenticated
            }); // on Auth

        };//GET SONY PURGE LIST







        return {

            getPoolBearResults: getPoolBearResults

        };

    }
    ]);
}());

