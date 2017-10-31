'use strict';
angular.module('poolBear.settings', [
    
   
])
.config(function ($stateProvider) {

    $stateProvider
      .state('app.settings', {
           
          
          url: '/settings',
          data: { title: 'Settings' },
          views: {
              'main': {
                  controller: 'SettingsCtrl',
                  templateUrl: 'components/settings/settings.html'


              }
          }


      })
    
}).controller('SettingsCtrl',     ['$scope', '$rootScope', 'Authentication', '$state','$location', '$firebaseArray','FIREBASE_URL', '$firebaseObject', '$firebaseAuth',
    function($scope,$rootScope, Authentication, $state, $location,$firebaseArray , FIREBASE_URL, $firebaseObject, $firebaseAuth) {

        var ref = new Firebase(FIREBASE_URL);
        var auth = $firebaseAuth(ref);


        auth.$onAuth(function (authUser) {
            if (authUser) {

                var mainPlayerInfo;
                //Variable

                var PlayerRef = new Firebase(FIREBASE_URL + 'users/' +  $rootScope.currentUser.$id);
                PlayerRef.on('value', function(snap){
                    console.log("snap" , snap.val());

                    mainPlayerInfo = snap.val();
                    $scope.player= mainPlayerInfo;




                });




            } // User Authenticated
        }); // on Auth
    }]) // Controller#


// ['$scope', '$rootScope', 'Authentication', '$state','$location', '$firebaseArray','FIREBASE_URL', '$firebaseObject', '$firebaseAuth',
//     function($scope,$rootScope, Authentication, $state, $location,$firebaseArray , FIREBASE_URL, $firebaseObject, $firebaseAuth) {
//
//         var ref = new Firebase(FIREBASE_URL);
//         var auth = $firebaseAuth(ref);
//
//
//         auth.$onAuth(function (authUser) {
//             if (authUser) {