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

    ['$scope', '$rootScope', '$firebaseAuth', '$firebaseArray', 'FIREBASE_URL', '$firebaseObject', '$stateParams', '$state', 'confirmScoreService',
        function ($scope, $rootScope, $firebaseAuth, $firebaseArray, FIREBASE_URL, $firebaseObject, $stateParams, $state, confirmScoreService) {
          console.log('RESULT-CTRL FIRED');


            // CONNECT TO FIREBASE
            let ref = new Firebase(FIREBASE_URL);
            var auth = $firebaseAuth(ref);



            auth.$onAuth(function (authUser) {
                if (authUser) {

                    $scope.messageShow;


                    let notificationRef = new Firebase(FIREBASE_URL + 'bears/poolbear/notification/' + $rootScope.currentUser.$id);
                    let notificationInfoPost = $firebaseArray(notificationRef);

                    $scope.notifications = notificationInfoPost; //      Loads Current Posts



                    //GETS PLAYER OBJECT START
                    let setScorePlayerUserId = $stateParams.id;
                    //create reference to get players detail
                    let PlayerRecieveRef = new Firebase(FIREBASE_URL + 'bears/poolbear/users/' +
                        setScorePlayerUserId);
                    let playerRecieveInfo = $firebaseObject(PlayerRecieveRef);
                    // $scope.playerRecieveScore = playerRecieveInfo;

                    // ENSURES THAT POSTS ARE LOADED ON THE PAGE LOAD
                    notificationInfoPost.$loaded().then(function (data) {console.log("$loaded fired" );
                        console.log("$loaded fired" );
                        $rootScope.howManyNotification = notificationInfoPost.length;

                    }); //Make sure meeting data is loaded

                    notificationInfoPost.$watch(function (data) {
                        console.log("$watch fired" );
                        $rootScope.howManyNotification = notificationInfoPost.length;
                    });


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

                    //TO DO
                    $scope.deleteMeeting = function (key) {

                        notificationInfoPost.$remove(key);
                    }; // deleteMeeting

                    $scope.confirmedHide = true;


                    $scope.confirmScoreTrigger = function (key, note) {
                        confirmScoreService.confirmScore(key, note, $rootScope.currentUser.$id);
                    }; // confirm



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
    
