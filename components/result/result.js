'use strict';
angular.module('poolBear.result', [
    
'poolBear.login',
'poolBear.player',

])
.config(function ($stateProvider) {

    $stateProvider
      .state('app.result', {
           
        
          url: '/result',
          data: { title: 'Result' },
          views: {
              'main': {
                  controller: 'ResultCtrl',
                  templateUrl: 'components/result/result.html',

                                    //This code restricts access to logged in users only 
                     resolve: {
          currentAuth: function(Authentication) {
          return Authentication.requireAuth();
        } //current Auth
      } //resolve
              }
          }


      })
    
}).controller('ResultCtrl',

               ['$scope', '$rootScope', '$firebaseAuth', '$firebaseArray', 'FIREBASE_URL', '$firebaseObject', '$stateParams', '$state', 'confirmScoreService', 'firebaseDataService',
        function ($scope, $rootScope, $firebaseAuth, $firebaseArray, FIREBASE_URL, $firebaseObject, $stateParams, $state, confirmScoreService, firebaseDataService) {
          console.log('RESULT-CTRL FIRED');


            // CONNECT TO FIREBASE
            // let ref = new Firebase(FIREBASE_URL);
            // var auth = $firebaseAuth(ref);

            var auth = firebase.auth();
            var database = firebase.database();


            auth.onAuthStateChanged(function (authUser) {
                if (authUser) {
                    $scope.test = "test";
                    $scope.messageShow;



                    //GET PLAYERS START
                    function getNotification() {
                        firebaseDataService.getNotifications(function (playersArray) {
                            console.log("playersArray", playersArray);
                            console.log(typeof playersArray );
                           $scope.notifications  = playersArray;
                        })
                    }

                    getNotification();

                   //  let userId = firebase.auth().currentUser.uid;
                   //  let notificationRef = database.ref('bears/poolbear/notification/' + userId);
                   //
                   //
                   // notificationRef.once('value', function(snapshot) {
                   //
                   //      var notificationsList = (snapshot.val() && snapshot.val()) || 'Anonymous';
                   //      console.log("notificationsList", notificationsList);
                   //
                   //      let returnArr= [];
                   //
                   //      snapshot.forEach(childSnapshot => {
                   //          let item = childSnapshot.val();
                   //          item.key = childSnapshot.key;
                   //          returnArr.push(item);
                   //      });
                   //
                   //     $scope.notifications = "new 2";
                   // });




                    // let notificationRef = new Firebase(FIREBASE_URL + 'bears/poolbear/notification/' + userId);
                    // let notificationInfoPost = $firebaseArray(notificationRef);

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


                    // var showMessage = function () {
                    //     notificationInfoPost.$loaded().then(function (data) {
                    //         var noteTotal = notificationInfoPost.length;
                    //         var hiddenNotes = _.filter(data, function (item) {
                    //             return item.confirmHide == true;
                    //         });
                    //         var hiddenNotesTotal = hiddenNotes.length;
                    //
                    //         if (hiddenNotesTotal === noteTotal) {
                    //             $scope.messageShow = true;
                    //
                    //
                    //         } else {
                    //             $scope.messageShow = false;
                    //         }
                    //
                    //     }); //Make sure meeting data is loaded
                    // };

                    // showMessage();

                    //TO DO
                    // $scope.deleteMeeting = function (key) {
                    //
                    //     notificationInfoPost.$remove(key);
                    // }; // deleteMeeting
                    //
                    // $scope.confirmedHide = true;
                    //
                    //
                    // $scope.confirmScoreTrigger = function (key, note) {
                    //     confirmScoreService.confirmScore(key, note, $rootScope.currentUser.$id);
                    // };
                    // confirm



                } // User Authenticated
            }); // on Auth
        }])

//
// $scope.alerts = [
//     { type: 'danger', msg: 'Oh snap! Change a few things up and try submitting again.' },
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
    
