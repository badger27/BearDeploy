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





                        //GET PLAYERS START
                        firebaseDataService.getPlayers(function (playersArray) {
                            console.log("playersArray" , playersArray);
                            $scope.players = playersArray;
                        })

                //GET CURRENT USER RESULTS START
                firebaseDataService.getCurrentUserResults(function (currentUserResultUserArray) {
                    console.log("currentUserResultUserArray " , currentUserResultUserArray);
                    $scope.results = currentUserResultUserArray;

                    console.log("results" , $scope.results);




                        let  poolBearFilter;
                        $scope.filterSet = 0;
                        $scope.filterByDropdownCategory= function (filterID) {
                            console.log("filterID" , filterID);
                            if (filterID === 1) {
                                $scope.filterSet = filterID;



                            } else if (filterID === 2) {
                                $scope.filterSet = filterID;

                                poolBearFilter = _.filter(currentUserResultUserArray,function (item) {
                                    console.log("item.wins > 0" , item.playerWins);
                                    return item.playerWins > 0;
                                });
                                console.log("******** poolBearFilter *****"  , poolBearFilter);

                                console.log("currentUserResultUserArray" , currentUserResultUserArray[0].refid);

                                //GET PLAYERS START
                                firebaseDataService.getPlayers(function (playersArray) {

                                    console.log("playersArray" , playersArray);

                                    playersArray = _.filter( playersArray, function(num){
                                        console.log("******num*****" , num);

                                        return num ==  currentUserResultUserArray[0].refid; }
                                        );


                                    console.log("playersArray" , playersArray);
                                    $scope.players = playersArray;
                                })


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


                });//GET CURRENT USER END



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


