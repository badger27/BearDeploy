var poolBear= angular.module('poolBear', [
    'firebase',
    'ui.router',
    'poolBear.login',
    'poolBear.auth',
    'poolBear.result',
    'poolBear.settings',
    'poolBear.player',
    'poolBear.actionmodal',
    'poolBear.scoreMessage',
    'poolBear.Message',
    'poolBear.uploadFile',
    'poolBear.Images',
    'poolBear.uploadFileService',
    'poolBear.search',
    'poolBear.challenge',
    'poolBear.group',
    'poolBear.geo',
    'poolBear.api',
    'poolbear.confirmServices',
    'services.menu'

 ]).run(
        
   //Stephens Code: This function needs to run from the start so that the  page titles can be loaded into the states     
  [          '$rootScope', '$state', '$stateParams',
    function ($rootScope,   $state,   $stateParams ) {

        let name = (x,y) => x + y ;


    // It's very handy to add references to $state and $stateParams to the $rootScope
    // so that you can access them from any scope within your applications.For example,
    // <li ng-class="{ active: $state.includes('contacts.list') }"> will set the <li>
    // to active whenever 'contacts.list' or one of its decendents is active.
        $rootScope.$state = $state;
        $rootScope.$stateParams = $stateParams;
        $rootScope.$state = $state;
        $rootScope.locationURL = $rootScope.$state.current.url;

        //??
        $rootScope.$on('$routeChangeError',
            function(event, next, previous, error) {
                if (error=='AUTH_REQUIRED') {
                    $rootScope.message = 'Sorry, you must log in to access that page';
                    $location.path('/login');
                } // AUTH REQUIRED
            }); //event info


        //SHOW HIDE HAMBURGER ON THE MAIN PAGE
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
        function ($stateProvider, $urlRouterProvider, $locationProvider) {
            $urlRouterProvider.otherwise('/');
            $stateProvider.state('app', {
                abstract: true,
                templateUrl: 'components/layout.html'
            }).state('app.comingsoon', {
                url: '/comingsoon',
                data: {title: 'comingsoon'},
                views: {
                    'main': {
                        templateUrl: 'components/comingsoon/comingsoon.html'
                    }
                }
            })
        }]).controller('BearCtrl',
                    ['$scope', '$rootScope', 'FIREBASE_URL', '$filter', '$location', '$state', '$stateProvide',
            function ($scope,  $rootScope,    FIREBASE_URL,   $filter,   $location,   $state ,  $stateProvide) {

            console.log("**********BearCtrl FIRED*************");

                $scope.uiRouterState = $state;



                var ref = new Firebase(FIREBASE_URL);
                var auth = $firebaseAuth(ref);
                auth.$onAuth(function (authUser) {
                    if (authUser) {
                        var userRef = new Firebase(FIREBASE_URL + 'users/' + authUser.uid);
                        var userObj = $firebaseObject(userRef);
                        $rootScope.currentUser = userObj;

                    } else {
                        $rootScope.currentUser = '';
                    }
                });
}]);

    
