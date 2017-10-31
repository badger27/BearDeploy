var poolBear= angular.module('poolBear', [
     'firebase',
     'ui.router',
     'poolBear.login',
     'poolBear.result',
     'poolBear.settings',
     'poolBear.player',
     'poolBear.actionmodal',
     'poolBear.scoreMessage',
     'poolBear.Message',
     'poolBear.search',
     'poolBear.challenge', 
     'poolBear.group',  
     'poolBear.geo', 
     'poolBear.api',
     'poolBear.rating',
     'poolbear.confirmServices',
      'services.menu'

 ]).run(
        
   //Stephens Code: This function needs to run from the start so that the  page titles can be loaded into the states     
  [          '$rootScope', '$state', '$stateParams',
    function ($rootScope,   $state,   $stateParams) {


    // It's very handy to add references to $state and $stateParams to the $rootScope
    // so that you can access them from any scope within your applications.For example,
    // <li ng-class="{ active: $state.includes('contacts.list') }"> will set the <li>
    // to active whenever 'contacts.list' or one of its decendents is active.
    $rootScope.$state = $state;
    $rootScope.$stateParams = $stateParams;

        $rootScope.$state = $state;

            $rootScope.locationURL = $rootScope.$state.current.url;


        $rootScope.$on('$routeChangeError',
            function(event, next, previous, error) {
                if (error=='AUTH_REQUIRED') {
                    $rootScope.message = 'Sorry, you must log in to access that page';
                    $location.path('/login');
                } // AUTH REQUIRED
            }); //event info


        $rootScope
            .$on('$stateChangeSuccess',
                function (event, toState, toParams, fromState, fromParams) {
                    var locationURL = $rootScope.$state.current.url;
                    $rootScope.showHamburger= false;
                    if(locationURL === "/"){
                        $rootScope.showHamburger =true;
                    }
                });

    }
  ]
) //run
     
 .constant('FIREBASE_URL',
 'https://thebear.firebaseio.com/'
 )


 
.config(['$stateProvider', '$urlRouterProvider', '$locationProvider',
    function($stateProvider, $urlRouterProvider,$locationProvider  ) {


        $urlRouterProvider.otherwise('/');





        $stateProvider.state('app', {
    abstract: true,
    templateUrl: 'components/layout.html'

        }).state('app.comingsoon', {


          url: '/comingsoon',
          data: { title: 'comingsoon' },
          views: {
              'main': {

                  templateUrl: 'components/comingsoon/comingsoon.html'
              }
          }


      })



}])
.controller('BearCtrl', 
  [       '$scope', '$rootScope', 'FIREBASE_URL','$filter','$location', '$state', '$stateProvide',
  function($scope,   $rootScope,     FIREBASE_URL, $filter, $location, $state )  {
     console.log("BearCtrl FIRED");



      $scope.uiRouterState = $state;

      console.log("BearCtrl" );
      var PlayerRef = new Firebase(FIREBASE_URL + 'bears/');

        var BearsInfo = $firebaseArray(PlayerRef);

        $scope.bears = BearsInfo;
        $scope.outputs = {};



    	$scope.allSelected = false;
        $scope.selectText = "Select All";

    	$scope.toggleSeleted = function() {
            $scope.allSelected = !$scope.allSelected;
    		angular.forEach($scope.bears, function(friend){
             	friend.checked = $scope.allSelected;
    		});

            /*Change the text*/
            if($scope.allSelected){
                $scope.selectText = "Deselect All";
            } else {
                $scope.selectText = "Select All";
            }
        };

      $scope.selectedFriends = function () {
        return $filter('filter')($scope.bears, {checked: true});
      };

          $scope.selectedFriends = function () {
        return $filter('filter')($scope.bears, {checked: true});
      };

            $scope.filterTest = function () {
             console.log("filterTest" );
      };


    $scope.setOutput = function( $index, value) {
    $scope.outputs = $scope.outputs || [];
    $scope.outputs[$index] = value;


  };


   
//   console.log("outputs",outputs);
   
}]).factory('Authentication', 
  ['$rootScope', '$firebaseAuth', '$firebaseObject',
  '$location', 'FIREBASE_URL',
  function($rootScope, $firebaseAuth, $firebaseObject,
    $location, FIREBASE_URL) {

  var ref = new Firebase(FIREBASE_URL);
  var auth = $firebaseAuth(ref);

  auth.$onAuth(function(authUser) {
    if (authUser) {
      var userRef = new Firebase(FIREBASE_URL + 'users/' + authUser.uid );
      var userObj = $firebaseObject(userRef);
      $rootScope.currentUser = userObj;

      console.log("MAIN USER-OBJECT DETAILS", $rootScope.currentUser);
    } else {
      $rootScope.currentUser = '';
    }
  });


  return {
    login: function(user) {
      auth.$authWithPassword({
        email: user.email,
        password: user.password
      }).then(function(regUser) {
        $location.path('/');
      }).catch(function(error) {
       $rootScope.message = error.message;
      });
    }, //login

    logout: function() {
      return auth.$unauth();
    }, //logout

    requireAuth: function() {
      return auth.$requireAuth();
    }, //require Authentication


      //REGISTRATION PAGE

    register: function(user) {
      auth.$createUser({
        email: user.email,
        password: user.password
      }).then(function(regUser) {

          console.log("REGISTER FIRED" );
       
        var regRef = new Firebase(FIREBASE_URL + 'users')
        .child(regUser.uid).set({
          date: Firebase.ServerValue.TIMESTAMP,
          regUser: regUser.uid,
          firstname: user.firstname,
          lastname: user.lastname,
          email:  user.email,
          // tagline:user.tagline,
                userimage:"https://thebearstorage.blob.core.windows.net/userimages/rob.jpg"

        }); //user info
      
        $rootScope.message = "Hi " + user.firstname +
        ", Thanks for registering";
      }).catch(function(error) {
        $rootScope.message = error.message;
      }); // //createUser
    } // register
  };

}]).controller('homeCtrl',
    ['$scope', '$rootScope', '$firebaseAuth', '$firebaseArray', 'FIREBASE_URL','$filter', '$state',
        function($scope, $rootScope, $firebaseAuth, $firebaseArray, FIREBASE_URL, $filter,$location,  $state ,menuService) {

           console.log("HOME-CTRL FIRED" );
            $scope.locationURL = $rootScope.$state.current.url;




            // console.log("menuService",menuService);


            // $scope.showMenu = menuService.state();
            //
            // var menuElement = document.querySelector('#menu');
            //
            // $scope.toggleMenu = function() {
            //     menuService.toggle();
            // };
            //
            // // The menu toggle
            // $scope.$watch(function () { return menuService.state(); },
            //     function (value) {
            //         $scope.showMenu = menuService.state();
            //
            //         if (menuService.state()) {
            //             menuElement.focus();
            //         } else {
            //             menuElement.blur();
            //         }
            //     }
            // );

}]);

    
