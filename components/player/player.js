'use strict';
angular.module('poolBear.player', [

    'poolbear.confirmServices'


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
            }).state('app.playersetscore', {
            url: '/player/setscore/:id',
            data: {title: 'Set Score'},
            views: {
                'main': {

                    controller: 'SetScoreController',
                    templateUrl: 'components/player/views/_setscore.html',

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

    // .controller('PlayerCtrl', ['$scope', 'bearApi', '$location', '$window', 'confirmScoreService',
    //
    //     function ($scope, bearApi, $location, $window, confirmScoreService) {
    //
    //         $scope.showPageHero = $location.path() === '/player';
    //
    //         //filter by category
    //         $scope.filterByDropdownFilter = function (filterId, filterName) {
    //
    //             $scope.filterSelection = "1";
    //
    //             // set category in URL
    //             $location.search('catID', filterId);
    //             $location.search('cat', filterName);
    //
    //             $scope.dropdownCurrentLabel = categoryName;
    //             var filteredMovies;
    //
    //             if (categoryName == 'A-Z') {
    //                 //only sort A-Z
    //                 filteredMovies = $filter('orderBy')(allMovies, 'contentMeta.title');
    //             } else {
    //                 //filter
    //                 filteredMovies = _.filter(allMovies, function (item) {
    //                     return item.categoryID == categoryID;
    //                 })
    //             }
    //             $scope.movies = filteredMovies;
    //
    //         }
    //     }])


    .controller('PlayerController',
        ['$scope', '$rootScope', '$firebaseAuth', '$firebaseArray', '$firebaseObject', 'FIREBASE_URL', 'firebaseDataService',
            function ($scope, $rootScope, $firebaseAuth, $firebaseArray, $firebaseObject, FIREBASE_URL, firebaseDataService) {

                let theme = $rootScope.theme;
                console.log("theme player" , theme);
                if( $rootScope.theme === undefined || null){
                    // theme=  window.localStorage.getItem("theme");
                    theme="poolbear";
                    theme= theme.toLowerCase();
                }else{
                    console.log("DATASERVICEs THEME" );
                    theme= theme.toLowerCase();
                }

                var ref = new Firebase(FIREBASE_URL);
                var auth = $firebaseAuth(ref);

                auth.$onAuth(function (authUser) {
                    if (authUser) {


                        $scope.UserId = $rootScope.currentUser.$id;


                        var playerResult = [];
                        var newRecord;

                        var currentUserRef = new Firebase(FIREBASE_URL + 'bears/' + theme + '/users/' + $rootScope.currentUser.$id);
                        $scope.currentBearObject = $firebaseObject(currentUserRef);



                        //GET CURRENT USER RESULTS START
                        firebaseDataService.getCurrentUserResults(function (currentUserResultUserArray) {
                            $scope.results = currentUserResultUserArray;
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


