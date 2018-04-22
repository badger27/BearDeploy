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




                        let  poolBearFilter;

                        $scope.filterSet = 0;
                        $scope.filterByDropdownFilter = function (filterID) {
                            if (filterID === 1) {
                                $scope.filterSet = filterID;



                            } else if (filterID === 2) {
                                $scope.filterSet = filterID;

                                poolBearFilter = _.filter(function (item) {
                                    return item.wins || item.lost > 0;
                                })

                                $scope.players = poolBearFilter;

                            }
                        };

                        // CATEGORIES  FILTER START
                        var playerFilterObject = [
                            {    "filterId": 1,
                                "filterName": "PLATFORM"
                            },
                            {   "filterId": 2,
                                "filterName": "PLAYED"
                            }
                        ];
                        //       Set the filters in the drop down
                        $scope.playerFilterDropdown = playerFilterObject;
                        // CATEGORIES  FILTER END


                        // CATEGORIES  FILTER START
                        var playerSortObject = [
                            {    "sortId": 1,
                                "filterName": "RANK"
                            },
                            {   "filterId": 2,
                                "filterName": "WINS"
                            },
                            {   "filterId": 2,
                                "filterName": "POSITION"
                            }
                        ];
                        //       Set the filters in the drop down
                        $scope.playerSortDropdown = playerSortObject;
                        // CATEGORIES  FILTER END






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


