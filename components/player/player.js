'use strict';
angular.module('poolBear.player', [
    'poolbear.confirmServices',
    'moment-picker'




])
    .config(function ($stateProvider) {

        $stateProvider
            .state('app.player', {
                url: '/player',
                data: {title: 'played'},
                views: {
                    'main': {
                        controller: 'PlayerController',
                        templateUrl: 'components/player/playerMain.html',

                        //This code restricts access to logged in users only
                        resolve: {
                            currentAuth: function (Authentication) {
                                return Authentication.requireAuth();
                            } //current Auth
                        } //resolve
                    }
                }
            }).state('app.playerdetails', {
            url: '/player/detail/:id',
            data: {title: 'Details'},
            views: {
                'main': {

                    controller: 'DetailsCtrl',
                    templateUrl: 'components/player/views/_playerdetails.html'
                }
            }
        })
        })

    .controller('PlayerController',
        ['$scope', '$rootScope', '$firebaseAuth', '$firebaseArray', '$firebaseObject', 'FIREBASE_URL', 'firebaseDataService',
            function ($scope, $rootScope, $firebaseAuth, $firebaseArray, $firebaseObject, FIREBASE_URL, firebaseDataService) {

            console.log("PLAYERCONTROLLER FIRED" );

                let theme = $rootScope.theme;
                if( $rootScope.theme === undefined || null){
                    // theme=  window.localStorage.getItem("theme");
                    theme="poolbear";
                    theme= theme.toLowerCase();
                }else{
                    theme= theme.toLowerCase();
                }


                var ref = new Firebase(FIREBASE_URL);
                var auth = $firebaseAuth(ref);

                auth.$onAuth(function (authUser) {
                    if (authUser) {

                        $scope.query = {term: ''}; //search Scope
                        $scope.UserId = $rootScope.currentUser.$id;


                        var playerResult = [];
                        var newRecord;

                        var currentUserRef = new Firebase(FIREBASE_URL + 'bears/' + theme + '/users/' + $rootScope.currentUser.$id);
                        $scope.currentBearObject = $firebaseObject(currentUserRef);



                        //GET CURRENT USER RESULTS START
                        firebaseDataService.getCurrentUserResults(function (currentUserResultUserArray) {
                            $scope.results = currentUserResultUserArray;

                            console.log("results" , $scope.results);
                        });//GET CURRENT USER END

                        //GET PLAYERS START
                        firebaseDataService.getPlayers(function (playersArray) {
                            $scope.players = playersArray;

                        })




                        $scope.filterSet = 0;
                        $scope.filterByDropdownFilter = function (filterID) {
                            if (filterID === 1) {
                                $scope.filterSet = filterID;
                                //This code pull in all the players on the platform
                                // PlayerUserRefAll = new Firebase(FIREBASE_URL + 'bears/poolbear/users');
                                // poolBearResultsAllFilter = $firebaseArray(PlayerUserRefAll);
                                $scope.players = poolBearResultsAllFilter;


                            } else if (filterID === 2) {
                                $scope.filterSet = filterID;
                                //      This code pull in details on the user played details
                                var PlayerPLayedRef = new Firebase(FIREBASE_URL + 'bears/poolbear/result/' + $rootScope.currentUser.$id);
                                var poolBearResultsPlayedFilter = $firebaseArray(PlayerPLayedRef);
                                $scope.players = poolBearResultsPlayedFilter;
                            }
                        };

                        //       Create the list of filter categories
                        var playerFilterObject = [
                            {
                                "filterId": 1,
                                "filterName": "RANK"
                            },
                            {
                                "filterId": 2,
                                "filterName": "PLAYED"
                            }
                        ];
                        //       Set the filters in the drop down
                        $scope.playerFilterDropdown = playerFilterObject;
                        console.log(" $scope.playerFilterDropdown " ,  $scope.playerFilterDropdown );


                    } // User Authenticated
                }); // on Auth

            }]).controller('DetailsCtrl',

                ['$scope', '$rootScope', '$firebaseAuth', '$firebaseObject', 'FIREBASE_URL', '$stateParams', '$state',
        function ($scope, $rootScope, $firebaseAuth, $firebaseObject, FIREBASE_URL, $stateParams, $state) {

            var selectedDetailPlayer = $stateParams.id;


//          PlayerRef is the location
//          where the new meetings are place
            var PlayerRef = new Firebase(FIREBASE_URL + 'bears/poolbear/users/' + selectedDetailPlayer);
//        var currentUser = PlayerRef.child(selectedDetailPlayer);
//

            //       $firebaseArray creates an empty array and placed using the reference create above
            var PlayerInfo = $firebaseObject(PlayerRef);
            $scope.player = PlayerInfo;


        }])


