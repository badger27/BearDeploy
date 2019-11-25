'use strict';
angular.module('poolBear.result', [

    'poolBear.login',
    'poolBear.player',

])
    .config(function ($stateProvider) {

        $stateProvider
            .state('app.result', {


                url: '/result',
                data: {title: 'Result'},
                views: {
                    'main': {
                        controller: 'ResultCtrl',
                        templateUrl: 'components/result/result.html',

                        //This code restricts access to logged in users only
                        resolve: {
                            currentAuth: function (Authentication) {
                                return Authentication.requireAuth();
                            } //current Auth
                        } //resolve
                    }
                }


            })

    }).controller('ResultCtrl',

    ['$scope', '$rootScope', '$firebaseAuth', '$firebaseArray', 'FIREBASE_URL', '$firebaseObject', '$stateParams', '$state', 'confirmScoreService', 'firebaseDataService' ,
        function ($scope, $rootScope, $firebaseAuth, $firebaseArray, FIREBASE_URL, $firebaseObject, $stateParams, $state, confirmScoreService, firebaseDataService) {
            console.log('RESULT-CTRL FIRED');


            // CONNECT TO FIREBASE
            // let ref = new Firebase(FIREBASE_URL);
            // var auth = $firebaseAuth(ref);

            var auth = firebase.auth();
            var database = firebase.database();


            auth.onAuthStateChanged(function (authUser) {
                if (authUser) {
                    $scope.messageShow;
                    let userId = firebase.auth().currentUser.uid;


                    //GET NOTIFICATIONS START
                    let notificationRef = database.ref('bears/poolbear/notification/' + userId);
                    notificationRef.on('value', function (snapshot) {
                        var notificationsList = _.toArray(snapshot.val())
                        $scope.notifications = notificationsList ;
                    });





                    // $scope.notifications = notificationInfoPost;


                    //GETS PLAYER OBJECT START
                    // let setScorePlayerUserId = $stateParams.id;
                    //
                    // let PlayerRecieveRef = new Firebase(FIREBASE_URL + 'bears/poolbear/users/' +
                    //     setScorePlayerUserId);
                    // let playerRecieveInfo = $firebaseObject(PlayerRecieveRef);
                    // $scope.playerRecieveScore = playerRecieveInfo;

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


                    // $scope.confirmHide = function (key, note) {
                    //     var confirmHideRef = new Firebase(FIREBASE_URL + 'bears/poolbear/notification/' + $rootScope.currentUser.$id + '/' + note.$id);
                    //     confirmHideRef.update({confirmHide: true});
                    //     showMessage();
                    // };
                    //confirm Hide



                    // $scope.deleteMeeting = function (key) {
                    //     var notificationInfoPost = database.ref('bears/poolbear/notification/' + userId + "/"  + key.resultID);
                    //     notificationInfoPost.remove()
                    //
                    // };
                    // deleteMeeting



                    $scope.confirmScoreTrigger = function (key, note) {
                        console.log("confirmScoreTrigger" );
                        confirmScoreService.confirmScore(key, note, userId);
                        $scope.$apply();
                    };


                } // User Authenticated
            }); // on Auth
        }])

// type: 'danger', msg: 'Oh snap! Change a few things up and try submitting again.' },
//     { type: 'success round', msg: 'Well done! You successfully read this important alert message.' }
//   ];
//
//   $scope.addAlert = function() {
//     $scope.alerts.push({msg: "Another alert!"});
//   };
//
//   $scope.closeAlert = function(index) {
//     $scope.alerts.splice(index, 1);
//   };
    
