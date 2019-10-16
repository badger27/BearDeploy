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
    .controller( 'PlayerController',
                   ['$scope', '$rootScope', '$firebaseAuth', '$firebaseArray', '$firebaseObject',
                     'FIREBASE_URL', 'firebaseDataService','playerFilter', 'sortFilter',
            function ($scope, $rootScope, $firebaseAuth, $firebaseArray, $firebaseObject,
                      FIREBASE_URL, firebaseDataService, playerFilter, sortFilter) {

                console.log("PLAYERCONTROLLER FIRED");
                var auth = firebase.auth();
                var database = firebase.database();

                auth.onAuthStateChanged(function (authUser) {
                    if (authUser) {
                        let playedArray;
                        let playersIntersection;

                        $scope.currentFilter = "Filter";
                        $scope.currentSortLabel = "Sorted";

                        let theme = $rootScope.theme;
                        if ($rootScope.theme === undefined || null) {
                            // theme=  window.localStorage.getItem("theme");
                            theme = "poolbear";
                            theme = theme.toLowerCase();
                        } else {
                            theme = theme.toLowerCase();
                        }


                        $scope.query = {term: ''}; //search Scope
                        $scope.UserId = firebase.auth().currentUser.uid;


                        var playerResult = [];
                        var newRecord;


                        var userId = firebase.auth().currentUser.uid;
                        var currentUserRef = database.ref('bears/' + theme + '/users/' + userId);


                        // var currentUserRef = new Firebase(FIREBASE_URL + 'bears/' + theme + '/users/' + $rootScope.currentUser.$id);


                        $scope.currentBearObject = currentUserRef.once('value', function(snapshot) {
                                var bears = (snapshot.val() && snapshot.val()) || 'Anonymous';
                            return bears.bearList
                            });



                        //GET PLAYERS START

                        function getPlayers() {
                            firebaseDataService.getPlayers(function (playersArray) {
                                console.log("playersArray", typeof playersArray);
                                playersIntersection = playersArray;
                                $scope.players = playersArray;
                            })
                        }


                        //GET CURRENT USER RESULTS START
                        firebaseDataService.getCurrentUserResults(function (currentUserResultUserArray) {
                            $scope.results = currentUserResultUserArray;
                            playedArray = currentUserResultUserArray;

                        });
                        //GET CURRENT USER END

                        $scope.filterSet = 0;
                        $scope.filterByDropdownCategory = (filterID, filterName, playerData, resultsdata) => {
                            $scope.results;
                            console.log('***$scope.results***;', playerData, resultsdata);
                            let poolBearFilter;
                            console.log("filterID", filterID);
                            if (filterID === 1) {
                                getPlayers();
                                $scope.currentFilter = filterName;

                            } else if (filterID === 2) {
                                console.log('here2');
                                $scope.filterSet = filterID;
                                console.log('test', playersIntersection.regUser, playedArray.refid);
                                _.each(resultsdata, (resultItem) => {
                                    $scope.players = _.filter(playerData, (item) => {
                                        console.log('item.regUser = resultItem.id', item.regUser, resultItem.id);
                                        return item.regUser === resultItem.refid;
                                    })
                                });
                                $scope.currentFilter = filterName;
                            }
                        };

                        $scope.sortByDropdownCategory = (id, sortName) => {
                            console.log('sortName', sortName);
                            switch (sortName) {
                                case 'elo':
                                    $scope.players.sort((a, b) => {
                                        return b.elo - a.elo
                                    });
                                    $scope.currentSortLabel = sortName;
                                    break;
                                case 'wins':
                                    $scope.players.sort((a, b) => {
                                        return b.wins - a.wins
                                    });
                                    $scope.currentSortLabel = sortName;
                                    break;
                                case 'lost':
                                    $scope.players.sort((a, b) => {
                                        return b.lost - a.lost
                                    });
                                    $scope.currentSortLabel = sortName;
                                    break;
                                default:
                                    $scope.players.sort((a, b) => {
                                        return b.elo - a.elo
                                    });
                                    break;
                            }
                        };


                        // CATEGORIES  FILTER START
                        $scope.playerFilterDropdown = playerFilter;
                        // CATEGORIES  FILTER END


                        // CATEGORIES  FILTER START
                        $scope.playerSortDropdown = sortFilter;
                        // CATEGORIES  FILTER END

                        getPlayers();

                    }else{
                        console.log("not logged in ");
                    }
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


        }]);


