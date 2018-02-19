angular.module('inflightApp.templates', []).run(['$templateCache', function($templateCache) {$templateCache.put('components/player/poolBear/_partials/filterDropdown.tpl.html','{{filterSelection}} <button ng-model=filterSelection href=# data-dropdown=drop1 aria-controls=drop1 aria-expanded=false class="button dropdown">filter</button><ul id=drop1 data-dropdown-content class=f-dropdown aria-hidden=true><li><a ng-click="filterByDropdownCategory(0, \'A-Z\')">A-Z</a></li><li ng-repeat="filter in playerFilterDropdown"><a ng-click="filterByDropdownFilter(filter.filterId, filter.filterName)">{{filter.filterName}}</a></li></ul><script>\n  $(document).foundation();\n</script>');}]);
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
    function ($rootScope,   $state,   $stateParams) {


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
                // console.log("BearCtrl FIRED");


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

    

'use strict';
angular.module('poolBear.geo', [
    
   
])
.config(function ($stateProvider) {

    $stateProvider
      .state('app.geo', {
           
          
          url: '/geo',
          data: { title: 'Geo' },
          views: {
              'main': {
                  controller: 'SimpleArrayCtrl',
                  templateUrl: 'components/beargeo/beargeo.html'


              }
          }


      })
    
}).controller('SimpleArrayCtrl', ['$scope', function SimpleArrayCtrl($scope) {
    // fruits
    $scope.fruits = ['apple', 'orange', 'pear', 'naartjie'];
    
    // selected fruits
    $scope.selection = [];
    
    // toggle selection for a given fruit by name
    $scope.toggleSelection = function toggleSelection(fruitName) {
      var idx = $scope.selection.indexOf(fruitName);
      
      // is currently selected
      if (idx > -1) {
        $scope.selection.splice(idx, 1);
      }
      
      // is newly selected
      else {
        $scope.selection.push(fruitName);
      }
            console.log("selection:",$scope.selection);
            console.log("idx:",idx);
    };
  }]);
      
//        .controller('ObjectArrayCtrl', ['$scope', 'filterFilter', function ObjectArrayCtrl($scope, filterFilter) {
//    // fruits
//    $scope.fruits = [
//      { name: 'apple',    selected: true },
//      { name: 'orange',   selected: false },
//      { name: 'pear',     selected: true },
//      { name: 'naartjie', selected: false }
//    ];
//    
//    // selected fruits
//    $scope.selection = [];
//    
//    // helper method
//    $scope.selectedFruits = function selectedFruits() {
//      return filterFilter($scope.fruits, { selected: true });
//    };
//    
//    // watch fruits for changes
//    $scope.$watch('fruits|filter:{selected:true}', function (nv) {
//      $scope.selection = nv.map(function (fruit) {
//        return fruit.name;
//      });
//    }, true);
//  }]).filter('fruitSelection', ['filterFilter', function (filterFilter) {
//    return function fruitSelection(input, prop) {
//      return filterFilter(input, { selected: true }).map(function (fruit) {
//        return fruit[prop];
//      });
//    };
//  }]);

'use strict';
angular.module('poolBear.challenge', [
    
   
])
.config(function ($stateProvider) {

    $stateProvider
      .state('app.challenge', {
           
          
          url: '/challenge',
          data: { title: 'challenge' },
          views: {
              'main': {
                  controller: 'challengeCtrl',
                  templateUrl: 'components/challenge/challenge.html'


              }
          }


      })
    
}).controller('challengeCtrl', ['$scope', function challengeCtrl($scope) {
    
    
    
}]);


'use strict';
angular.module('poolBear.group', [
    
   
])
.config(function ($stateProvider) {

    $stateProvider
      .state('app.group', {
           
          
          url: '/group',
          data: { title: 'Group' },
          views: {
              'main': {
                  controller: 'GroupCtrl',
                  templateUrl: 'components/groups/group.html'


              }
          }


      })
    
}).controller('GroupCtrl', function GroupCtrl($scope) {
    
    console.log('RGroupCtrlesultCtrl');
    
  
    
});


'use strict';
angular.module('poolBear.login', [

    'ngFileUpload',
    'poolBear.auth'

])
    .config(function ($stateProvider, $urlRouterProvider) {

        $stateProvider
            .state('app.home', {
                url: '/',

                views: {
                    'main': {
                        controller: 'RegistrationController',
                        templateUrl: 'components/login/login.html'
                    }
                }
            })

            .state('app.registration', {
                url: '/register',
                views: {
                    'main': {
                        controller: 'RegistrationController',
                        templateUrl: 'components/login/views/register.html',
                    }
                }
            })

            .state('app.score', {
                url: '/score',
                views: {
                    'main': {
                        controller: 'MeetingsController',
                        templateUrl: 'components/login/views/score.html',
                    }
                }
            }).state('app.success', {
            url: '/success',
            views: {
                'main': {
                    controller: 'SuccessController',
                    templateUrl: 'components/login/views/success.html',

                    resolve: {
                        currentAuth: function (Authentication) {
                            return Authentication.requireAuth();
                        } //current Auth
                    } //resolve
                }
            }
        })

        $urlRouterProvider.otherwise('/login');

    })

    .controller('SuccessController', ['$scope', '$rootScope', '$firebaseAuth', '$firebaseObject', "$firebaseArray", 'FIREBASE_URL', 'fileUpload', 'Upload', '$timeout', '$window',

                             function ($scope, $rootScope, $firebaseAuth, $firebaseObject, $firebaseArray, FIREBASE_URL, fileUpload, Upload, $timeout, $window) {


            $scope.message = "Success!!!";
            var ref = new Firebase(FIREBASE_URL);
            var auth = $firebaseAuth(ref);


            auth.$onAuth(function (authUser) {

                if (authUser) {


                    // CHANGE THEME START

                    $scope.changeTheme = function (themeName) {
                        console.log("CHANGE-THEME FIRED" , themeName );

                        $rootScope.theme =themeName;

                    }

                    var PlayerRef = new Firebase(FIREBASE_URL + 'users/' + authUser.uid);
                    var bearRef = new Firebase(FIREBASE_URL + 'bears/');

                    //       $firebaseArray creates an empty array and placed using the reference create above
                    $firebaseObject(PlayerRef).$loaded(function (player) {
                        $scope.player = player;
                        $scope.userBears = [];
                        // $firebaseArray(bearRef).$loaded(function(bears) {
                        //     player.bears.forEach(function(bearid) {
                        //         $scope.userBears.push(bears.$getRecord(bearid.name));
                        //     });
                        // });

                    });
                } // User Authenticated
            }); // on Auth

        }//controller

    ]);
         


'use strict';
angular.module('poolBear.Images', [ 'ngFileUpload'

]) .config(function ($stateProvider, $urlRouterProvider) {

    $stateProvider
        .state('app.images', {
            url: '/images',

            views: {
                'main': {
                    templateUrl: 'components/login/images.html'}
            }
        })

    }).controller('imagesController', ['$scope','$rootScope', '$state' ,    '$location', '$firebaseAuth', '$firebaseObject', "$firebaseArray", 'FIREBASE_URL', 'fileUpload', 'Upload', '$timeout', '$window',
        function(  $scope,$rootScope,$state,     $location, $firebaseAuth, $firebaseObject, $firebaseArray, FIREBASE_URL ,fileUpload, Upload, $timeout , $window) {


            console.log("IMAGE CONTROLLER FIRED ");

            var vm = this;
            var ref = new Firebase(FIREBASE_URL);
            var auth = $firebaseAuth(ref);

            auth.$onAuth(function (authUser) {
                if (authUser) {

                    var PlayerRef = new Firebase(FIREBASE_URL + 'users/' + authUser.uid);
                    var bearRef = new Firebase(FIREBASE_URL + 'bears/');

                    var userID =  authUser.uid ;

                    PlayerRef.once('value', function(snapshot) {
                        var user = snapshot.val();
                        console.log("user" , user);
                        if( user.userimage ==="userImage" ) {$location.path('/success');}
                    });


                    vm.submitImage = function () { //function to call on form submit
                        if (vm.upload_form.file.$valid && vm.file) { //check if from is valid

                            vm.upload(vm.file); //call upload function
                        }
                    }


                    vm.upload = function (file) {
                        console.log("file1", file);
                        file = Upload.rename(file,  userID + ".jpg");
                        console.log("file2", file);
                        Upload.upload({
                            url: 'http://localhost:3000/upload/', //webAPI exposed to upload the file
                            data: {file: file} //pass file as data, should be user ng-model
                        }).then(function (resp) { //upload function returns a promise
                            if (resp.data.error_code === 0) { //validate success
                                $window.alert('Success ' + resp.config.data.file.name + 'uploaded. Response: ');


                                PlayerRef.once('value', function(snapshot) {
                                    var user = snapshot.val();
                                    console.log("user" , user);
                                    snapshot.ref().update({userimage: "https://bear.blob.core.windows.net/user/" + userID + ".jpg" });
                                    $location.path('/success');
                                });


                            } else {
                                $window.alert('an error occured');
                            }
                        }, function (resp) { //catch error
                            console.log('Error status: ' + resp.status);
                            $window.alert('Error status: ' + resp.status);
                        }, function (evt) {
                            console.log(evt);
                            var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
                            console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
                            vm.progress = 'progress: ' + progressPercentage + '% '; // capture upload progress


                        });
                    };

                } // User Authenticated
            }); // on Auth


        }//controller

]);
         


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
    
}).controller('ResultCtrl', function ResultCtrl($scope, $rootScope ) {
      console.log('RESULT-CTRL FIRED');



   $scope.alerts = [
    { type: 'danger', msg: 'Oh snap! Change a few things up and try submitting again.' },
    { type: 'success round', msg: 'Well done! You successfully read this important alert message.' }
  ];

  $scope.addAlert = function() {
    $scope.alerts.push({msg: "Another alert!"});
  };

  $scope.closeAlert = function(index) {
    $scope.alerts.splice(index, 1);
  }; 
    
});

'use strict';
angular.module('poolBear.search', [
   
 
    
   
])
.config(function ($stateProvider) {

    $stateProvider
      .state('app.search', {
           
          
          url: '/search',
          data: { title: 'Search' },
          views: {
              'main': {
                  controller: 'SearchCtrl',
                  templateUrl: 'components/search/search.html'


              }
          }


      })
    
}).controller('SearchCtrl', function SearchCtrl($scope) {
    
    
    
});


(function () {

    angular.module("poolBear.auth", []).factory('Authentication',

                  ['$rootScope', '$firebaseAuth', '$firebaseObject', '$location', 'FIREBASE_URL',
            function  ($rootScope, $firebaseAuth, $firebaseObject, $location, FIREBASE_URL) {

                // console.log("Authentication SERVICE FIRED(APP)");

                // Get AUTH REFERENCE
                var ref = new Firebase(FIREBASE_URL);
                var auth = $firebaseAuth(ref);


                // TO DO
                // REPLACE  ROOTSCOPE


                //CREATES A CURRENT  USER OBJECT  AND PLACE INTO ROOT SCOPE
                auth.$onAuth(function (authUser) {
                    if (authUser) {
                        var userRef = new Firebase(FIREBASE_URL + 'users/' + authUser.uid);
                        var userObj = $firebaseObject(userRef);
                        $rootScope.currentUser = userObj;

                    } else {
                        $rootScope.currentUser = '';
                    }
                });


                return {

                    //LOGIN START
                    login: function (user) {
                        console.log("LOGIN FIRED" );
                        auth.$authWithPassword({
                            email: user.email,
                            password: user.password
                        }).then(function (regUser) {


                        }).catch(function (error) {
                            $rootScope.message = error.message;
                        });
                    }, //LOGIN END



                    logout: function () {
                        return auth.$unauth();
                    }, //logout

                    requireAuth: function () {
                        return auth.$requireAuth();
                    }, //require Authentication


                    //REGISTRATION START
                    register: function (user) {
                        console.log("REGISTER FIRED");

                        //CREATE USER START
                        auth.$createUser({
                            email: user.email,
                            password: user.password
                        }).then(function (regUser) {
                            console.log("regUser", regUser);

                            var regRef = new Firebase(FIREBASE_URL + 'users')
                                .child(regUser.uid).set({
                                    date: Firebase.ServerValue.TIMESTAMP,
                                    regUser: regUser.uid,
                                    firstname: user.firstname,
                                    lastname: user.lastname,
                                    email: user.email,
                                    tagline: user.tagline,
                                    userimage: "noImages"
                                });

                            $scope.showRegForm = false;

                            $rootScope.message = "Hi " + user.firstname +
                                ", Thanks for registering";

                        }).catch(function (error) {
                            $rootScope.message = error.message;
                        }); // //createUser
                    } // REGISTER END


                }

            }])

}());

(function () {
'use strict';

   angular.module('services.bears', [])
     .factory('selector', ['$http', function() {


    
    //SET Layout 
    var  setLayout = function()  {
                        
          };
          
     //SET Layout 
    var setBearclass= function () {
                        
          };

    return  {
        setLayout:setLayout,
        setBearclass:setBearclass 
    };

     }])
     }());
      
       


/*
 * angular-mm-foundation
 * http://pineconellc.github.io/angular-foundation/

 * Version: 0.8.0 - 2015-10-13
 * License: MIT
 * (c) Pinecone, LLC
 */
angular.module("mm.foundation", ["mm.foundation.accordion","mm.foundation.alert","mm.foundation.bindHtml","mm.foundation.buttons","mm.foundation.position","mm.foundation.mediaQueries","mm.foundation.dropdownToggle","mm.foundation.interchange","mm.foundation.transition","mm.foundation.modal","mm.foundation.offcanvas","mm.foundation.pagination","mm.foundation.tooltip","mm.foundation.popover","mm.foundation.progressbar","mm.foundation.rating","mm.foundation.tabs","mm.foundation.topbar","mm.foundation.tour","mm.foundation.typeahead"]);
angular.module('mm.foundation.accordion', [])

.constant('accordionConfig', {
  closeOthers: true
})

.controller('AccordionController', ['$scope', '$attrs', 'accordionConfig', function ($scope, $attrs, accordionConfig) {

  // This array keeps track of the accordion groups
  this.groups = [];

  // Ensure that all the groups in this accordion are closed, unless close-others explicitly says not to
  this.closeOthers = function(openGroup) {
    var closeOthers = angular.isDefined($attrs.closeOthers) ? $scope.$eval($attrs.closeOthers) : accordionConfig.closeOthers;
    if ( closeOthers ) {
      angular.forEach(this.groups, function (group) {
        if ( group !== openGroup ) {
          group.isOpen = false;
        }
      });
    }
  };
  
  // This is called from the accordion-group directive to add itself to the accordion
  this.addGroup = function(groupScope) {
    var that = this;
    this.groups.push(groupScope);

    groupScope.$on('$destroy', function (event) {
      that.removeGroup(groupScope);
    });
  };

  // This is called from the accordion-group directive when to remove itself
  this.removeGroup = function(group) {
    var index = this.groups.indexOf(group);
    if ( index !== -1 ) {
      this.groups.splice(index, 1);
    }
  };

}])

// The accordion directive simply sets up the directive controller
// and adds an accordion CSS class to itself element.
.directive('accordion', function () {
  return {
    restrict:'EA',
    controller:'AccordionController',
    transclude: true,
    replace: false,
    templateUrl: 'template/accordion/accordion.html'
  };
})

// The accordion-group directive indicates a block of html that will expand and collapse in an accordion
.directive('accordionGroup', ['$parse', function($parse) {
  return {
    require:'^accordion',         // We need this directive to be inside an accordion
    restrict:'EA',
    transclude:true,              // It transcludes the contents of the directive into the template
    replace: true,                // The element containing the directive will be replaced with the template
    templateUrl:'template/accordion/accordion-group.html',
    scope:{ heading:'@' },        // Create an isolated scope and interpolate the heading attribute onto this scope
    controller: function() {
      this.setHeading = function(element) {
        this.heading = element;
      };
    },
    link: function(scope, element, attrs, accordionCtrl) {
      var getIsOpen, setIsOpen;

      accordionCtrl.addGroup(scope);

      scope.isOpen = false;
      
      if ( attrs.isOpen ) {
        getIsOpen = $parse(attrs.isOpen);
        setIsOpen = getIsOpen.assign;

        scope.$parent.$watch(getIsOpen, function(value) {
          scope.isOpen = !!value;
        });
      }

      scope.$watch('isOpen', function(value) {
        if ( value ) {
          accordionCtrl.closeOthers(scope);
        }
        if ( setIsOpen ) {
          setIsOpen(scope.$parent, value);
        }
      });
    }
  };
}])

// Use accordion-heading below an accordion-group to provide a heading containing HTML
// <accordion-group>
//   <accordion-heading>Heading containing HTML - <img src="..."></accordion-heading>
// </accordion-group>
.directive('accordionHeading', function() {
  return {
    restrict: 'EA',
    transclude: true,   // Grab the contents to be used as the heading
    template: '',       // In effect remove this element!
    replace: true,
    require: '^accordionGroup',
    compile: function(element, attr, transclude) {
      return function link(scope, element, attr, accordionGroupCtrl) {
        // Pass the heading to the accordion-group controller
        // so that it can be transcluded into the right place in the template
        // [The second parameter to transclude causes the elements to be cloned so that they work in ng-repeat]
        accordionGroupCtrl.setHeading(transclude(scope, function() {}));
      };
    }
  };
})

// Use in the accordion-group template to indicate where you want the heading to be transcluded
// You must provide the property on the accordion-group controller that will hold the transcluded element
// <div class="accordion-group">
//   <div class="accordion-heading" ><a ... accordion-transclude="heading">...</a></div>
//   ...
// </div>
.directive('accordionTransclude', function() {
  return {
    require: '^accordionGroup',
    link: function(scope, element, attr, controller) {
      scope.$watch(function() { return controller[attr.accordionTransclude]; }, function(heading) {
        if ( heading ) {
          element.html('');
          element.append(heading);
        }
      });
    }
  };
});

angular.module("mm.foundation.alert", [])

.controller('AlertController', ['$scope', '$attrs', function ($scope, $attrs) {
  $scope.closeable = 'close' in $attrs && typeof $attrs.close !== "undefined";
}])

.directive('alert', function () {
  return {
    restrict:'EA',
    controller:'AlertController',
    templateUrl:'template/alert/alert.html',
    transclude:true,
    replace:true,
    scope: {
      type: '=',
      close: '&'
    }
  };
});

angular.module('mm.foundation.bindHtml', [])

  .directive('bindHtmlUnsafe', function () {
    return function (scope, element, attr) {
      element.addClass('ng-binding').data('$binding', attr.bindHtmlUnsafe);
      scope.$watch(attr.bindHtmlUnsafe, function bindHtmlUnsafeWatchAction(value) {
        element.html(value || '');
      });
    };
  });

angular.module('mm.foundation.buttons', [])

.constant('buttonConfig', {
  activeClass: 'active',
  toggleEvent: 'click'
})

.controller('ButtonsController', ['buttonConfig', function(buttonConfig) {
  this.activeClass = buttonConfig.activeClass;
  this.toggleEvent = buttonConfig.toggleEvent;
}])

.directive('btnRadio', function () {
  return {
    require: ['btnRadio', 'ngModel'],
    controller: 'ButtonsController',
    link: function (scope, element, attrs, ctrls) {
      var buttonsCtrl = ctrls[0], ngModelCtrl = ctrls[1];

      //model -> UI
      ngModelCtrl.$render = function () {
        element.toggleClass(buttonsCtrl.activeClass, angular.equals(ngModelCtrl.$modelValue, scope.$eval(attrs.btnRadio)));
      };

      //ui->model
      element.bind(buttonsCtrl.toggleEvent, function () {
        if (!element.hasClass(buttonsCtrl.activeClass)) {
          scope.$apply(function () {
            ngModelCtrl.$setViewValue(scope.$eval(attrs.btnRadio));
            ngModelCtrl.$render();
          });
        }
      });
    }
  };
})

.directive('btnCheckbox', function () {
  return {
    require: ['btnCheckbox', 'ngModel'],
    controller: 'ButtonsController',
    link: function (scope, element, attrs, ctrls) {
      var buttonsCtrl = ctrls[0], ngModelCtrl = ctrls[1];

      function getTrueValue() {
        return getCheckboxValue(attrs.btnCheckboxTrue, true);
      }

      function getFalseValue() {
        return getCheckboxValue(attrs.btnCheckboxFalse, false);
      }
      
      function getCheckboxValue(attributeValue, defaultValue) {
        var val = scope.$eval(attributeValue);
        return angular.isDefined(val) ? val : defaultValue;
      }

      //model -> UI
      ngModelCtrl.$render = function () {
        element.toggleClass(buttonsCtrl.activeClass, angular.equals(ngModelCtrl.$modelValue, getTrueValue()));
      };

      //ui->model
      element.bind(buttonsCtrl.toggleEvent, function () {
        scope.$apply(function () {
          ngModelCtrl.$setViewValue(element.hasClass(buttonsCtrl.activeClass) ? getFalseValue() : getTrueValue());
          ngModelCtrl.$render();
        });
      });
    }
  };
});

angular.module('mm.foundation.position', [])

/**
 * A set of utility methods that can be use to retrieve position of DOM elements.
 * It is meant to be used where we need to absolute-position DOM elements in
 * relation to other, existing elements (this is the case for tooltips, popovers,
 * typeahead suggestions etc.).
 */
  .factory('$position', ['$document', '$window', function ($document, $window) {

    function getStyle(el, cssprop) {
      if (el.currentStyle) { //IE
        return el.currentStyle[cssprop];
      } else if ($window.getComputedStyle) {
        return $window.getComputedStyle(el)[cssprop];
      }
      // finally try and get inline style
      return el.style[cssprop];
    }

    /**
     * Checks if a given element is statically positioned
     * @param element - raw DOM element
     */
    function isStaticPositioned(element) {
      return (getStyle(element, "position") || 'static' ) === 'static';
    }

    /**
     * returns the closest, non-statically positioned parentOffset of a given element
     * @param element
     */
    var parentOffsetEl = function (element) {
      var docDomEl = $document[0];
      var offsetParent = element.offsetParent || docDomEl;
      while (offsetParent && offsetParent !== docDomEl && isStaticPositioned(offsetParent) ) {
        offsetParent = offsetParent.offsetParent;
      }
      return offsetParent || docDomEl;
    };

    return {
      /**
       * Provides read-only equivalent of jQuery's position function:
       * http://api.jquery.com/position/
       */
      position: function (element) {
        var elBCR = this.offset(element);
        var offsetParentBCR = { top: 0, left: 0 };
        var offsetParentEl = parentOffsetEl(element[0]);
        if (offsetParentEl != $document[0]) {
          offsetParentBCR = this.offset(angular.element(offsetParentEl));
          offsetParentBCR.top += offsetParentEl.clientTop - offsetParentEl.scrollTop;
          offsetParentBCR.left += offsetParentEl.clientLeft - offsetParentEl.scrollLeft;
        }

        var boundingClientRect = element[0].getBoundingClientRect();
        return {
          width: boundingClientRect.width || element.prop('offsetWidth'),
          height: boundingClientRect.height || element.prop('offsetHeight'),
          top: elBCR.top - offsetParentBCR.top,
          left: elBCR.left - offsetParentBCR.left
        };
      },

      /**
       * Provides read-only equivalent of jQuery's offset function:
       * http://api.jquery.com/offset/
       */
      offset: function (element) {
        var boundingClientRect = element[0].getBoundingClientRect();
        return {
          width: boundingClientRect.width || element.prop('offsetWidth'),
          height: boundingClientRect.height || element.prop('offsetHeight'),
          top: boundingClientRect.top + ($window.pageYOffset || $document[0].body.scrollTop || $document[0].documentElement.scrollTop),
          left: boundingClientRect.left + ($window.pageXOffset || $document[0].body.scrollLeft  || $document[0].documentElement.scrollLeft)
        };
      }
    };
  }]);

angular.module("mm.foundation.mediaQueries", [])
    .factory('matchMedia', ['$document', '$window', function($document, $window) {
        // MatchMedia for IE <= 9
        return $window.matchMedia || (function matchMedia(doc, undefined){
            var bool,
                docElem = doc.documentElement,
                refNode = docElem.firstElementChild || docElem.firstChild,
                // fakeBody required for <FF4 when executed in <head>
                fakeBody = doc.createElement("body"),
                div = doc.createElement("div");

            div.id = "mq-test-1";
            div.style.cssText = "position:absolute;top:-100em";
            fakeBody.style.background = "none";
            fakeBody.appendChild(div);

            return function (q) {
                div.innerHTML = "&shy;<style media=\"" + q + "\"> #mq-test-1 { width: 42px; }</style>";
                docElem.insertBefore(fakeBody, refNode);
                bool = div.offsetWidth === 42;
                docElem.removeChild(fakeBody);
                return {
                    matches: bool,
                    media: q
                };
            };

        }($document[0]));
    }])
    .factory('mediaQueries', ['$document', 'matchMedia', function($document, matchMedia) {
        var head = angular.element($document[0].querySelector('head'));
        head.append('<meta class="foundation-mq-topbar" />');
        head.append('<meta class="foundation-mq-small" />');
        head.append('<meta class="foundation-mq-medium" />');
        head.append('<meta class="foundation-mq-large" />');

        var regex = /^[\/\\'"]+|(;\s?})+|[\/\\'"]+$/g;
        var queries = {
            topbar: getComputedStyle(head[0].querySelector('meta.foundation-mq-topbar')).fontFamily.replace(regex, ''),
            small : getComputedStyle(head[0].querySelector('meta.foundation-mq-small')).fontFamily.replace(regex, ''),
            medium : getComputedStyle(head[0].querySelector('meta.foundation-mq-medium')).fontFamily.replace(regex, ''),
            large : getComputedStyle(head[0].querySelector('meta.foundation-mq-large')).fontFamily.replace(regex, '')
        };

        return {
            topbarBreakpoint: function () {
                return !matchMedia(queries.topbar).matches;
            },
            small: function () {
                return matchMedia(queries.small).matches;
            },
            medium: function () {
                return matchMedia(queries.medium).matches;
            },
            large: function () {
                return matchMedia(queries.large).matches;
            }
        };
    }]);

/*
 * dropdownToggle - Provides dropdown menu functionality
 * @restrict class or attribute
 * @example:

   <a dropdown-toggle="#dropdown-menu">My Dropdown Menu</a>
   <ul id="dropdown-menu" class="f-dropdown">
     <li ng-repeat="choice in dropChoices">
       <a ng-href="{{choice.href}}">{{choice.text}}</a>
     </li>
   </ul>
 */
angular.module('mm.foundation.dropdownToggle', [ 'mm.foundation.position', 'mm.foundation.mediaQueries' ])

.controller('DropdownToggleController', ['$scope', '$attrs', 'mediaQueries', function($scope, $attrs, mediaQueries) {
  this.small = function() {
    return mediaQueries.small() && !mediaQueries.medium();
  };
}])

.directive('dropdownToggle', ['$document', '$window', '$location', '$position', function ($document, $window, $location, $position) {
  var openElement = null,
      closeMenu   = angular.noop;
  return {
    restrict: 'CA',
    controller: 'DropdownToggleController',
    link: function(scope, element, attrs, controller) {
      var parent = element.parent(),
          dropdown = angular.element($document[0].querySelector(attrs.dropdownToggle));

      var parentHasDropdown = function() {
        return parent.hasClass('has-dropdown');
      };

      var onClick = function (event) {
        dropdown = angular.element($document[0].querySelector(attrs.dropdownToggle));
        var elementWasOpen = (element === openElement);

        event.preventDefault();
        event.stopPropagation();

        if (!!openElement) {
          closeMenu();
        }

        if (!elementWasOpen && !element.hasClass('disabled') && !element.prop('disabled')) {
          dropdown.css('display', 'block'); // We display the element so that offsetParent is populated
          dropdown.addClass('f-open-dropdown');
          
          var offset = $position.offset(element);
          var parentOffset = $position.offset(angular.element(dropdown[0].offsetParent));
          var dropdownWidth = dropdown.prop('offsetWidth');
          var css = {
            top: offset.top - parentOffset.top + offset.height + 'px'
          };

          if (controller.small()) {
            css.left = Math.max((parentOffset.width - dropdownWidth) / 2, 8) + 'px';
            css.position = 'absolute';
            css.width = '95%';
            css['max-width'] = 'none';
          }
          else {
            var left = Math.round(offset.left - parentOffset.left);
            var rightThreshold = $window.innerWidth - dropdownWidth - 8;
            if (left > rightThreshold) {
                left = rightThreshold;
                dropdown.removeClass('left').addClass('right');
            }
            css.left = left + 'px';
            css.position = null;
            css['max-width'] = null;
          }

          dropdown.css(css);
          element.addClass('expanded');

          if (parentHasDropdown()) {
            parent.addClass('hover');
          }

          openElement = element;

          closeMenu = function (event) {
            $document.off('click', closeMenu);
            dropdown.css('display', 'none');
            dropdown.removeClass('f-open-dropdown');
            element.removeClass('expanded');
            closeMenu = angular.noop;
            openElement = null;
            if (parent.hasClass('hover')) {
              parent.removeClass('hover');
            }
          };
          $document.on('click', closeMenu);
        }
      };

      if (dropdown) {
        dropdown.css('display', 'none');
      }

      scope.$watch('$location.path', function() { closeMenu(); });

      element.on('click', onClick);
      element.on('$destroy', function() {
        element.off('click', onClick);
      });
    }
  };
}]);

/**
 * @ngdoc service
 * @name mm.foundation.interchange
 * @description
 *
 * Package containing all services and directives
 * about the `interchange` module
 */
angular.module('mm.foundation.interchange', ['mm.foundation.mediaQueries'])

  /**
   * @ngdoc function
   * @name mm.foundation.interchange.interchageQuery
   * @function interchageQuery
   * @description
   *
   * this service inject meta tags objects in the head
   * to get the list of media queries from Foundation
   * stylesheets.
   *
   * @return {object} Queries list name => mediaQuery
   */
  .factory('interchangeQueries', ['$document', function ($document) {
    var element,
      mediaSize,
      formatList = {
      'default': 'only screen',
      landscape : 'only screen and (orientation: landscape)',
      portrait : 'only screen and (orientation: portrait)',
      retina : 'only screen and (-webkit-min-device-pixel-ratio: 2),' +
        'only screen and (min--moz-device-pixel-ratio: 2),' +
        'only screen and (-o-min-device-pixel-ratio: 2/1),' +
        'only screen and (min-device-pixel-ratio: 2),' +
        'only screen and (min-resolution: 192dpi),' +
        'only screen and (min-resolution: 2dppx)'
    },
    classPrefix = 'foundation-mq-',
    classList = ['small', 'medium', 'large', 'xlarge', 'xxlarge'],
    head = angular.element($document[0].querySelector('head'));

    for (var i = 0; i < classList.length; i++) {
      head.append('<meta class="' + classPrefix + classList[i] + '" />');
      element = getComputedStyle(head[0].querySelector('meta.' + classPrefix + classList[i]));
      mediaSize = element.fontFamily.replace(/^[\/\\'"]+|(;\s?})+|[\/\\'"]+$/g, '');
      formatList[classList[i]] = mediaSize;
    }
    return formatList;
  }])

  /**
   * @ngdoc function
   * @name mm.foundation.interchange.interchangeQueriesManager
   * @function interchangeQueriesManager
   * @description
   *
   * interface to add and remove named queries
   * in the interchangeQueries list
   */
  .factory('interchangeQueriesManager', ['interchangeQueries', function (interchangeQueries) {
    return {
      /**
       * @ngdoc method
       * @name interchangeQueriesManager#add
       * @methodOf mm.foundation.interchange.interchangeQueriesManager
       * @description
       *
       * Add a custom media query in the `interchangeQueries`
       * factory. This method does not allow to update an existing
       * media query.
       *
       * @param {string} name MediaQuery name
       * @param {string} media MediaQuery
       * @returns {boolean} True if the insert is a success
       */
      add: function (name, media) {
        if (!name || !media ||
          !angular.isString(name) || !angular.isString(media) ||
          !!interchangeQueries[name]) {
          return false;
        }
        interchangeQueries[name] = media;
        return true;
      }
    };
  }])

  /**
   * @ngdoc function
   * @name mm.foundation.interchange.interchangeTools
   * @function interchangeTools
   * @description
   *
   * Tools to help with the `interchange` module.
   */
  .factory('interchangeTools', ['$window', 'matchMedia', 'interchangeQueries', function ($window, matchMedia, namedQueries) {

    /**
     * @ngdoc method
     * @name interchangeTools#parseAttribute
     * @methodOf mm.foundation.interchange.interchangeTools
     * @description
     *
     * Attribute parser to transform an `interchange` attribute
     * value to an object with media query (name or query) as key,
     * and file to use as value.
     *
     * ```
     * {
     *   small: 'bridge-500.jpg',
     *   large: 'bridge-1200.jpg'
     * }
     * ```
     *
     * @param {string} value Interchange query string
     * @returns {object} Attribute parsed
     */
    var parseAttribute = function (value) {
      var raw = value.split(/\[(.*?)\]/),
        i = raw.length,
        breaker = /^(.+)\,\ \((.+)\)$/,
        breaked,
        output = {};

      while (i--) {
        if (raw[i].replace(/[\W\d]+/, '').length > 4) {
          breaked = breaker.exec(raw[i]);
          if (!!breaked && breaked.length === 3) {
            output[breaked[2]] = breaked[1];
          }
        }
      }
      return output;
    };

    /**
     * @ngdoc method
     * @name interchangeTools#findCurrentMediaFile
     * @methodOf mm.foundation.interchange.interchangeTools
     * @description
     *
     * Find the current item to display from a file list
     * (object returned by `parseAttribute`) and the
     * current page dimensions.
     *
     * ```
     * {
     *   small: 'bridge-500.jpg',
     *   large: 'bridge-1200.jpg'
     * }
     * ```
     *
     * @param {object} files Parsed version of `interchange` attribute
     * @returns {string} File to display (or `undefined`)
     */
    var findCurrentMediaFile = function (files) {
      var file, media, match;
      for (file in files) {
        media = namedQueries[file] || file;
        match = matchMedia(media);
        if (match.matches) {
          return files[file];
        }
      }
      return;
    };

    return {
      parseAttribute: parseAttribute,
      findCurrentMediaFile: findCurrentMediaFile
    };
  }])

  /**
   * @ngdoc directive
   * @name mm.foundation.interchange.directive:interchange
   * @restrict A
   * @element DIV|IMG
   * @priority 450
   * @scope true
   * @description
   *
   * Interchange directive, following the same features as
   * ZURB documentation. The directive is splitted in 3 parts.
   *
   * 1. This directive use `compile` and not `link` for a simple
   * reason: if the method is applied on a DIV element to
   * display a template, the compile method will inject an ng-include.
   * Because using a `templateUrl` or `template` to do it wouldn't
   * be appropriate for all cases (`IMG` or dynamic backgrounds).
   * And doing it in `link` is too late to be applied.
   *
   * 2. In the `compile:post`, the attribute is parsed to find
   * out the type of content to display.
   *
   * 3. At the start and on event `resize`, the method `replace`
   * is called to reevaluate which file is supposed to be displayed
   * and update the value if necessary. The methd will also
   * trigger a `replace` event.
   */
  .directive('interchange', ['$window', '$rootScope', 'interchangeTools', function ($window, $rootScope, interchangeTools) {

    var pictureFilePattern = /[A-Za-z0-9-_]+\.(jpg|jpeg|png|gif|bmp|tiff)\ *,/i;

    return {
      restrict: 'A',
      scope: true,
      priority: 450,
      compile: function compile($element, attrs) {
        // Set up the attribute to update
        if ($element[0].nodeName === 'DIV' && !pictureFilePattern.test(attrs.interchange)) {
          $element.html('<ng-include src="currentFile"></ng-include>');
        }

        return {
          pre: function preLink($scope, $element, attrs) {},
          post: function postLink($scope, $element, attrs) {
            var currentFile, nodeName;

            // Set up the attribute to update
            nodeName = $element && $element[0] && $element[0].nodeName;
            $scope.fileMap = interchangeTools.parseAttribute(attrs.interchange);

            // Find the type of interchange
            switch (nodeName) {
            case 'DIV':
              // If the tag is a div, we test the current file to see if it's picture
              currentFile = interchangeTools.findCurrentMediaFile($scope.fileMap);
              if (/[A-Za-z0-9-_]+\.(jpg|jpeg|png|gif|bmp|tiff)$/i.test(currentFile)) {
                $scope.type = 'background';
              }
              else {
                $scope.type = 'include';
              }
              break;

            case 'IMG':
              $scope.type = 'image';
              break;

            default:
              return;
            }

            var replace = function (e) {
              // The the new file to display (exit if the same)
              var currentFile = interchangeTools.findCurrentMediaFile($scope.fileMap);
              if (!!$scope.currentFile && $scope.currentFile === currentFile) {
                return;
              }

              // Set up the new file
              $scope.currentFile = currentFile;
              switch ($scope.type) {
              case 'image':
                $element.attr('src', $scope.currentFile);
                break;

              case 'background':
                $element.css('background-image', 'url(' + $scope.currentFile + ')');
                break;
              }

              // Trigger events
              $rootScope.$emit('replace', $element, $scope);
              if (!!e) {
                $scope.$apply();
              }
            };

            // Start
            replace();
            $window.addEventListener('resize', replace);
            $scope.$on('$destroy', function () {
              $window.removeEventListener('resize', replace);
            });
          }
        };
      }
    };
  }]);

angular.module('mm.foundation.transition', [])

/**
 * $transition service provides a consistent interface to trigger CSS 3 transitions and to be informed when they complete.
 * @param  {DOMElement} element  The DOMElement that will be animated.
 * @param  {string|object|function} trigger  The thing that will cause the transition to start:
 *   - As a string, it represents the css class to be added to the element.
 *   - As an object, it represents a hash of style attributes to be applied to the element.
 *   - As a function, it represents a function to be called that will cause the transition to occur.
 * @return {Promise}  A promise that is resolved when the transition finishes.
 */
.factory('$transition', ['$q', '$timeout', '$rootScope', function($q, $timeout, $rootScope) {

  var $transition = function(element, trigger, options) {
    options = options || {};
    var deferred = $q.defer();
    var endEventName = $transition[options.animation ? "animationEndEventName" : "transitionEndEventName"];

    var transitionEndHandler = function(event) {
      $rootScope.$apply(function() {
        element.unbind(endEventName, transitionEndHandler);
        deferred.resolve(element);
      });
    };

    if (endEventName) {
      element.bind(endEventName, transitionEndHandler);
    }

    // Wrap in a timeout to allow the browser time to update the DOM before the transition is to occur
    $timeout(function() {
      if ( angular.isString(trigger) ) {
        element.addClass(trigger);
      } else if ( angular.isFunction(trigger) ) {
        trigger(element);
      } else if ( angular.isObject(trigger) ) {
        element.css(trigger);
      }
      //If browser does not support transitions, instantly resolve
      if ( !endEventName ) {
        deferred.resolve(element);
      }
    });

    // Add our custom cancel function to the promise that is returned
    // We can call this if we are about to run a new transition, which we know will prevent this transition from ending,
    // i.e. it will therefore never raise a transitionEnd event for that transition
    deferred.promise.cancel = function() {
      if ( endEventName ) {
        element.unbind(endEventName, transitionEndHandler);
      }
      deferred.reject('Transition cancelled');
    };

    return deferred.promise;
  };

  // Work out the name of the transitionEnd event
  var transElement = document.createElement('trans');
  var transitionEndEventNames = {
    'WebkitTransition': 'webkitTransitionEnd',
    'MozTransition': 'transitionend',
    'OTransition': 'oTransitionEnd',
    'transition': 'transitionend'
  };
  var animationEndEventNames = {
    'WebkitTransition': 'webkitAnimationEnd',
    'MozTransition': 'animationend',
    'OTransition': 'oAnimationEnd',
    'transition': 'animationend'
  };
  function findEndEventName(endEventNames) {
    for (var name in endEventNames){
      if (transElement.style[name] !== undefined) {
        return endEventNames[name];
      }
    }
  }
  $transition.transitionEndEventName = findEndEventName(transitionEndEventNames);
  $transition.animationEndEventName = findEndEventName(animationEndEventNames);
  return $transition;
}]);

angular.module('mm.foundation.modal', ['mm.foundation.transition'])

/**
 * A helper, internal data structure that acts as a map but also allows getting / removing
 * elements in the LIFO order
 */
  .factory('$$stackedMap', function () {
    return {
      createNew: function () {
        var stack = [];

        return {
          add: function (key, value) {
            stack.push({
              key: key,
              value: value
            });
          },
          get: function (key) {
            for (var i = 0; i < stack.length; i++) {
              if (key == stack[i].key) {
                return stack[i];
              }
            }
          },
          keys: function() {
            var keys = [];
            for (var i = 0; i < stack.length; i++) {
              keys.push(stack[i].key);
            }
            return keys;
          },
          top: function () {
            return stack[stack.length - 1];
          },
          remove: function (key) {
            var idx = -1;
            for (var i = 0; i < stack.length; i++) {
              if (key == stack[i].key) {
                idx = i;
                break;
              }
            }
            return stack.splice(idx, 1)[0];
          },
          removeTop: function () {
            return stack.splice(stack.length - 1, 1)[0];
          },
          length: function () {
            return stack.length;
          }
        };
      }
    };
  })

/**
 * A helper directive for the $modal service. It creates a backdrop element.
 */
  .directive('modalBackdrop', ['$modalStack', '$timeout', function ($modalStack, $timeout) {
    return {
      restrict: 'EA',
      replace: true,
      templateUrl: 'template/modal/backdrop.html',
      link: function (scope) {

        scope.animate = false;

        //trigger CSS transitions
        $timeout(function () {
          scope.animate = true;
        });

        scope.close = function (evt) {
          var modal = $modalStack.getTop();
          if (modal && modal.value.backdrop && modal.value.backdrop != 'static' && (evt.target === evt.currentTarget)) {
            evt.preventDefault();
            evt.stopPropagation();
            $modalStack.dismiss(modal.key, 'backdrop click');
          }
        };
      }
    };
  }])

  .directive('modalWindow', ['$modalStack', '$timeout', function ($modalStack, $timeout) {
    return {
      restrict: 'EA',
      scope: {
        index: '@',
        animate: '='
      },
      replace: true,
      transclude: true,
      templateUrl: 'template/modal/window.html',
      link: function (scope, element, attrs) {
        scope.windowClass = attrs.windowClass || '';

        $timeout(function () {
          // trigger CSS transitions
          scope.animate = true;

          // If the modal contains any autofocus elements refocus onto the first one
          if (element[0].querySelectorAll('[autofocus]').length > 0) {
            element[0].querySelectorAll('[autofocus]')[0].focus();
          }
          else{
          // otherwise focus the freshly-opened modal
            element[0].focus();
          }
        });
      }
    };
  }])

  .factory('$modalStack', ['$window', '$transition', '$timeout', '$document', '$compile', '$rootScope', '$$stackedMap',
    function ($window, $transition, $timeout, $document, $compile, $rootScope, $$stackedMap) {

      var OPENED_MODAL_CLASS = 'modal-open';

      var backdropDomEl, backdropScope, cssTop;
      var openedWindows = $$stackedMap.createNew();
      var $modalStack = {};

      function backdropIndex() {
        var topBackdropIndex = -1;
        var opened = openedWindows.keys();
        for (var i = 0; i < opened.length; i++) {
          if (openedWindows.get(opened[i]).value.backdrop) {
            topBackdropIndex = i;
          }
        }
        return topBackdropIndex;
      }

      $rootScope.$watch(backdropIndex, function(newBackdropIndex){
        if (backdropScope) {
          backdropScope.index = newBackdropIndex;
        }
      });

      function removeModalWindow(modalInstance) {
        var parent = $document.find(modalInstance.options.parent).eq(0);
        var modalWindow = openedWindows.get(modalInstance).value;

        //clean up the stack
        openedWindows.remove(modalInstance);

        //remove window DOM element
        removeAfterAnimate(modalWindow.modalDomEl, modalWindow.modalScope, 300, function() {
          modalWindow.modalScope.$destroy();
          parent.toggleClass(OPENED_MODAL_CLASS, openedWindows.length() > 0);
          checkRemoveBackdrop();
        });
      }

      function checkRemoveBackdrop() {
          //remove backdrop if no longer needed
          if (backdropDomEl && backdropIndex() == -1) {
            var backdropScopeRef = backdropScope;
            removeAfterAnimate(backdropDomEl, backdropScope, 150, function () {
              backdropScopeRef.$destroy();
              backdropScopeRef = null;
            });
            backdropDomEl = undefined;
            backdropScope = undefined;
          }
      }

      function removeAfterAnimate(domEl, scope, emulateTime, done) {
        // Closing animation
        scope.animate = false;

        var transitionEndEventName = $transition.transitionEndEventName;
        if (transitionEndEventName) {
          // transition out
          var timeout = $timeout(afterAnimating, emulateTime);

          domEl.bind(transitionEndEventName, function () {
            $timeout.cancel(timeout);
            afterAnimating();
            scope.$apply();
          });
        } else {
          // Ensure this call is async
          $timeout(afterAnimating, 0);
        }

        function afterAnimating() {
          if (afterAnimating.done) {
            return;
          }
          afterAnimating.done = true;

          domEl.remove();
          if (done) {
            done();
          }
        }
      }

      function calculateModalTop(modalElement, offset) {
        if (angular.isUndefined(offset)) {
          offset = 0;
        }
        var scrollY = $window.pageYOffset || 0;
        return offset + scrollY;
      }

      $document.bind('keydown', function (evt) {
        var modal;

        if (evt.which === 27) {
          modal = openedWindows.top();
          if (modal && modal.value.keyboard) {
            $rootScope.$apply(function () {
              $modalStack.dismiss(modal.key);
            });
          }
        }
      });

      $modalStack.open = function (modalInstance, modal) {
        modalInstance.options = {
          deferred: modal.deferred,
          modalScope: modal.scope,
          backdrop: modal.backdrop,
          keyboard: modal.keyboard,
          parent: modal.parent
        };
        openedWindows.add(modalInstance, modalInstance.options);

        var parent = $document.find(modal.parent).eq(0),
            currBackdropIndex = backdropIndex();

        if (currBackdropIndex >= 0 && !backdropDomEl) {
          backdropScope = $rootScope.$new(true);
          backdropScope.index = currBackdropIndex;
          backdropDomEl = $compile('<div modal-backdrop></div>')(backdropScope);
          parent.append(backdropDomEl);
        }

        // Create a faux modal div just to measure its
        // distance to top
        var faux = angular.element('<div class="reveal-modal" style="z-index:-1""></div>');
        parent.append(faux[0]);
        cssTop = parseInt($window.getComputedStyle(faux[0]).top) || 0;
        var openAt = calculateModalTop(faux, cssTop);
        faux.remove();

        var angularDomEl = angular.element('<div modal-window style="visibility: visible; top:' + openAt +'px;"></div>')
          .attr({
            'window-class': modal.windowClass,
            'index': openedWindows.length() - 1,
            'animate': 'animate'
          });
        angularDomEl.html(modal.content);

        var modalDomEl = $compile(angularDomEl)(modal.scope);
        openedWindows.top().value.modalDomEl = modalDomEl;
        parent.append(modalDomEl);
        parent.addClass(OPENED_MODAL_CLASS);
      };

      $modalStack.reposition = function (modalInstance) {
        var modalWindow = openedWindows.get(modalInstance).value;
        if (modalWindow) {
          var modalDomEl = modalWindow.modalDomEl;
          var top = calculateModalTop(modalDomEl, cssTop);
          modalDomEl.css('top', top + "px");
        }
      };

      $modalStack.close = function (modalInstance, result) {
        var modalWindow = openedWindows.get(modalInstance);
        if (modalWindow) {
          modalWindow.value.deferred.resolve(result);
          removeModalWindow(modalInstance);
        }
      };

      $modalStack.dismiss = function (modalInstance, reason) {
        var modalWindow = openedWindows.get(modalInstance);
        if (modalWindow) {
          modalWindow.value.deferred.reject(reason);
          removeModalWindow(modalInstance);
        }
      };

      $modalStack.dismissAll = function (reason) {
        var topModal = this.getTop();
        while (topModal) {
          this.dismiss(topModal.key, reason);
          topModal = this.getTop();
        }
      };

      $modalStack.getTop = function () {
        return openedWindows.top();
      };

      return $modalStack;
    }])

  .provider('$modal', function () {

    var $modalProvider = {
      options: {
        backdrop: true, //can be also false or 'static'
        keyboard: true
      },
      $get: ['$injector', '$rootScope', '$q', '$http', '$templateCache', '$controller', '$modalStack',
        function ($injector, $rootScope, $q, $http, $templateCache, $controller, $modalStack) {

          var $modal = {};

          function getTemplatePromise(options) {
            return options.template ? $q.when(options.template) :
              $http.get(options.templateUrl, {cache: $templateCache}).then(function (result) {
                return result.data;
              });
          }

          function getResolvePromises(resolves) {
            var promisesArr = [];
            angular.forEach(resolves, function (value, key) {
              if (angular.isFunction(value) || angular.isArray(value)) {
                promisesArr.push($q.when($injector.invoke(value)));
              }
            });
            return promisesArr;
          }

          $modal.open = function (modalOptions) {

            var modalResultDeferred = $q.defer();
            var modalOpenedDeferred = $q.defer();

            //prepare an instance of a modal to be injected into controllers and returned to a caller
            var modalInstance = {
              result: modalResultDeferred.promise,
              opened: modalOpenedDeferred.promise,
              close: function (result) {
                $modalStack.close(modalInstance, result);
              },
              dismiss: function (reason) {
                $modalStack.dismiss(modalInstance, reason);
              },
              reposition: function () {
                $modalStack.reposition(modalInstance);
              }
            };

            //merge and clean up options
            modalOptions = angular.extend({}, $modalProvider.options, modalOptions);
            modalOptions.resolve = modalOptions.resolve || {};

            //verify options
            if (!modalOptions.template && !modalOptions.templateUrl) {
              throw new Error('One of template or templateUrl options is required.');
            }

            var templateAndResolvePromise =
              $q.all([getTemplatePromise(modalOptions)].concat(getResolvePromises(modalOptions.resolve)));


            templateAndResolvePromise.then(function resolveSuccess(tplAndVars) {

              var modalScope = (modalOptions.scope || $rootScope).$new();
              modalScope.$close = modalInstance.close;
              modalScope.$dismiss = modalInstance.dismiss;

              var ctrlInstance, ctrlLocals = {};
              var resolveIter = 1;

              //controllers
              if (modalOptions.controller) {
                ctrlLocals.$scope = modalScope;
                ctrlLocals.$modalInstance = modalInstance;
                angular.forEach(modalOptions.resolve, function (value, key) {
                  ctrlLocals[key] = tplAndVars[resolveIter++];
                });

                ctrlInstance = $controller(modalOptions.controller, ctrlLocals);
                if (modalOptions.controllerAs) {
                  modalScope[modalOptions.controllerAs] = ctrlInstance;
                }
              }

              $modalStack.open(modalInstance, {
                scope: modalScope,
                deferred: modalResultDeferred,
                content: tplAndVars[0],
                backdrop: modalOptions.backdrop,
                keyboard: modalOptions.keyboard,
                windowClass: modalOptions.windowClass,
                parent: modalOptions.parent || 'body'
              });

            }, function resolveError(reason) {
              modalResultDeferred.reject(reason);
            });

            templateAndResolvePromise.then(function () {
              modalOpenedDeferred.resolve(true);
            }, function () {
              modalOpenedDeferred.reject(false);
            });

            return modalInstance;
          };

          return $modal;
        }]
    };

    return $modalProvider;
  });

angular.module("mm.foundation.offcanvas", [])
    .directive('offCanvasWrap', ['$window', function ($window) {
        return {
            scope: {},
            restrict: 'C',
            link: function ($scope, element, attrs) {
                var win = angular.element($window);
                var sidebar = $scope.sidebar = element;

                $scope.hide = function () {
                    sidebar.removeClass('move-left');
                    sidebar.removeClass('move-right');
                };

                win.bind("resize.body", $scope.hide);

                $scope.$on('$destroy', function() {
                    win.unbind("resize.body", $scope.hide);
                });

            },
            controller: ['$scope', function($scope) {

                this.leftToggle = function() {
                    $scope.sidebar.toggleClass("move-right");
                };

                this.rightToggle = function() {
                    $scope.sidebar.toggleClass("move-left");
                };

                this.hide = function() {
                    $scope.hide();
                };
            }]
        };
    }])
    .directive('leftOffCanvasToggle', [function () {
        return {
            require: '^offCanvasWrap',
            restrict: 'C',
            link: function ($scope, element, attrs, offCanvasWrap) {
                element.on('click', function () {
                    offCanvasWrap.leftToggle();
                });
            }
        };
    }])
    .directive('rightOffCanvasToggle', [function () {
        return {
            require: '^offCanvasWrap',
            restrict: 'C',
            link: function ($scope, element, attrs, offCanvasWrap) {
                element.on('click', function () {
                    offCanvasWrap.rightToggle();
                });
            }
        };
    }])
       .directive('exitOffCanvas', [function () {
        return {
            require: '^offCanvasWrap',
            restrict: 'C',
            link: function ($scope, element, attrs, offCanvasWrap) {
                element.on('click', function () {
                    offCanvasWrap.hide();
                });
            }
        };
    }])
    .directive('offCanvasList', [function () {
        return {
            require: '^offCanvasWrap',
            restrict: 'C',
            link: function ($scope, element, attrs, offCanvasWrap) {
                element.on('click', function () {
                    offCanvasWrap.hide();
                });
            }
        };
    }]);

angular.module('mm.foundation.pagination', [])

.controller('PaginationController', ['$scope', '$attrs', '$parse', '$interpolate', function ($scope, $attrs, $parse, $interpolate) {
  var self = this,
      setNumPages = $attrs.numPages ? $parse($attrs.numPages).assign : angular.noop;

  this.init = function(defaultItemsPerPage) {
    if ($attrs.itemsPerPage) {
      $scope.$parent.$watch($parse($attrs.itemsPerPage), function(value) {
        self.itemsPerPage = parseInt(value, 10);
        $scope.totalPages = self.calculateTotalPages();
      });
    } else {
      this.itemsPerPage = defaultItemsPerPage;
    }
  };

  this.noPrevious = function() {
    return this.page === 1;
  };
  this.noNext = function() {
    return this.page === $scope.totalPages;
  };

  this.isActive = function(page) {
    return this.page === page;
  };

  this.calculateTotalPages = function() {
    var totalPages = this.itemsPerPage < 1 ? 1 : Math.ceil($scope.totalItems / this.itemsPerPage);
    return Math.max(totalPages || 0, 1);
  };

  this.getAttributeValue = function(attribute, defaultValue, interpolate) {
    return angular.isDefined(attribute) ? (interpolate ? $interpolate(attribute)($scope.$parent) : $scope.$parent.$eval(attribute)) : defaultValue;
  };

  this.render = function() {
    this.page = parseInt($scope.page, 10) || 1;
    if (this.page > 0 && this.page <= $scope.totalPages) {
      $scope.pages = this.getPages(this.page, $scope.totalPages);
    }
  };

  $scope.selectPage = function(page) {
    if ( ! self.isActive(page) && page > 0 && page <= $scope.totalPages) {
      $scope.page = page;
      $scope.onSelectPage({ page: page });
    }
  };

  $scope.$watch('page', function() {
    self.render();
  });

  $scope.$watch('totalItems', function() {
    $scope.totalPages = self.calculateTotalPages();
  });

  $scope.$watch('totalPages', function(value) {
    setNumPages($scope.$parent, value); // Readonly variable

    if ( self.page > value ) {
      $scope.selectPage(value);
    } else {
      self.render();
    }
  });
}])

.constant('paginationConfig', {
  itemsPerPage: 10,
  boundaryLinks: false,
  directionLinks: true,
  firstText: 'First',
  previousText: 'Previous',
  nextText: 'Next',
  lastText: 'Last',
  rotate: true
})

.directive('pagination', ['$parse', 'paginationConfig', function($parse, config) {
  return {
    restrict: 'EA',
    scope: {
      page: '=',
      totalItems: '=',
      onSelectPage:' &'
    },
    controller: 'PaginationController',
    templateUrl: 'template/pagination/pagination.html',
    replace: true,
    link: function(scope, element, attrs, paginationCtrl) {

      // Setup configuration parameters
      var maxSize,
      boundaryLinks  = paginationCtrl.getAttributeValue(attrs.boundaryLinks,  config.boundaryLinks      ),
      directionLinks = paginationCtrl.getAttributeValue(attrs.directionLinks, config.directionLinks     ),
      firstText      = paginationCtrl.getAttributeValue(attrs.firstText,      config.firstText,     true),
      previousText   = paginationCtrl.getAttributeValue(attrs.previousText,   config.previousText,  true),
      nextText       = paginationCtrl.getAttributeValue(attrs.nextText,       config.nextText,      true),
      lastText       = paginationCtrl.getAttributeValue(attrs.lastText,       config.lastText,      true),
      rotate         = paginationCtrl.getAttributeValue(attrs.rotate,         config.rotate);

      paginationCtrl.init(config.itemsPerPage);

      if (attrs.maxSize) {
        scope.$parent.$watch($parse(attrs.maxSize), function(value) {
          maxSize = parseInt(value, 10);
          paginationCtrl.render();
        });
      }

      // Create page object used in template
      function makePage(number, text, isActive, isDisabled) {
        return {
          number: number,
          text: text,
          active: isActive,
          disabled: isDisabled
        };
      }

      paginationCtrl.getPages = function(currentPage, totalPages) {
        var pages = [];

        // Default page limits
        var startPage = 1, endPage = totalPages;
        var isMaxSized = ( angular.isDefined(maxSize) && maxSize < totalPages );

        // recompute if maxSize
        if ( isMaxSized ) {
          if ( rotate ) {
            // Current page is displayed in the middle of the visible ones
            startPage = Math.max(currentPage - Math.floor(maxSize/2), 1);
            endPage   = startPage + maxSize - 1;

            // Adjust if limit is exceeded
            if (endPage > totalPages) {
              endPage   = totalPages;
              startPage = endPage - maxSize + 1;
            }
          } else {
            // Visible pages are paginated with maxSize
            startPage = ((Math.ceil(currentPage / maxSize) - 1) * maxSize) + 1;

            // Adjust last page if limit is exceeded
            endPage = Math.min(startPage + maxSize - 1, totalPages);
          }
        }

        // Add page number links
        for (var number = startPage; number <= endPage; number++) {
          var page = makePage(number, number, paginationCtrl.isActive(number), false);
          pages.push(page);
        }

        // Add links to move between page sets
        if ( isMaxSized && ! rotate ) {
          if ( startPage > 1 ) {
            var previousPageSet = makePage(startPage - 1, '...', false, false);
            pages.unshift(previousPageSet);
          }

          if ( endPage < totalPages ) {
            var nextPageSet = makePage(endPage + 1, '...', false, false);
            pages.push(nextPageSet);
          }
        }

        // Add previous & next links
        if (directionLinks) {
          var previousPage = makePage(currentPage - 1, previousText, false, paginationCtrl.noPrevious());
          pages.unshift(previousPage);

          var nextPage = makePage(currentPage + 1, nextText, false, paginationCtrl.noNext());
          pages.push(nextPage);
        }

        // Add first & last links
        if (boundaryLinks) {
          var firstPage = makePage(1, firstText, false, paginationCtrl.noPrevious());
          pages.unshift(firstPage);

          var lastPage = makePage(totalPages, lastText, false, paginationCtrl.noNext());
          pages.push(lastPage);
        }

        return pages;
      };
    }
  };
}])

.constant('pagerConfig', {
  itemsPerPage: 10,
  previousText: '« Previous',
  nextText: 'Next »',
  align: true
})

.directive('pager', ['pagerConfig', function(config) {
  return {
    restrict: 'EA',
    scope: {
      page: '=',
      totalItems: '=',
      onSelectPage:' &'
    },
    controller: 'PaginationController',
    templateUrl: 'template/pagination/pager.html',
    replace: true,
    link: function(scope, element, attrs, paginationCtrl) {

      // Setup configuration parameters
      var previousText = paginationCtrl.getAttributeValue(attrs.previousText, config.previousText, true),
      nextText         = paginationCtrl.getAttributeValue(attrs.nextText,     config.nextText,     true),
      align            = paginationCtrl.getAttributeValue(attrs.align,        config.align);

      paginationCtrl.init(config.itemsPerPage);

      // Create page object used in template
      function makePage(number, text, isDisabled, isPrevious, isNext) {
        return {
          number: number,
          text: text,
          disabled: isDisabled,
          previous: ( align && isPrevious ),
          next: ( align && isNext )
        };
      }

      paginationCtrl.getPages = function(currentPage) {
        return [
          makePage(currentPage - 1, previousText, paginationCtrl.noPrevious(), true, false),
          makePage(currentPage + 1, nextText, paginationCtrl.noNext(), false, true)
        ];
      };
    }
  };
}]);

/**
 * The following features are still outstanding: animation as a
 * function, placement as a function, inside, support for more triggers than
 * just mouse enter/leave, html tooltips, and selector delegation.
 */
angular.module( 'mm.foundation.tooltip', [ 'mm.foundation.position', 'mm.foundation.bindHtml' ] )

/**
 * The $tooltip service creates tooltip- and popover-like directives as well as
 * houses global options for them.
 */
.provider( '$tooltip', function () {
  // The default options tooltip and popover.
  var defaultOptions = {
    placement: 'top',
    animation: true,
    popupDelay: 0
  };

  // Default hide triggers for each show trigger
  var triggerMap = {
    'mouseenter': 'mouseleave',
    'click': 'click',
    'focus': 'blur'
  };

  // The options specified to the provider globally.
  var globalOptions = {};
  
  /**
   * `options({})` allows global configuration of all tooltips in the
   * application.
   *
   *   var app = angular.module( 'App', ['mm.foundation.tooltip'], function( $tooltipProvider ) {
   *     // place tooltips left instead of top by default
   *     $tooltipProvider.options( { placement: 'left' } );
   *   });
   */
	this.options = function( value ) {
		angular.extend( globalOptions, value );
	};

  /**
   * This allows you to extend the set of trigger mappings available. E.g.:
   *
   *   $tooltipProvider.setTriggers( 'openTrigger': 'closeTrigger' );
   */
  this.setTriggers = function setTriggers ( triggers ) {
    angular.extend( triggerMap, triggers );
  };

  /**
   * This is a helper function for translating camel-case to snake-case.
   */
  function snake_case(name){
    var regexp = /[A-Z]/g;
    var separator = '-';
    return name.replace(regexp, function(letter, pos) {
      return (pos ? separator : '') + letter.toLowerCase();
    });
  }

  /**
   * Returns the actual instance of the $tooltip service.
   * TODO support multiple triggers
   */
  this.$get = [ '$window', '$compile', '$timeout', '$parse', '$document', '$position', '$interpolate', function ( $window, $compile, $timeout, $parse, $document, $position, $interpolate ) {
    return function $tooltip ( type, prefix, defaultTriggerShow ) {
      var options = angular.extend( {}, defaultOptions, globalOptions );

      /**
       * Returns an object of show and hide triggers.
       *
       * If a trigger is supplied,
       * it is used to show the tooltip; otherwise, it will use the `trigger`
       * option passed to the `$tooltipProvider.options` method; else it will
       * default to the trigger supplied to this directive factory.
       *
       * The hide trigger is based on the show trigger. If the `trigger` option
       * was passed to the `$tooltipProvider.options` method, it will use the
       * mapped trigger from `triggerMap` or the passed trigger if the map is
       * undefined; otherwise, it uses the `triggerMap` value of the show
       * trigger; else it will just use the show trigger.
       */
      function getTriggers ( trigger ) {
        var show = trigger || options.trigger || defaultTriggerShow;
        var hide = triggerMap[show] || show;
        return {
          show: show,
          hide: hide
        };
      }

      var directiveName = snake_case( type );

      var startSym = $interpolate.startSymbol();
      var endSym = $interpolate.endSymbol();
      var template = 
        '<div '+ directiveName +'-popup '+
          'title="'+startSym+'tt_title'+endSym+'" '+
          'content="'+startSym+'tt_content'+endSym+'" '+
          'placement="'+startSym+'tt_placement'+endSym+'" '+
          'animation="tt_animation" '+
          'is-open="tt_isOpen"'+
          '>'+
        '</div>';

      return {
        restrict: 'EA',
        scope: true,
        compile: function (tElem, tAttrs) {
          var tooltipLinker = $compile( template );

          return function link ( scope, element, attrs ) {
            var tooltip;
            var transitionTimeout;
            var popupTimeout;
            var appendToBody = angular.isDefined( options.appendToBody ) ? options.appendToBody : false;
            var triggers = getTriggers( undefined );
            var hasRegisteredTriggers = false;
            var hasEnableExp = angular.isDefined(attrs[prefix+'Enable']);

            var positionTooltip = function (){
              var position,
                ttWidth,
                ttHeight,
                ttPosition;
              // Get the position of the directive element.
              position = appendToBody ? $position.offset( element ) : $position.position( element );

              // Get the height and width of the tooltip so we can center it.
              ttWidth = tooltip.prop( 'offsetWidth' );
              ttHeight = tooltip.prop( 'offsetHeight' );

              // Calculate the tooltip's top and left coordinates to center it with
              // this directive.
              switch ( scope.tt_placement ) {
                case 'right':
                  ttPosition = {
                    top: position.top + position.height / 2 - ttHeight / 2,
                    left: position.left + position.width + 10
                  };
                  break;
                case 'bottom':
                  ttPosition = {
                    top: position.top + position.height + 10,
                    left: position.left
                  };
                  break;
                case 'left':
                  ttPosition = {
                    top: position.top + position.height / 2 - ttHeight / 2,
                    left: position.left - ttWidth - 10
                  };
                  break;
                default:
                  ttPosition = {
                    top: position.top - ttHeight - 10,
                    left: position.left
                  };
                  break;
              }

              ttPosition.top += 'px';
              ttPosition.left += 'px';

              // Now set the calculated positioning.
              tooltip.css( ttPosition );

            };

            // By default, the tooltip is not open.
            // TODO add ability to start tooltip opened
            scope.tt_isOpen = false;

            function toggleTooltipBind () {
              if ( ! scope.tt_isOpen ) {
                showTooltipBind();
              } else {
                hideTooltipBind();
              }
            }

            // Show the tooltip with delay if specified, otherwise show it immediately
            function showTooltipBind() {
              if(hasEnableExp && !scope.$eval(attrs[prefix+'Enable'])) {
                return;
              }
              if ( scope.tt_popupDelay ) {
                popupTimeout = $timeout( show, scope.tt_popupDelay, false );
                popupTimeout.then(function(reposition){reposition();});
              } else {
                show()();
              }
            }

            function hideTooltipBind () {
              scope.$apply(function () {
                hide();
              });
            }

            // Show the tooltip popup element.
            function show() {


              // Don't show empty tooltips.
              if ( ! scope.tt_content ) {
                return angular.noop;
              }

              createTooltip();

              // If there is a pending remove transition, we must cancel it, lest the
              // tooltip be mysteriously removed.
              if ( transitionTimeout ) {
                $timeout.cancel( transitionTimeout );
              }

              // Set the initial positioning.
              tooltip.css({ top: 0, left: 0, display: 'block' });

              // Now we add it to the DOM because need some info about it. But it's not 
              // visible yet anyway.
              if ( appendToBody ) {
                  $document.find( 'body' ).append( tooltip );
              } else {
                element.after( tooltip );
              }

              positionTooltip();

              // And show the tooltip.
              scope.tt_isOpen = true;
              scope.$digest(); // digest required as $apply is not called

              // Return positioning function as promise callback for correct
              // positioning after draw.
              return positionTooltip;
            }

            // Hide the tooltip popup element.
            function hide() {
              // First things first: we don't show it anymore.
              scope.tt_isOpen = false;

              //if tooltip is going to be shown after delay, we must cancel this
              $timeout.cancel( popupTimeout );

              // And now we remove it from the DOM. However, if we have animation, we 
              // need to wait for it to expire beforehand.
              // FIXME: this is a placeholder for a port of the transitions library.
              if ( scope.tt_animation ) {
                transitionTimeout = $timeout(removeTooltip, 500);
              } else {
                removeTooltip();
              }
            }

            function createTooltip() {
              // There can only be one tooltip element per directive shown at once.
              if (tooltip) {
                removeTooltip();
              }
              tooltip = tooltipLinker(scope, function () {});

              // Get contents rendered into the tooltip
              scope.$digest();
            }

            function removeTooltip() {
              if (tooltip) {
                tooltip.remove();
                tooltip = null;
              }
            }

            /**
             * Observe the relevant attributes.
             */
            attrs.$observe( type, function ( val ) {
              scope.tt_content = val;

              if (!val && scope.tt_isOpen ) {
                hide();
              }
            });

            attrs.$observe( prefix+'Title', function ( val ) {
              scope.tt_title = val;
            });

            attrs[prefix+'Placement'] = attrs[prefix+'Placement'] || null;

            attrs.$observe( prefix+'Placement', function ( val ) {
              scope.tt_placement = angular.isDefined( val ) && val ? val : options.placement;
            });

            attrs[prefix+'PopupDelay'] = attrs[prefix+'PopupDelay'] || null;

            attrs.$observe( prefix+'PopupDelay', function ( val ) {
              var delay = parseInt( val, 10 );
              scope.tt_popupDelay = ! isNaN(delay) ? delay : options.popupDelay;
            });

            var unregisterTriggers = function() {
              if ( hasRegisteredTriggers ) {
                if ( angular.isFunction( triggers.show ) ) {
                  unregisterTriggerFunction();
                } else {
                  element.unbind( triggers.show, showTooltipBind );
                  element.unbind( triggers.hide, hideTooltipBind );
                }
              }
            };

            var unregisterTriggerFunction = function () {};

            attrs[prefix+'Trigger'] = attrs[prefix+'Trigger'] || null;

            attrs.$observe( prefix+'Trigger', function ( val ) {
              unregisterTriggers();
              unregisterTriggerFunction();

              triggers = getTriggers( val );

              if ( angular.isFunction( triggers.show ) ) {
                unregisterTriggerFunction = scope.$watch( function () {
                  return triggers.show( scope, element, attrs );
                }, function ( val ) {
                  return val ? $timeout( show ) : $timeout( hide );
                });
              } else {
                if ( triggers.show === triggers.hide ) {
                  element.bind( triggers.show, toggleTooltipBind );
                } else {
                  element.bind( triggers.show, showTooltipBind );
                  element.bind( triggers.hide, hideTooltipBind );
                }
              }

              hasRegisteredTriggers = true;
            });

            var animation = scope.$eval(attrs[prefix + 'Animation']);
            scope.tt_animation = angular.isDefined(animation) ? !!animation : options.animation;

            attrs.$observe( prefix+'AppendToBody', function ( val ) {
              appendToBody = angular.isDefined( val ) ? $parse( val )( scope ) : appendToBody;
            });

            // if a tooltip is attached to <body> we need to remove it on
            // location change as its parent scope will probably not be destroyed
            // by the change.
            if ( appendToBody ) {
              scope.$on('$locationChangeSuccess', function closeTooltipOnLocationChangeSuccess () {
              if ( scope.tt_isOpen ) {
                hide();
              }
            });
            }

            // Make sure tooltip is destroyed and removed.
            scope.$on('$destroy', function onDestroyTooltip() {
              $timeout.cancel( transitionTimeout );
              $timeout.cancel( popupTimeout );
              unregisterTriggers();
              unregisterTriggerFunction();
              removeTooltip();
            });
          };
        }
      };
    };
  }];
})

.directive( 'tooltipPopup', function () {
  return {
    restrict: 'EA',
    replace: true,
    scope: { content: '@', placement: '@', animation: '&', isOpen: '&' },
    templateUrl: 'template/tooltip/tooltip-popup.html'
  };
})

.directive( 'tooltip', [ '$tooltip', function ( $tooltip ) {
  return $tooltip( 'tooltip', 'tooltip', 'mouseenter' );
}])

.directive( 'tooltipHtmlUnsafePopup', function () {
  return {
    restrict: 'EA',
    replace: true,
    scope: { content: '@', placement: '@', animation: '&', isOpen: '&' },
    templateUrl: 'template/tooltip/tooltip-html-unsafe-popup.html'
  };
})

.directive( 'tooltipHtmlUnsafe', [ '$tooltip', function ( $tooltip ) {
  return $tooltip( 'tooltipHtmlUnsafe', 'tooltip', 'mouseenter' );
}]);

/**
 * The following features are still outstanding: popup delay, animation as a
 * function, placement as a function, inside, support for more triggers than
 * just mouse enter/leave, html popovers, and selector delegatation.
 */
angular.module( 'mm.foundation.popover', [ 'mm.foundation.tooltip' ] )

.directive( 'popoverPopup', function () {
  return {
    restrict: 'EA',
    replace: true,
    scope: { title: '@', content: '@', placement: '@', animation: '&', isOpen: '&' },
    templateUrl: 'template/popover/popover.html'
  };
})

.directive( 'popover', [ '$tooltip', function ( $tooltip ) {
  return $tooltip( 'popover', 'popover', 'click' );
}]);

angular.module('mm.foundation.progressbar', ['mm.foundation.transition'])

.constant('progressConfig', {
  animate: true,
  max: 100
})

.controller('ProgressController', ['$scope', '$attrs', 'progressConfig', '$transition', function($scope, $attrs, progressConfig, $transition) {
    var self = this,
        bars = [],
        max = angular.isDefined($attrs.max) ? $scope.$parent.$eval($attrs.max) : progressConfig.max,
        animate = angular.isDefined($attrs.animate) ? $scope.$parent.$eval($attrs.animate) : progressConfig.animate;

    this.addBar = function(bar, element) {
        var oldValue = 0, index = bar.$parent.$index;
        if ( angular.isDefined(index) &&  bars[index] ) {
            oldValue = bars[index].value;
        }
        bars.push(bar);

        this.update(element, bar.value, oldValue);

        bar.$watch('value', function(value, oldValue) {
            if (value !== oldValue) {
                self.update(element, value, oldValue);
            }
        });

        bar.$on('$destroy', function() {
            self.removeBar(bar);
        });
    };

    // Update bar element width
    this.update = function(element, newValue, oldValue) {
        var percent = this.getPercentage(newValue);

        if (animate) {
            element.css('width', this.getPercentage(oldValue) + '%');
            $transition(element, {width: percent + '%'});
        } else {
            element.css({'transition': 'none', 'width': percent + '%'});
        }
    };

    this.removeBar = function(bar) {
        bars.splice(bars.indexOf(bar), 1);
    };

    this.getPercentage = function(value) {
        return Math.round(100 * value / max);
    };
}])

.directive('progress', function() {
    return {
        restrict: 'EA',
        replace: true,
        transclude: true,
        controller: 'ProgressController',
        require: 'progress',
        scope: {},
        template: '<div class="progress" ng-transclude></div>'
        //templateUrl: 'template/progressbar/progress.html' // Works in AngularJS 1.2
    };
})

.directive('bar', function() {
    return {
        restrict: 'EA',
        replace: true,
        transclude: true,
        require: '^progress',
        scope: {
            value: '=',
            type: '@'
        },
        templateUrl: 'template/progressbar/bar.html',
        link: function(scope, element, attrs, progressCtrl) {
            progressCtrl.addBar(scope, element);
        }
    };
})

.directive('progressbar', function() {
    return {
        restrict: 'EA',
        replace: true,
        transclude: true,
        controller: 'ProgressController',
        scope: {
            value: '=',
            type: '@'
        },
        templateUrl: 'template/progressbar/progressbar.html',
        link: function(scope, element, attrs, progressCtrl) {
            progressCtrl.addBar(scope, angular.element(element.children()[0]));
        }
    };
});

angular.module('mm.foundation.rating', [])

.constant('ratingConfig', {
  max: 5,
  stateOn: null,
  stateOff: null
})

.controller('RatingController', ['$scope', '$attrs', '$parse', 'ratingConfig', function($scope, $attrs, $parse, ratingConfig) {

  this.maxRange = angular.isDefined($attrs.max) ? $scope.$parent.$eval($attrs.max) : ratingConfig.max;
  this.stateOn = angular.isDefined($attrs.stateOn) ? $scope.$parent.$eval($attrs.stateOn) : ratingConfig.stateOn;
  this.stateOff = angular.isDefined($attrs.stateOff) ? $scope.$parent.$eval($attrs.stateOff) : ratingConfig.stateOff;

  this.createRateObjects = function(states) {
    var defaultOptions = {
      stateOn: this.stateOn,
      stateOff: this.stateOff
    };

    for (var i = 0, n = states.length; i < n; i++) {
      states[i] = angular.extend({ index: i }, defaultOptions, states[i]);
    }
    return states;
  };

  // Get objects used in template
  $scope.range = angular.isDefined($attrs.ratingStates) ?  this.createRateObjects(angular.copy($scope.$parent.$eval($attrs.ratingStates))): this.createRateObjects(new Array(this.maxRange));

  $scope.rate = function(value) {
    if ( $scope.value !== value && !$scope.readonly ) {
      $scope.value = value;
    }
  };

  $scope.enter = function(value) {
    if ( ! $scope.readonly ) {
      $scope.val = value;
    }
    $scope.onHover({value: value});
  };

  $scope.reset = function() {
    $scope.val = angular.copy($scope.value);
    $scope.onLeave();
  };

  $scope.$watch('value', function(value) {
    $scope.val = value;
  });

  $scope.readonly = false;
  if ($attrs.readonly) {
    $scope.$parent.$watch($parse($attrs.readonly), function(value) {
      $scope.readonly = !!value;
    });
  }
}])

.directive('rating', function() {
  return {
    restrict: 'EA',
    scope: {
      value: '=',
      onHover: '&',
      onLeave: '&'
    },
    controller: 'RatingController',
    templateUrl: 'template/rating/rating.html',
    replace: true
  };
});


/**
 * @ngdoc overview
 * @name mm.foundation.tabs
 *
 * @description
 * AngularJS version of the tabs directive.
 */

angular.module('mm.foundation.tabs', [])

.controller('TabsetController', ['$scope', function TabsetCtrl($scope) {
  var ctrl = this,
      tabs = ctrl.tabs = $scope.tabs = [];

  if (angular.isUndefined($scope.openOnLoad)) { $scope.openOnLoad = true; }

  ctrl.select = function(tab) {
    angular.forEach(tabs, function(tab) {
      tab.active = false;
    });
    tab.active = true;
  };

  ctrl.addTab = function addTab(tab) {
    tabs.push(tab);
    if ($scope.openOnLoad && (tabs.length === 1 || tab.active)) {
      ctrl.select(tab);
    }
  };

  ctrl.removeTab = function removeTab(tab) {
    var index = tabs.indexOf(tab);
    //Select a new tab if the tab to be removed is selected
    if (tab.active && tabs.length > 1) {
      //If this is the last tab, select the previous tab. else, the next tab.
      var newActiveIndex = index == tabs.length - 1 ? index - 1 : index + 1;
      ctrl.select(tabs[newActiveIndex]);
    }
    tabs.splice(index, 1);
  };
}])

/**
 * @ngdoc directive
 * @name mm.foundation.tabs.directive:tabset
 * @restrict EA
 *
 * @description
 * Tabset is the outer container for the tabs directive
 *
 * @param {boolean=} vertical Whether or not to use vertical styling for the tabs.
 * @param {boolean=} justified Whether or not to use justified styling for the tabs.
 *
 * @example
<example module="mm.foundation">
  <file name="index.html">
    <tabset>
      <tab heading="Tab 1"><b>First</b> Content!</tab>
      <tab heading="Tab 2"><i>Second</i> Content!</tab>
    </tabset>
    <hr />
    <tabset vertical="true">
      <tab heading="Vertical Tab 1"><b>First</b> Vertical Content!</tab>
      <tab heading="Vertical Tab 2"><i>Second</i> Vertical Content!</tab>
    </tabset>
    <tabset justified="true">
      <tab heading="Justified Tab 1"><b>First</b> Justified Content!</tab>
      <tab heading="Justified Tab 2"><i>Second</i> Justified Content!</tab>
    </tabset>
  </file>
</example>
 */
.directive('tabset', function() {
  return {
    restrict: 'EA',
    transclude: true,
    replace: true,
    scope: {
      openOnLoad: '=?'
    },
    controller: 'TabsetController',
    templateUrl: 'template/tabs/tabset.html',
    link: function(scope, element, attrs) {
      scope.vertical = angular.isDefined(attrs.vertical) ? scope.$parent.$eval(attrs.vertical) : false;
      scope.justified = angular.isDefined(attrs.justified) ? scope.$parent.$eval(attrs.justified) : false;
      scope.type = angular.isDefined(attrs.type) ? scope.$parent.$eval(attrs.type) : 'tabs';
    }
  };
})

/**
 * @ngdoc directive
 * @name mm.foundation.tabs.directive:tab
 * @restrict EA
 *
 * @param {string=} heading The visible heading, or title, of the tab. Set HTML headings with {@link mm.foundation.tabs.directive:tabHeading tabHeading}.
 * @param {string=} select An expression to evaluate when the tab is selected.
 * @param {boolean=} active A binding, telling whether or not this tab is selected.
 * @param {boolean=} disabled A binding, telling whether or not this tab is disabled.
 *
 * @description
 * Creates a tab with a heading and content. Must be placed within a {@link mm.foundation.tabs.directive:tabset tabset}.
 *
 * @example
<example module="mm.foundation">
  <file name="index.html">
    <div ng-controller="TabsDemoCtrl">
      <button class="button small" ng-click="items[0].active = true">
        Select item 1, using active binding
      </button>
      <button class="button small" ng-click="items[1].disabled = !items[1].disabled">
        Enable/disable item 2, using disabled binding
      </button>
      <br />
      <tabset>
        <tab heading="Tab 1">First Tab</tab>
        <tab select="alertMe()">
          <tab-heading><i class="fa fa-bell"></i> Alert me!</tab-heading>
          Second Tab, with alert callback and html heading!
        </tab>
        <tab ng-repeat="item in items"
          heading="{{item.title}}"
          disabled="item.disabled"
          active="item.active">
          {{item.content}}
        </tab>
      </tabset>
    </div>
  </file>
  <file name="script.js">
    function TabsDemoCtrl($scope) {
      $scope.items = [
        { title:"Dynamic Title 1", content:"Dynamic Item 0" },
        { title:"Dynamic Title 2", content:"Dynamic Item 1", disabled: true }
      ];

      $scope.alertMe = function() {
        setTimeout(function() {
          alert("You've selected the alert tab!");
        });
      };
    };
  </file>
</example>
 */

/**
 * @ngdoc directive
 * @name mm.foundation.tabs.directive:tabHeading
 * @restrict EA
 *
 * @description
 * Creates an HTML heading for a {@link mm.foundation.tabs.directive:tab tab}. Must be placed as a child of a tab element.
 *
 * @example
<example module="mm.foundation">
  <file name="index.html">
    <tabset>
      <tab>
        <tab-heading><b>HTML</b> in my titles?!</tab-heading>
        And some content, too!
      </tab>
      <tab>
        <tab-heading><i class="fa fa-heart"></i> Icon heading?!?</tab-heading>
        That's right.
      </tab>
    </tabset>
  </file>
</example>
 */
.directive('tab', ['$parse', function($parse) {
  return {
    require: '^tabset',
    restrict: 'EA',
    replace: true,
    templateUrl: 'template/tabs/tab.html',
    transclude: true,
    scope: {
      heading: '@',
      onSelect: '&select', //This callback is called in contentHeadingTransclude
                          //once it inserts the tab's content into the dom
      onDeselect: '&deselect'
    },
    controller: function() {
      //Empty controller so other directives can require being 'under' a tab
    },
    compile: function(elm, attrs, transclude) {
      return function postLink(scope, elm, attrs, tabsetCtrl) {
        var getActive, setActive;
        if (attrs.active) {
          getActive = $parse(attrs.active);
          setActive = getActive.assign;
          scope.$parent.$watch(getActive, function updateActive(value, oldVal) {
            // Avoid re-initializing scope.active as it is already initialized
            // below. (watcher is called async during init with value ===
            // oldVal)
            if (value !== oldVal) {
              scope.active = !!value;
            }
          });
          scope.active = getActive(scope.$parent);
        } else {
          setActive = getActive = angular.noop;
        }

        scope.$watch('active', function(active) {
          if( !angular.isFunction(setActive) ){
            return;
          }
          // Note this watcher also initializes and assigns scope.active to the
          // attrs.active expression.          
          setActive(scope.$parent, active);
          if (active) {
            tabsetCtrl.select(scope);
            scope.onSelect();
          } else {
            scope.onDeselect();
          }
        });

        scope.disabled = false;
        if ( attrs.disabled ) {
          scope.$parent.$watch($parse(attrs.disabled), function(value) {
            scope.disabled = !! value;
          });
        }

        scope.select = function() {
          if ( ! scope.disabled ) {
            scope.active = true;
          }
        };

        tabsetCtrl.addTab(scope);
        scope.$on('$destroy', function() {
          tabsetCtrl.removeTab(scope);
        });


        //We need to transclude later, once the content container is ready.
        //when this link happens, we're inside a tab heading.
        scope.$transcludeFn = transclude;
      };
    }
  };
}])

.directive('tabHeadingTransclude', [function() {
  return {
    restrict: 'A',
    require: '^tab',
    link: function(scope, elm, attrs, tabCtrl) {
      scope.$watch('headingElement', function updateHeadingElement(heading) {
        if (heading) {
          elm.html('');
          elm.append(heading);
        }
      });
    }
  };
}])

.directive('tabContentTransclude', function() {
  return {
    restrict: 'A',
    require: '^tabset',
    link: function(scope, elm, attrs) {
      var tab = scope.$eval(attrs.tabContentTransclude);

      //Now our tab is ready to be transcluded: both the tab heading area
      //and the tab content area are loaded.  Transclude 'em both.
      tab.$transcludeFn(tab.$parent, function(contents) {
        angular.forEach(contents, function(node) {
          if (isTabHeading(node)) {
            //Let tabHeadingTransclude know.
            tab.headingElement = node;
          } else {
            elm.append(node);
          }
        });
      });
    }
  };
  function isTabHeading(node) {
    return node.tagName &&  (
      node.hasAttribute('tab-heading') ||
      node.hasAttribute('data-tab-heading') ||
      node.tagName.toLowerCase() === 'tab-heading' ||
      node.tagName.toLowerCase() === 'data-tab-heading'
    );
  }
})

;

angular.module("mm.foundation.topbar", ['mm.foundation.mediaQueries'])
.factory('closest', [function() {
  return function(el, selector) {
    var matchesSelector = function (node, selector) {
      var nodes = (node.parentNode || node.document).querySelectorAll(selector);
      var i = -1;
      while (nodes[++i] && nodes[i] != node){}
      return !!nodes[i];
    };

    var element = el[0];
    while (element) {
      if (matchesSelector(element, selector)) {
        return angular.element(element);
      } else {
        element = element.parentElement;
      }
    }
    return false;
  };
}])
.directive('topBar', ['$timeout','$compile', '$window', '$document', 'mediaQueries',
  function($timeout, $compile, $window, $document, mediaQueries) {
    return {
      scope: {
        stickyClass : '@',
        backText: '@',
        stickyOn : '=',
        customBackText: '=',
        isHover: '=',
        mobileShowParentLink: '=',
        scrolltop : '=',
      },
      restrict: 'EA',
      replace: true,
      templateUrl: 'template/topbar/top-bar.html',
      transclude: true,
      controller: ['$window', '$scope', 'closest', function($window, $scope, closest) {
        $scope.settings = {};
        $scope.settings.stickyClass = $scope.stickyClass || 'sticky';
        $scope.settings.backText = $scope.backText || 'Back';
        $scope.settings.stickyOn = $scope.stickyOn || 'all';

        $scope.settings.customBackText = $scope.customBackText === undefined ? true : $scope.customBackText;
        $scope.settings.isHover = $scope.isHover === undefined ? true : $scope.isHover;
        $scope.settings.mobileShowParentLink = $scope.mobileShowParentLink === undefined ? true : $scope.mobileShowParentLink;
        $scope.settings.scrolltop = $scope.scrolltop === undefined ? true : $scope.scrolltop; // jump to top when sticky nav menu toggle is clicked

        this.settings = $scope.settings;

        $scope.index = 0;

        var outerHeight = function(el) {
          var height = el.offsetHeight;
          var style = el.currentStyle || getComputedStyle(el);

          height += parseInt(style.marginTop, 10) + parseInt(style.marginBottom, 10);
          return height;
        };


        var sections = [];

        this.addSection = function(section) {
          sections.push(section);
        };

        this.removeSection = function(section) {
          var index = sections.indexOf(section);
          if (index > -1) {
            sections.splice(index, 1);
          }
        };

        var dir = /rtl/i.test($document.find('html').attr('dir')) ? 'right' : 'left';

        $scope.$watch('index', function(index) {
          for(var i = 0; i < sections.length; i++){
            sections[i].move(dir, index);
          }
        });

        this.toggle = function(on) {
          $scope.toggle(on);
          for(var i = 0; i < sections.length; i++){
            sections[i].reset();
          }
          $scope.index = 0;
          $scope.height = '';
          $scope.$apply();
        };

        this.back = function(event) {
          if($scope.index < 1 || !mediaQueries.topbarBreakpoint()){
            return;
          }

          var $link = angular.element(event.currentTarget);
          var $movedLi = closest($link, 'li.moved');
          var $previousLevelUl = $movedLi.parent();
          $scope.index = $scope.index -1;

          if($scope.index === 0){
            $scope.height = '';
          } else {
            $scope.height = $scope.originalHeight + outerHeight($previousLevelUl[0]);
          }

          $timeout(function() {
            $movedLi.removeClass('moved');
          }, 300);
        };

        this.forward = function(event) {
          if(!mediaQueries.topbarBreakpoint()){
            return false;
          }

          var $link = angular.element(event.currentTarget);
          var $selectedLi = closest($link, 'li');
          $selectedLi.addClass('moved');
          $scope.height = $scope.originalHeight + outerHeight($link.parent()[0].querySelector('ul'));
          $scope.index = $scope.index + 1;
          $scope.$apply();
        };

      }],
      link: function(scope, element, attrs) {
        var topbar = scope.topbar = element;
        var topbarContainer = topbar.parent();
        var body = angular.element($document[0].querySelector('body'));
        var lastBreakpoint = mediaQueries.topbarBreakpoint();

        var isSticky = scope.isSticky = function() {
          var sticky = topbarContainer.hasClass(scope.settings.stickyClass);
          if (sticky && scope.settings.stickyOn === 'all') {
            return true;
          } else if (sticky && mediaQueries.small() && scope.settings.stickyOn === 'small') {
            return true;
          } else if (sticky && mediaQueries.medium() && scope.settings.stickyOn === 'medium') {
            return true;
          } else if (sticky && mediaQueries.large() && scope.settings.stickyOn === 'large') {
            return true;
          }
          return false;
        };

        var updateStickyPositioning = function() {
          if (!scope.stickyTopbar || !scope.isSticky()) {
            return;
          }

          var distance = stickyoffset;

          if ($window.pageYOffset > distance && !topbarContainer.hasClass('fixed')) {
            topbarContainer.addClass('fixed');
            body.css('padding-top', scope.originalHeight + 'px');
          } else if ($window.pageYOffset <= distance && topbarContainer.hasClass('fixed')) {
            topbarContainer.removeClass('fixed');
            body.css('padding-top', '');
          }
        };

        var onResize = function() {
          var currentBreakpoint = mediaQueries.topbarBreakpoint();
          if(lastBreakpoint === currentBreakpoint){
            return;
          }
          lastBreakpoint = mediaQueries.topbarBreakpoint();

          topbar.removeClass('expanded');
          topbar.parent().removeClass('expanded');
          scope.height = '';

          var sections = angular.element(topbar[0].querySelectorAll('section'));
          angular.forEach(sections, function(section) {
            angular.element(section.querySelectorAll('li.moved')).removeClass('moved');
          });

          scope.$apply();
        };

        var onScroll = function() {
          updateStickyPositioning();
          scope.$apply();
        };

        scope.toggle = function(on) {
          if(!mediaQueries.topbarBreakpoint()){
            return false;
          }

          var expand = (on === undefined) ? !topbar.hasClass('expanded') : on;

          if (expand) {
            topbar.addClass('expanded');
          }
          else {
            topbar.removeClass('expanded');
          }

          if (scope.settings.scrolltop) {
            if (!expand && topbar.hasClass('fixed')) {
              topbar.parent().addClass('fixed');
              topbar.removeClass('fixed');
              body.css('padding-top', scope.originalHeight + 'px');
            } else if (expand && topbar.parent().hasClass('fixed')) {
              topbar.parent().removeClass('fixed');
              topbar.addClass('fixed');
              body.css('padding-top', '');
              $window.scrollTo(0,0);
            }
          } else {
            if(isSticky()) {
              topbar.parent().addClass('fixed');
            }

            if(topbar.parent().hasClass('fixed')) {
              if (!expand) {
                topbar.removeClass('fixed');
                topbar.parent().removeClass('expanded');
                updateStickyPositioning();
              } else {
                topbar.addClass('fixed');
                topbar.parent().addClass('expanded');
                body.css('padding-top', scope.originalHeight + 'px');
              }
            }
          }
        };

        if(topbarContainer.hasClass('fixed') || isSticky() ) {
          scope.stickyTopbar = true;
          scope.height = topbarContainer[0].offsetHeight;
          var stickyoffset = topbarContainer[0].getBoundingClientRect().top + $window.pageYOffset;
        } else {
          scope.height = topbar[0].offsetHeight;
        }

        scope.originalHeight = scope.height;

        scope.$watch('height', function(h) {
          if(h){
            topbar.css('height', h + 'px');
          } else {
            topbar.css('height', '');
          }
        });

        angular.element($window).bind('resize', onResize);
        angular.element($window).bind('scroll', onScroll);

        scope.$on('$destroy', function() {
          angular.element($window).unbind('scroll', onResize);
          angular.element($window).unbind('resize', onScroll);
        });

        if (topbarContainer.hasClass('fixed')) {
          body.css('padding-top', scope.originalHeight + 'px');
        }
      }
    };
  }]
)
.directive('toggleTopBar', ['closest', function (closest) {
  return {
    scope: {},
    require: '^topBar',
    restrict: 'A',
    replace: true,
    templateUrl: 'template/topbar/toggle-top-bar.html',
    transclude: true,
    link: function(scope, element, attrs, topBar) {
      element.bind('click', function(event) {
        var li = closest(angular.element(event.currentTarget), 'li');
        if(!li.hasClass('back') && !li.hasClass('has-dropdown')) {
          topBar.toggle();
        }
      });

      scope.$on('$destroy', function() {
        element.unbind('click');
      });
    }
  };
}])
.directive('topBarSection', ['$compile', 'closest', function($compile, closest) {
  return {
    scope: {},
    require: '^topBar',
    restrict: 'EA',
    replace: true,
    templateUrl: 'template/topbar/top-bar-section.html',
    transclude: true,
    link: function(scope, element, attrs, topBar) {
      var section = element;

      scope.reset = function() {
        angular.element(section[0].querySelectorAll('li.moved')).removeClass('moved');
      };

      scope.move = function(dir, index) {
        if(dir === 'left'){
          section.css({"left": index * -100 + '%'});
        }
        else {
          section.css({"right": index * -100 + '%'});
        }
      };

      topBar.addSection(scope);

      scope.$on("$destroy", function() {
        topBar.removeSection(scope);
      });

      // Top level links close menu on click
      var links = section[0].querySelectorAll('li>a');
      angular.forEach(links, function(link) {
        var $link = angular.element(link);
        var li = closest($link, 'li');
        if (li.hasClass('has-dropdown') || li.hasClass('back') || li.hasClass('title')) {
          return;
        }

        $link.bind('click', function() {
          topBar.toggle(false);
        });

        scope.$on('$destroy', function() {
          $link.bind('click');
        });
      });
    }
  };
}])
.directive('hasDropdown', ['mediaQueries', function (mediaQueries) {
  return {
    scope: {},
    require: '^topBar',
    restrict: 'A',
    templateUrl: 'template/topbar/has-dropdown.html',
    replace: true,
    transclude: true,
    link: function(scope, element, attrs, topBar) {
      scope.triggerLink = element.children('a')[0];

      var $link = angular.element(scope.triggerLink);

      $link.bind('click', function(event) {
        topBar.forward(event);
      });
      scope.$on('$destroy', function() {
        $link.unbind('click');
      });

      element.bind('mouseenter', function() {
        if(topBar.settings.isHover && !mediaQueries.topbarBreakpoint()){
          element.addClass('not-click');
        }
      });
      element.bind('click', function(event) {
        if(!topBar.settings.isHover && !mediaQueries.topbarBreakpoint()){
          element.toggleClass('not-click');
        }
      });

      element.bind('mouseleave', function() {
        element.removeClass('not-click');
      });

      scope.$on('$destroy', function() {
        element.unbind('click');
        element.unbind('mouseenter');
        element.unbind('mouseleave');
      });
    },
    controller: ['$window', '$scope', function($window, $scope) {
      this.triggerLink = $scope.triggerLink;
    }]
  };
}])
.directive('topBarDropdown', ['$compile', function($compile) {
  return {
    scope: {},
    require: ['^topBar', '^hasDropdown'],
    restrict: 'A',
    replace: true,
    templateUrl: 'template/topbar/top-bar-dropdown.html',
    transclude: true,
    link: function(scope, element, attrs, ctrls) {
      var topBar = ctrls[0];
      var hasDropdown = ctrls[1];
      var $link = angular.element(hasDropdown.triggerLink);
      var url = $link.attr('href');
      var $titleLi;

      scope.linkText = $link.text();

      scope.back = function(event) {
        topBar.back(event);
      };

      // Add back link
      if (topBar.settings.customBackText) {
        scope.backText = topBar.settings.backText;
      } else {
        scope.backText = '&laquo; ' + $link.html();
      }

      if (topBar.settings.mobileShowParentLink && url && url.length > 1) {
        $titleLi = angular.element('<li class="title back js-generated">' +
            '<h5><a href="#" ng-click="back($event);">{{backText}}</a></h5></li>' +
            '<li><a class="parent-link js-generated" href="' +
            url + '">{{linkText}}</a></li>');
      } else {
        $titleLi = angular.element('<li class="title back js-generated">' +
            '<h5><a href="" ng-click="back($event);">{{backText}}</a></h5></li>');
      }

      $compile($titleLi)(scope);
      element.prepend($titleLi);
    }
  };
}]);

angular.module( 'mm.foundation.tour', [ 'mm.foundation.position', 'mm.foundation.tooltip' ] )

.service( '$tour', [ '$window', function ( $window ) {
  var currentIndex = getStoredCurrentStep();
  var ended = false;
  var steps = {};

  function getStoredCurrentStep() {
    try {
      return parseInt( $window.localStorage.getItem( 'mm.tour.step' ), 10 );
    } catch(e) {
      if (e.name !== "SecurityError") {
        throw e;
      }
    }
  }

  function storeCurrentStep() {
    try {
      $window.localStorage.setItem( 'mm.tour.step', currentIndex );
    } catch(e) {
      if (e.name !== "SecurityError") {
        throw e;
      }
    }
  }

  function setCurrentStep(step) {
    currentIndex = step;
    storeCurrentStep();
  }

  this.add = function ( index, attrs ) {
    steps[ index ] = attrs;
  };

  this.has = function ( index ) {
    return !!steps[ index ];
  };

  this.isActive = function () {
    return currentIndex > 0;
  };

  this.current = function ( index ) {
    if ( index ) {
      setCurrentStep( currentIndex );
    } else {
      return currentIndex;
    }
  };

  this.start = function () {
    setCurrentStep( 1 );
  };

  this.next = function () {
    setCurrentStep( currentIndex + 1 );
  };

  this.end = function () {
    setCurrentStep( 0 );
  };
}])

.directive( 'stepTextPopup', ['$tour', function ( $tour ) {
  return {
    restrict: 'EA',
    replace: true,
    scope: { title: '@', content: '@', placement: '@', animation: '&', isOpen: '&' },
    templateUrl: 'template/tour/tour.html',
    link: function (scope, element) {
      scope.isLastStep = function () {
        return !$tour.has( $tour.current() + 1 );
      };

      scope.endTour = function () {
        element.remove();
        $tour.end();
      };

      scope.nextStep = function () {
        element.remove();
        $tour.next();
      };

      scope.$on('$locationChangeSuccess', scope.endTour);
    }
  };
}])

.directive( 'stepText', [ '$position', '$tooltip', '$tour', '$window', function ( $position, $tooltip, $tour, $window ) {
  function isElementInViewport( element ) {
    var rect = element[0].getBoundingClientRect();

    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= ($window.innerHeight - 80) &&
      rect.right <= $window.innerWidth
    );
  }

  function show( scope, element, attrs ) {
    var index = parseInt( attrs.stepIndex, 10);

    if ( $tour.isActive() && index ) {
      $tour.add( index, attrs );

      if ( index === $tour.current() ) {
        if ( !isElementInViewport( element ) ) {
          var offset = $position.offset( element );
          $window.scrollTo( 0, offset.top - $window.innerHeight / 2 );
        }

        return true;
      }
    }

    return false;
  }

  return $tooltip( 'stepText', 'step', show );
}]);

angular.module('mm.foundation.typeahead', ['mm.foundation.position', 'mm.foundation.bindHtml'])

/**
 * A helper service that can parse typeahead's syntax (string provided by users)
 * Extracted to a separate service for ease of unit testing
 */
  .factory('typeaheadParser', ['$parse', function ($parse) {

  //                      00000111000000000000022200000000000000003333333333333330000000000044000
  var TYPEAHEAD_REGEXP = /^\s*(.*?)(?:\s+as\s+(.*?))?\s+for\s+(?:([\$\w][\$\w\d]*))\s+in\s+(.*)$/;

  return {
    parse:function (input) {

      var match = input.match(TYPEAHEAD_REGEXP);
      if (!match) {
        throw new Error(
          "Expected typeahead specification in form of '_modelValue_ (as _label_)? for _item_ in _collection_'" +
            " but got '" + input + "'.");
      }

      return {
        itemName:match[3],
        source:$parse(match[4]),
        viewMapper:$parse(match[2] || match[1]),
        modelMapper:$parse(match[1])
      };
    }
  };
}])

  .directive('typeahead', ['$compile', '$parse', '$q', '$timeout', '$document', '$position', 'typeaheadParser',
    function ($compile, $parse, $q, $timeout, $document, $position, typeaheadParser) {

  var HOT_KEYS = [9, 13, 27, 38, 40];

  return {
    require:'ngModel',
    link:function (originalScope, element, attrs, modelCtrl) {

      //SUPPORTED ATTRIBUTES (OPTIONS)

      //minimal no of characters that needs to be entered before typeahead kicks-in
      var minSearch = originalScope.$eval(attrs.typeaheadMinLength) || 1;

      //minimal wait time after last character typed before typehead kicks-in
      var waitTime = originalScope.$eval(attrs.typeaheadWaitMs) || 0;

      //should it restrict model values to the ones selected from the popup only?
      var isEditable = originalScope.$eval(attrs.typeaheadEditable) !== false;

      //binding to a variable that indicates if matches are being retrieved asynchronously
      var isLoadingSetter = $parse(attrs.typeaheadLoading).assign || angular.noop;

      //a callback executed when a match is selected
      var onSelectCallback = $parse(attrs.typeaheadOnSelect);

      var inputFormatter = attrs.typeaheadInputFormatter ? $parse(attrs.typeaheadInputFormatter) : undefined;

      var appendToBody =  attrs.typeaheadAppendToBody ? $parse(attrs.typeaheadAppendToBody) : false;

      //INTERNAL VARIABLES

      //model setter executed upon match selection
      var $setModelValue = $parse(attrs.ngModel).assign;

      //expressions used by typeahead
      var parserResult = typeaheadParser.parse(attrs.typeahead);

      var hasFocus;

      //pop-up element used to display matches
      var popUpEl = angular.element('<div typeahead-popup></div>');
      popUpEl.attr({
        matches: 'matches',
        active: 'activeIdx',
        select: 'select(activeIdx)',
        query: 'query',
        position: 'position'
      });
      //custom item template
      if (angular.isDefined(attrs.typeaheadTemplateUrl)) {
        popUpEl.attr('template-url', attrs.typeaheadTemplateUrl);
      }

      //create a child scope for the typeahead directive so we are not polluting original scope
      //with typeahead-specific data (matches, query etc.)
      var scope = originalScope.$new();
      originalScope.$on('$destroy', function(){
        scope.$destroy();
      });

      var resetMatches = function() {
        scope.matches = [];
        scope.activeIdx = -1;
      };

      var getMatchesAsync = function(inputValue) {

        var locals = {$viewValue: inputValue};
        isLoadingSetter(originalScope, true);
        $q.when(parserResult.source(originalScope, locals)).then(function(matches) {

          //it might happen that several async queries were in progress if a user were typing fast
          //but we are interested only in responses that correspond to the current view value
          if (inputValue === modelCtrl.$viewValue && hasFocus) {
            if (matches.length > 0) {

              scope.activeIdx = 0;
              scope.matches.length = 0;

              //transform labels
              for(var i=0; i<matches.length; i++) {
                locals[parserResult.itemName] = matches[i];
                scope.matches.push({
                  label: parserResult.viewMapper(scope, locals),
                  model: matches[i]
                });
              }

              scope.query = inputValue;
              //position pop-up with matches - we need to re-calculate its position each time we are opening a window
              //with matches as a pop-up might be absolute-positioned and position of an input might have changed on a page
              //due to other elements being rendered
              scope.position = appendToBody ? $position.offset(element) : $position.position(element);
              scope.position.top = scope.position.top + element.prop('offsetHeight');

            } else {
              resetMatches();
            }
          }
        }, function(){
          resetMatches();
        }).finally(function() {
          isLoadingSetter(originalScope, false);
        });
      };

      resetMatches();

      //we need to propagate user's query so we can higlight matches
      scope.query = undefined;

      //Declare the timeout promise var outside the function scope so that stacked calls can be cancelled later
      var timeoutPromise;

      //plug into $parsers pipeline to open a typeahead on view changes initiated from DOM
      //$parsers kick-in on all the changes coming from the view as well as manually triggered by $setViewValue
      modelCtrl.$parsers.unshift(function (inputValue) {

        if (inputValue && inputValue.length >= minSearch) {
          if (waitTime > 0) {
            if (timeoutPromise) {
              $timeout.cancel(timeoutPromise);//cancel previous timeout
            }
            timeoutPromise = $timeout(function () {
              getMatchesAsync(inputValue);
            }, waitTime);
          } else {
            getMatchesAsync(inputValue);
          }
        } else {
          isLoadingSetter(originalScope, false);
          resetMatches();
        }

        if (isEditable) {
          return inputValue;
        } else {
          if (!inputValue) {
            // Reset in case user had typed something previously.
            modelCtrl.$setValidity('editable', true);
            return inputValue;
          } else {
            modelCtrl.$setValidity('editable', false);
            return undefined;
          }
        }
      });

      modelCtrl.$formatters.push(function (modelValue) {

        var candidateViewValue, emptyViewValue;
        var locals = {};

        if (inputFormatter) {

          locals['$model'] = modelValue;
          return inputFormatter(originalScope, locals);

        } else {

          //it might happen that we don't have enough info to properly render input value
          //we need to check for this situation and simply return model value if we can't apply custom formatting
          locals[parserResult.itemName] = modelValue;
          candidateViewValue = parserResult.viewMapper(originalScope, locals);
          locals[parserResult.itemName] = undefined;
          emptyViewValue = parserResult.viewMapper(originalScope, locals);

          return candidateViewValue!== emptyViewValue ? candidateViewValue : modelValue;
        }
      });

      scope.select = function (activeIdx) {
        //called from within the $digest() cycle
        var locals = {};
        var model, item;

        locals[parserResult.itemName] = item = scope.matches[activeIdx].model;
        model = parserResult.modelMapper(originalScope, locals);
        $setModelValue(originalScope, model);
        modelCtrl.$setValidity('editable', true);

        onSelectCallback(originalScope, {
          $item: item,
          $model: model,
          $label: parserResult.viewMapper(originalScope, locals)
        });

        resetMatches();

        //return focus to the input element if a mach was selected via a mouse click event
        element[0].focus();
      };

      //bind keyboard events: arrows up(38) / down(40), enter(13) and tab(9), esc(27)
      element.bind('keydown', function (evt) {

        //typeahead is open and an "interesting" key was pressed
        if (scope.matches.length === 0 || HOT_KEYS.indexOf(evt.which) === -1) {
          return;
        }

        evt.preventDefault();

        if (evt.which === 40) {
          scope.activeIdx = (scope.activeIdx + 1) % scope.matches.length;
          scope.$digest();

        } else if (evt.which === 38) {
          scope.activeIdx = (scope.activeIdx ? scope.activeIdx : scope.matches.length) - 1;
          scope.$digest();

        } else if (evt.which === 13 || evt.which === 9) {
          scope.$apply(function () {
            scope.select(scope.activeIdx);
          });

        } else if (evt.which === 27) {
          evt.stopPropagation();

          resetMatches();
          scope.$digest();
        }
      });

      element.bind('blur', function (evt) {
        hasFocus = false;
      });

      element.bind('focus', function (evt) {
        hasFocus = true;
      });

      // Keep reference to click handler to unbind it.
      var dismissClickHandler = function (evt) {
        if (element[0] !== evt.target) {
          resetMatches();
          scope.$digest();
        }
      };

      $document.bind('click', dismissClickHandler);

      originalScope.$on('$destroy', function(){
        $document.unbind('click', dismissClickHandler);
      });

      var $popup = $compile(popUpEl)(scope);
      if ( appendToBody ) {
        $document.find('body').append($popup);
      } else {
        element.after($popup);
      }
    }
  };

}])

  .directive('typeaheadPopup', function () {
    return {
      restrict:'EA',
      scope:{
        matches:'=',
        query:'=',
        active:'=',
        position:'=',
        select:'&'
      },
      replace:true,
      templateUrl:'template/typeahead/typeahead-popup.html',
      link:function (scope, element, attrs) {

        scope.templateUrl = attrs.templateUrl;

        scope.isOpen = function () {
          return scope.matches.length > 0;
        };

        scope.isActive = function (matchIdx) {
          return scope.active == matchIdx;
        };

        scope.selectActive = function (matchIdx) {
          scope.active = matchIdx;
        };

        scope.selectMatch = function (activeIdx) {
          scope.select({activeIdx:activeIdx});
        };
      }
    };
  })

  .directive('typeaheadMatch', ['$http', '$templateCache', '$compile', '$parse', function ($http, $templateCache, $compile, $parse) {
    return {
      restrict:'EA',
      scope:{
        index:'=',
        match:'=',
        query:'='
      },
      link:function (scope, element, attrs) {
        var tplUrl = $parse(attrs.templateUrl)(scope.$parent) || 'template/typeahead/typeahead-match.html';
        $http.get(tplUrl, {cache: $templateCache}).success(function(tplContent){
           element.replaceWith($compile(tplContent.trim())(scope));
        });
      }
    };
  }])

  .filter('typeaheadHighlight', function() {

    function escapeRegexp(queryToEscape) {
      return queryToEscape.replace(/([.?*+^$[\]\\(){}|-])/g, "\\$1");
    }

    return function(matchItem, query) {
      return query ? matchItem.replace(new RegExp(escapeRegexp(query), 'gi'), '<strong>$&</strong>') : matchItem;
    };
  });

//This is the main API service which connects to the MicrositeAPI
//The API base URL and the languageID are global variables and are defined in /app.js
(function () {
    'use strict';

    angular.module('services.onboard', ['ngCookies'])
     .factory('onboard', ['$http','$cookieStore', '$location', onboard ]);

    function onboard($http, $cookieStore, $location) {
//        var getAllLanguages = function () {
//            var api_url = api_base + "/localisation/languages";
//            return $http.get(api_url, { cache: false})
//              .then(function (response) {
//                  return response.data;
//              });
//        };
        var url;
        var currentlabel = [{
              onboardName:"_onboard"
        }]; 
    
//        console.log("currentlabel Start", currentlabel);
    
       
        

       
//        console.log("currentlabel Start" + currentlabel);

        var getOnboardList= function () {
            var onboardData = [
          {  id:0, name: "_movies", link:"app.movies.list"},
          {  id:1,name: "_tv",link:"app.tvs.list" }
//          {  id:2, name: "_audios",link:"app.audios.list" }
        ];
         return  onboardData ;
     };
  
  
 
     
         var setCurrentLabel= function (onboardID, onboardName) {
//              console.log("onboardID inside service" + onboardID);
//              console.log("onboardName inside service" + onboardName);
            
              
               currentlabel = [{
                   id: onboardID,
                   onboardName:onboardName
              }];
          
          
//           console.log("currentlabel get", currentlabel);
          return currentlabel;
       
         
     };
   
//        var getCurrentLabel= function () {
//            console.log("currentlabel outside", currentlabel);
//            return currentlabel;
//     };
       
      
          var getCurrentLabel= function () {
              
               url = $location.url();
               var urlnew   =  url.substring(1);
//               console.log("urlnew:" +  urlnew);
                var label = '_' + urlnew;
//                console.log("label:" +  label);
                
               if(label == '_'){ 
               currentlabel= [{onboardName:"_onboard"}];
               }else{
                   
                   if(label.indexOf('?') > -1)
                    {
                        
                    var labelCut =  label.substring(0, label.indexOf('?')); 
                       currentlabel= [{onboardName:labelCut}];
                      
                    }else{
                        
                      currentlabel= [{onboardName:label}];
                    } 
                        
               };
               
//               console.log("currentlabel",currentlabel);
               
//               console.log(currentlabel);
               
            return currentlabel; 
     };
         
        return {
            
            getOnboardList: getOnboardList,
            setCurrentLabel:setCurrentLabel,
            getCurrentLabel:getCurrentLabel
        };

    };
}());


//              url = $location.url();
//               var urltemp   =  url.substring(1);
//               
////               var urlnew = urltemp.substring(0, urltemp.indexOf('?')); 
//               console.log("urlnew:" +  urlnew );
//               
//               var label = '_' + urlnew ;
//               currentlabel= [{onboardName:label}]
//               
//               console.log(label);
(function () {
    'use strict';

    angular.module('poolBear.api',[]).factory('bearApi',

                    ['$rootScope','$http','$q', '$firebaseAuth', '$firebaseObject','FIREBASE_URL']);

    function bearApi($rootScope, $http, $q , $firebaseAuth, $firebaseObject, FIREBASE_URL ) {

           var getPlayers = function () {

//            return $http.get('http://micrositeifd.azurewebsites.net/api/v1/1ddfe01a-2ced-4b5d-92ce-899738a8e95a/localisation/languages')
             return $http.get('http://gatherngo.tonicdigitalmedia.com/json/player.json')
//             return $http.get('../json/player.json')
                  .then(function (response) {

                  return response.data;           
              });
        };
        
            var getPlayersfireBase = function () {

            
             var userRef = new Firebase('https://thebear.firebaseio.com/users' );

             return $http.get(userRef)

                  .then(function (response) {


                  return response.data;           
              });
        };
        
        
        
        return {
        getPlayersfireBase:getPlayersfireBase ,    
        getPlayers: getPlayers        
        };


     }
      
}());



















(function () {
'use strict';

    angular.module('services.menu', [])
        
        .factory('menuService', function() {
    var showMenu = false;

    return {
        showMenu: showMenu,
        state: function() {
            return showMenu;
        },
        toggle: function() {
            showMenu = !showMenu;
            return showMenu;
        },
        close: function() {
            showMenu = false;
            return showMenu;
        },
        open: function() {
            showMenu = true;
            return showMenu;
        }
    };
});
}());
(function () {
'use strict';

  angular.module('poolBear.search', [])
  
  

}());
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
    
}).controller('SettingsCtrl',

           ['$scope', '$rootScope', 'Authentication', '$state','$location', '$firebaseArray','FIREBASE_URL', '$firebaseObject', '$firebaseAuth',

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


angular.module("themeConfig", [])
.constant("pool", "_poolBear")
.constant("languageID", " 221")
.constant("languageCode", "en")
.constant("deployPath", "/Volumes/Macintosh HD 2/dev/microsoft-staging/BearDeploy/")
.constant("deployDist", "/Volumes/Macintosh HD 2/dev/The-Bear/dist/")
.constant("themeData", ["'poolBear'","'footballBear'","'SquashBear'","'golfBear'","'cSBear'","'tennisBear'"])
.constant("ratingSystem", {"standard":"_standard","advanced":"_advanced","custom":"_custom"})
.constant("app", ["'firebase'","'ui.router'","'poolBear.login'","'poolBear.auth'","'poolBear.result'","'poolBear.settings'","'poolBear.actionmodal'","'poolBear.scoreMessage'","'poolBear.Message'","'poolBear.uploadFile'","'poolBear.Images'","'poolBear.Images'","'poolBear.uploadFileService'","'poolBear.search'","'poolBear.challenge'","'poolBear.group'","'poolBear.geo'","'poolBear.api'","'poolbear.confirmServices'","'services.menu'"]);

  'use strict';

angular.module( 'poolBear.actionmodal', ['ngAnimate'])
.directive('modal', function() {
  return {
    restrict: 'E',
    scope: {
      show: '='
    },
    replace: true, // Replace with the template below
    transclude: true, // we want to insert custom content inside the directive
    link: function(scope, element, attrs) {
      scope.hideModal = function() {
        scope.show = false;
      };
    },
    template: "<div class='ng-modal' ng-show='show'>"+
                "<div class='reveal-modal' ng-show='show'>"+
                  "<div ng-transclude></div>"+
                  "<a class='close-reveal-modal' ng-click='hideModal()'>&#215;</a>"+
                "</div>"+
                "<div class='reveal-modal-bg' ng-click='hideModal()'></div>"+
              "</div>"
  };
})

.controller('ActionCtrl', ['$scope', function($scope) {
                console.log('ActionCtrl LOADED');
  $scope.modalShown = false;
  $scope.toggleModal = function() {
      console.log('TOGGLE-MODEL FIRED');
    $scope.modalShown = !$scope.modalShown;
    
  };
}]);


































//
//angular.module('poolBear.actionmodal', ['ngAnimate'])
//.directive('modal', function() {
//  return {
//    restrict: 'E',
//    scope: {
//      show: '='
//    },
//    replace: true, // Replace with the template below
//    transclude: true, // we want to insert custom content inside the directive
//    link: function(scope, element, attrs) {
//      scope.hideModal = function() {
//        scope.show = false;
//      };
//    },
//    template: "<div class='ng-modal' ng-show='show'>"+
//                "<div class='reveal-modal' ng-show='show'>"+
//                  "<div ng-transclude></div>"+
//                  "<a class='close-reveal-modal' ng-click='hideModal()'>&#215;</a>"+
//                "</div>"+
//                "<div class='reveal-modal-bg' ng-click='hideModal()'></div>"+
//              "</div>"
//  };
//})
//
//.controller('ActionCtrl', ['$scope', function($scope) {
//  $scope.modalShown = false;
//  $scope.toggleModal = function() {
//    $scope.modalShown = !$scope.modalShown;
//  };
//}]);


angular.module("poolBear.Message", [])

        .controller('messageCtrl', function ($scope){
            
            console.log("messageController", $scope);
    
    
           $scope.messageInDev = {
               
               note:"developer"
           }
           
             $scope.messagePremium = {
               
               note:"premium"
           }
            

        })

        .directive('notavailable', function () {
          return{
             templateUrl: './components/directives/view/indevMessage.html',
              restrict: 'E',
              scope:{
                  name: '=',
                  name2: '='
              },
               
              controller: function($scope){
        
                  $scope.indevelopment =function( messageInDev){
                    
                   $scope.collapsed= ! $scope.collapsed;
                   $scope.collapsedp= ! $scope.collapsedp;
                  }
                   console.log("messageDirective", $scope);
              }
          }  
        }); 
angular.module("poolBear.PopMenu", [])

        .controller('PopMenuCtrl', function ($scope){
            
            console.log("messageController", $scope);
    
    
           $scope.messageInDev = {
               
               note:"developer"
           }
           
             $scope.messagePremium = {
               
               note:"premium"
           }
            

        })

        .directive('notavailable',  function () {
          return{
             templateUrl: './components/directives/view/indevMessage.html',
              restrict: 'E',
              scope:{
                  name: '=',
                  name2: '='
              },
               
              controller: function($scope){
        
                  $scope.indevelopment =function( messageInDev){
                    
                   $scope.collapsed= ! $scope.collapsed;
                   $scope.collapsedp= ! $scope.collapsedp;
                  }
                   console.log("messageDirective", $scope);
              }
          }  
        }); 
  'use strict';

angular.module( 'poolBear.scoreMessage', ['ngAnimate'])
.directive('modalscoreMessage', function() {
  return {
    restrict: 'E',
    scope: {
      show: '='
    },
    replace: true, // Replace with the template below
    transclude: true, // we want to insert custom content inside the directive
    link: function(scope, element, attrs) {
      scope.hideModal = function() {
        scope.show = false;
      };
    },
    template: "<div class='ng-modal' ng-show='show'>"+
                "<div class='reveal-modal' ng-show='show'>"+
                  "<div ng-transclude></div>"+
                  "<a class='close-reveal-modal' ng-click='hideModal()'>&#215;</a>"+
                "</div>"+
                "<div class='reveal-modal-bg' ng-click='hideModal()'></div>"+
              "</div>"
  };
})

.controller('ScoreMessageCtrl', ['$scope', function($scope) {
                console.log('ScoreMessageCtrl');
  $scope.modalShown = false;
  $scope.toggleModal = function() {
    $scope.modalShown = !$scope.modalShown;
    
  };
}]);


































//
//angular.module('poolBear.actionmodal', ['ngAnimate'])
//.directive('modal', function() {
//  return {
//    restrict: 'E',
//    scope: {
//      show: '='
//    },
//    replace: true, // Replace with the template below
//    transclude: true, // we want to insert custom content inside the directive
//    link: function(scope, element, attrs) {
//      scope.hideModal = function() {
//        scope.show = false;
//      };
//    },
//    template: "<div class='ng-modal' ng-show='show'>"+
//                "<div class='reveal-modal' ng-show='show'>"+
//                  "<div ng-transclude></div>"+
//                  "<a class='close-reveal-modal' ng-click='hideModal()'>&#215;</a>"+
//                "</div>"+
//                "<div class='reveal-modal-bg' ng-click='hideModal()'></div>"+
//              "</div>"
//  };
//})
//
//.controller('ActionCtrl', ['$scope', function($scope) {
//  $scope.modalShown = false;
//  $scope.toggleModal = function() {
//    $scope.modalShown = !$scope.modalShown;
//  };
//}]);


  'use strict';

angular.module( 'poolBear.uploadFile', [])
    .directive('fileModel', ['$parse', function ($parse) {
      return {
          restrict: 'A',
          link: function(scope, element, attrs) {
              var model = $parse(attrs.fileModel);
              var modelSetter = model.assign;

              element.bind('change', function(){
                  scope.$apply(function(){
                      modelSetter(scope, element[0].files[0]);
                  });
              });
          }
      };
  }]);


































//
//angular.module('poolBear.actionmodal', ['ngAnimate'])
//.directive('modal', function() {
//  return {
//    restrict: 'E',
//    scope: {
//      show: '='
//    },
//    replace: true, // Replace with the template below
//    transclude: true, // we want to insert custom content inside the directive
//    link: function(scope, element, attrs) {
//      scope.hideModal = function() {
//        scope.show = false;
//      };
//    },
//    template: "<div class='ng-modal' ng-show='show'>"+
//                "<div class='reveal-modal' ng-show='show'>"+
//                  "<div ng-transclude></div>"+
//                  "<a class='close-reveal-modal' ng-click='hideModal()'>&#215;</a>"+
//                "</div>"+
//                "<div class='reveal-modal-bg' ng-click='hideModal()'></div>"+
//              "</div>"
//  };
//})
//
//.controller('ActionCtrl', ['$scope', function($scope) {
//  $scope.modalShown = false;
//  $scope.toggleModal = function() {
//    $scope.modalShown = !$scope.modalShown;
//  };
//}]);


(function () {
    angular.module('inflightApp.jcarousel', [])
        .directive('carousel', carousel)
        .controller('tvController', tvController)
        .controller('movieController', movieController)

    function carousel() {
        return {
            restrict: 'A',
            replace: true,
            transclude: false,
            scope: {
                images: "="
            },




            template:
            '<div class="jcarousel-wrapper">' +
            '<div class="jcarousel">' +
            '<div class="menu-item">' +
            '<ul>' +
            '<li ng-repeat="img in images">' +
            '<div class="menu-image">' +
            '<div class="poster">' +
            '<img src="{{img.contentMeta.poster_mage_600x900}}" ' +
            'ui-sref="app.menu" style="cursor:pointer; max-width:300px;"/>' +
            '<img src="{{img.contentMeta.tv_poster_600x900}}" ' +
            'ui-sref="app.menu" style="cursor:pointer; max-width:300px;"/>' +
            '</div>' +
            '</div>' +
            '<h2>{{img.name}}</h2>' +
            '</li>' +
            '</ul>' +
            '</div>' +
            '</div>' +
            '<a href="javascript:void(0)" class="jcarousel-control-prev">&lsaquo;</a>' +
            '<a href="javascript:void(0)" class="jcarousel-control-next">&rsaquo;</a>' +
            '</div>',




            link: function link(scope, element, attrs) {
                var container = $(element);
                var carousel = container.children('.jcarousel');
                 
                carousel.jcarousel({
                    wrap: 'circular'
                });

                scope.$watch(attrs.images, function (value) {
                    carousel.jcarousel('reload');
                });

                container.find('.jcarousel-control-prev')
                    .jcarouselControl({
                    target: '-=1'
                });

                container.find('.jcarousel-control-next')
                    .jcarouselControl({
                    target: '+=1'
                });
            }
        };
    }



    function tvController($scope, micrositeApi, selector) {
        console.log("TVCrtl Fired");

        var onTvSuccess = function (data) {
            data =_.filter(data, function(item){
                return item.contentMeta._highlight === "True";
            });
            console.log("data TV" ,data);
            $scope.tvs= data;
            console.log("$scope" ,$scope);
        }

        micrositeApi.getAllContentItemsByType("tv").then(onTvSuccess);

    }

    function movieController($scope, micrositeApi, selector) {
        console.log("MovieCTRL Fired" );
        var onMovieSuccess = function (data) {
            data = _.filter(data, function (item) {
                return item.contentMeta._highlights === "True";
            });
            console.log("data Movies", data);
            $scope.movies = data;
            // console.log("$scope" ,$scope);
        }
        micrositeApi.getAllContentItemsByType("movies").then(onMovieSuccess);
    }

    function audioController($scope, micrositeApi, selector) {

        console.log("AudioCTRL Fired" );
        var onAudioSuccess = function (data) {
            data = _.filter(data, function (item) {
                return item.contentMeta._highlights === "True";
            });
            console.log("data Audio ", data);
            $scope.audio = data;
            // console.log("$scope" ,$scope);
        }
        micrositeApi.getAllContentItemsByType("audio").then(onAudioSuccess);
    }



})();

  'use strict';

angular.module( 'poolBear.uploadFileService', [])
    .service('fileUpload', ['$http', function ($http) {
        this.uploadFileToUrl = function(file, uploadUrl){

            console.log("file" , file);
            console.log(" uploadUrl" +  uploadUrl);
            var fd = new FormData();
            fd.append('file', file);
            $http.post(uploadUrl, fd, {
                transformRequest: angular.identity,
                headers: {'Content-Type': undefined}
            })
        //         .success(function(){
        //         })
        //         .error(function(){
        //         });
        }
    }]);

































//
//angular.module('poolBear.actionmodal', ['ngAnimate'])
//.directive('modal', function() {
//  return {
//    restrict: 'E',
//    scope: {
//      show: '='
//    },
//    replace: true, // Replace with the template below
//    transclude: true, // we want to insert custom content inside the directive
//    link: function(scope, element, attrs) {
//      scope.hideModal = function() {
//        scope.show = false;
//      };
//    },
//    template: "<div class='ng-modal' ng-show='show'>"+
//                "<div class='reveal-modal' ng-show='show'>"+
//                  "<div ng-transclude></div>"+
//                  "<a class='close-reveal-modal' ng-click='hideModal()'>&#215;</a>"+
//                "</div>"+
//                "<div class='reveal-modal-bg' ng-click='hideModal()'></div>"+
//              "</div>"
//  };
//})
//
//.controller('ActionCtrl', ['$scope', function($scope) {
//  $scope.modalShown = false;
//  $scope.toggleModal = function() {
//    $scope.modalShown = !$scope.modalShown;
//  };
//}]);


//This service store the last selected items
(function () {
    'use strict';

    angular.module('poolbear.confirmServices', [])
        .factory('confirmScoreService', ['$rootScope', 'FIREBASE_URL', confirmScoreService]);
    function confirmScoreService($rootScope, FIREBASE_URL) {

        // TO DO
        // create a result record base on root


        // CONFIRM SCORE STARTED
        var confirmScore = function (key, note, currentUserId) {
            console.log("CONFIRM-SCORE- FIRED");
            console.log("key ", key);
            console.log("note ", note);
            console.log("currentUserId", currentUserId);


            //USER UPDATE VARIABLE
            var currentUserDetails;   //Current user ref details
            var newUserValueObject = {}; //New user values

            //Player Variable
            var currentPlayerDetails;  //Main player ref details
            var newPlayerValueObject = {};
            //USER UPDATE VARIABLE END


            //******USER UPDATES START****
            // UPDATE POOL USER VALUE START
            // TO DO - Set up variable for each bear
            var userRef = new Firebase(FIREBASE_URL + 'bears/poolbear/users/' + currentUserId);
            userRef.once('value', function (snapshot) {

                currentUserDetails = snapshot.val();
                var totalNoGames = note.notificationWinsRecieve + note.notificationWinsPost;
                newUserValueObject = {
                    newWinValueUser: currentUserDetails.wins + note.notificationWinsPost,
                    newLostValueUser: currentUserDetails.lost + totalNoGames - note.notificationWinsPost,
                    newPointsValueUser: currentUserDetails.points + 10
                }

                console.log("newUserValueObject" , newUserValueObject);

                if (snapshot.val() === null) {
                    console.log("Snap Shot = null");
                } else {


                    snapshot.ref().update({
                        "wins": newUserValueObject.newWinValueUser,
                        "lost": newUserValueObject.newLostValueUser,
                        "point": newUserValueObject.newPointsValueUser

                    });
                    console.log("UPDATE CURRENT USER VALUE  SUCCESS");
                }
            });// *** UPDATE POOL USER VALUES END*****


            // UPDATE POOL PLAYER VALUE START
            var playerRef = new Firebase(FIREBASE_URL + 'bears/poolbear/users/' + note.playerPostUserId);
            playerRef.once("value", function (snapshot) {
                currentPlayerDetails = snapshot.val();
                var totalNoGames = note.notificationWinsRecieve + note.notificationWinsPost;
                var newPointsValuePlayer = currentPlayerDetails.points + 5;
                newPlayerValueObject = {
                    newWinValuePlayer: currentPlayerDetails.wins + note.notificationWinsRecieve,
                    newLostValuePlayer: currentPlayerDetails.lost + totalNoGames - note.notificationWinsRecieve,
                    totalNoGames: note.notificationWinsRecieve + note.notificationWinsPost,
                    newPointsValuePlayer: currentPlayerDetails.points + 10
                }

                if (snapshot.val() === null) {
                    console.log("Snap Shot = null");
                } else {
                    snapshot.ref().update({"wins": newPlayerValueObject.newWinValuePlayer});
                    console.log("UPDATE CURRENT PLAYER VALUE  SUCCESS");
                }

            })// UPDATE POOL PLAYER VALUE END
            //******USER UPDATES END****


            // RESULT  START
            //RESULT UPDATE VARIABLE
            var currentUserResultDetails;
            var currentPlayerResultDetails;
            var confirmedResultObject; //selected notification


            //******USER UPDATE RESULT RECORD START ****
            var userResultRef = new Firebase(FIREBASE_URL + 'bears/poolbear/result/' + currentUserId + '/' + note.playerPostUserId);
            userResultRef.once("value", function (snapshot) {
                var userInfo;
                var resultType;
                currentUserResultDetails = snapshot.val();

                try {

                    console.log("UPDATE  RESULTS EXIT OBJECT");
                    resultType = "update";
                    userInfo = {
                        refid: note.playerPostUserId,
                        playerWins: note.notificationWinsPost + currentUserResultDetails.playerWins,
                        UserWins: note.notificationWinsRecieve + currentUserResultDetails.UserWins,
                        date: Firebase.ServerValue.TIMESTAMP
                    };

                } catch (err) {
                    resultType = "new";
                    userInfo = {
                        refid: note.playerPostUserId,
                        playerWins: note.notificationWinsPost + 0,
                        UserWins: note.notificationWinsRecieve + 0,
                        date: Firebase.ServerValue.TIMESTAMP
                    };
                }

                if (resultType === "new") {
                    userResultRef.set(userInfo);
                } else {
                    userResultRef.update(userInfo);
                }
            }, function (errorObject) {
                // console.log("The read failed: " + errorObject.code);
            });

            var playerResultRef = new Firebase(FIREBASE_URL + 'bears/poolbear/result/' + note.playerPostUserId + '/' + currentUserId);

            playerResultRef.once("value", function (snapshot) {
                var userInfo;
                var resultType;
                currentUserResultDetails = snapshot.val();

                try {

                    console.log("UPDATE  RESULTS EXIT OBJECT");
                    resultType = "update";
                    userInfo = {
                        refid: currentUserId,
                        playerWins: note.notificationWinsPost + currentUserResultDetails.playerWins,
                        UserWins: note.notificationWinsRecieve + currentUserResultDetails.UserWins,
                        date: Firebase.ServerValue.TIMESTAMP
                    };

                } catch (err) {
                    resultType = "new";
                    userInfo = {
                        refid: currentUserId,
                        playerWins: note.notificationWinsPost + 0,
                        UserWins: note.notificationWinsRecieve + 0,
                        date: Firebase.ServerValue.TIMESTAMP
                    };
                }

                if (resultType === "new") {
                    playerResultRef.set(userInfo);
                } else {
                    playerResultRef.update(userInfo);
                }
            }, function (errorObject) {
                // console.log("The read failed: " + errorObject.code);
            });


            var postId = note.playerPostUserId; //Get notification userid
            var result = note.resultID; //Get notification userid
            var resultIdref = note.$id; //Get notification userid
            var confirmMessageRef = new Firebase(FIREBASE_URL + 'bears/poolbear/notification/' + postId + "/" + result);
            var confirmMessageRefRecieved = new Firebase(FIREBASE_URL + 'bears/poolbear/notification/' + currentUserId + "/" + resultIdref);


//             $firebaseArray creates an empty array and placed using the reference create above

            confirmMessageRef.update({confirmShow: true});
            confirmMessageRefRecieved.update({confirmShow: true});


            if (confirmMessageRef.confirm === true && confirmMessageRefRecieved.confirm === true)
                $scope.confirm = true;

        }; // CONFIRM END

        return {
            confirmScore: confirmScore
        };


    };


}());

// FIREBASE DATA SERVICE START
(function () {
    'use strict';
    angular.module('poolBear.player')
        .factory('firebaseDataService', ['$rootScope', '$firebaseAuth', '$firebaseArray', '$firebaseObject', 'FIREBASE_URL',
            function ($rootScope, $firebaseAuth, $firebaseArray, $firebaseObject, FIREBASE_URL) {


            let theme = $rootScope.theme;
            if( $rootScope.theme === undefined || null){
                // theme=  window.localStorage.getItem("theme");
                theme="poolbear";
                theme= theme.toLowerCase();
            }else{
                console.log("DATASERVICEs THEME" );
                theme= theme.toLowerCase();
            }



                //GET-CURRENT-USER-RESULTS START
                var getCurrentUserResults = function (callback) {
                    var ref = new Firebase(FIREBASE_URL);
                    var auth = $firebaseAuth(ref);
                    auth.$onAuth(function (authUser) {if (authUser) {

                            var individualRecordUserRef = new Firebase(FIREBASE_URL + 'bears/' + theme + '/result/' + $rootScope.currentUser.$id);
                            var individualRecordUserArray = $firebaseArray(individualRecordUserRef);

                            callback(individualRecordUserArray);

                        } // User Authenticated
                    }); // on Auth
                };
                //GET-CURRENT-USER-RESULTS START





                //GET-PLAYERS
                var getPlayers = function (callback) {
                    const ref = new Firebase(FIREBASE_URL);
                    const auth = $firebaseAuth(ref);
                    auth.$onAuth(function (authUser) {if (authUser) {

                       console.log("$rootScope.theme" , $rootScope.theme);

                        var PlayerUserRefAll = new Firebase(FIREBASE_URL + 'bears/'+ theme +'/users');
                        console.log("PlayerUserRefAll " ,PlayerUserRefAll );
                        var poolBearResultsAllFilter = $firebaseArray(PlayerUserRefAll);

                        console.log("poolBearResultsAllFilter" , poolBearResultsAllFilter);

                        callback(poolBearResultsAllFilter);

                    } // User Authenticated
                    }); // on Auth
                };
                //GET-CURRENT-USER-RESULTS START




                return {

                    getCurrentUserResults: getCurrentUserResults,
                    getPlayers:getPlayers


                };

            }
        ]);
}());


//This service store the last selected items
(function () {
    'use strict';

    angular.module('poolbear.setServices', [])
     .factory('setScoreService', [ '$rootScope','FIREBASE_URL',
       function confirmScoreService($rootScope , FIREBASE_URL ) {
           console.log("SET-SCORE-SERVICE-FIRED");

           // TO DO
           // create a result record base on root

           // CONFIRM SCORE STARTED
         var confirmScore = function(key,note,currentUserId) {
             console.log("CONFIRM-SCORE- FIRED" );
             console.log("key ", key);
             console.log("note ", note);
             console.log("currentUserId", currentUserId);


             //USER UPDATE VARIABLE
             var currentUserDetails ;   //Current user ref details
             var newUserValueObject={}; //New user values

             //Player Variable
             var currentPlayerDetails;  //Main player ref details
             var newPlayerValueObject={};
             //USER UPDATE VARIABLE END



             //******USER UPDATES START****
             // UPDATE POOL USER VALUE START
             // TO DO - Set up variable for each bear
             var userRef = new Firebase(FIREBASE_URL + 'bears/poolbear/users/' + currentUserId );
             userRef.once('value', function(snapshot) {

                 currentUserDetails =snapshot.val();
                 var totalNoGames = note.notificationWinsRecieve + note.notificationWinsPost;
                 newUserValueObject  ={
                            newWinValueUser : currentUserDetails.wins + note.notificationWinsPost,
                            newLostValueUser : currentUserDetails.lost + totalNoGames - note.notificationWinsPost,
                            newPointsValueUser : currentUserDetails.points + 10}

                 if( snapshot.val() === null ) {console.log("Snap Shot = null");
                 } else {
                     snapshot.ref().update({
                         "wins":newUserValueObject.newWinValueUser,
                         "lost":newUserValueObject.newLostValueUser,
                         "point":newUserValueObject.newPointsValueUser

                     });
                     console.log("UPDATE CURRENT USER VALUE  SUCCESS" );
                 }
             });// *** UPDATE POOL USER VALUES END*****



             // UPDATE POOL PLAYER VALUE START
             var playerRef = new Firebase(FIREBASE_URL + 'bears/poolbear/users/' + note.playerPostUserId );
             playerRef.once("value", function(snapshot) {
                 currentPlayerDetails =snapshot.val();
                 var totalNoGames = note.notificationWinsRecieve + note.notificationWinsPost;
                 var newPointsValuePlayer = currentPlayerDetails.points + 5;
                 newPlayerValueObject ={
                          newWinValuePlayer:  currentPlayerDetails.wins + note.notificationWinsRecieve,
                          newLostValuePlayer:  currentPlayerDetails.lost + totalNoGames  - note.notificationWinsRecieve,
                          totalNoGames : note.notificationWinsRecieve + note.notificationWinsPost ,
                          newPointsValuePlayer : currentPlayerDetails.points + 10
                 }

                 if( snapshot.val() === null ) {
                     console.log("Snap Shot = null");
                 } else {
                     snapshot.ref().update({"wins": newPlayerValueObject.newWinValuePlayer });
                     console.log("UPDATE CURRENT PLAYER VALUE  SUCCESS" );
                 }

             })// UPDATE POOL PLAYER VALUE END
             //******USER UPDATES END****



            // RESULT  START
             //RESULT UPDATE VARIABLE
             var currentUserResultDetails;
             var currentPlayerResultDetails ;
             var confirmedResultObject ; //selected notification




             //******USER UPDATE RESULT RECORD START ****
             var userResultRef = new Firebase(FIREBASE_URL + 'bears/poolbear/result/' + currentUserId + '/'  + note.playerPostUserId);
             userResultRef.once("value", function(snapshot) {
                 var userInfo;
                 var resultType;
                 currentUserResultDetails =snapshot.val();

                 try{

                     console.log("UPDATE  RESULTS EXIT OBJECT" );
                     resultType = "update";
                      userInfo = {
                         refid:note.playerPostUserId,
                         playerWins: note.notificationWinsPost + currentUserResultDetails.playerWins ,
                         UserWins: note.notificationWinsRecieve + currentUserResultDetails.UserWins,
                         date: Firebase.ServerValue.TIMESTAMP
                     };

                 }catch (err){
                     resultType = "new";
                      userInfo = {
                         refid:note.playerPostUserId,
                         playerWins: note.notificationWinsPost + 0 ,
                         UserWins: note.notificationWinsRecieve + 0,
                         date: Firebase.ServerValue.TIMESTAMP
                     };
                 }

                if (resultType === "new" ){
                    userResultRef.set(userInfo );
                }else{
                    userResultRef.update(userInfo);
                }
             }, function (errorObject) {
                 // console.log("The read failed: " + errorObject.code);
             });

             var playerResultRef = new Firebase(FIREBASE_URL + 'bears/poolbear/result/' + note.playerPostUserId + '/' + currentUserId) ;

             playerResultRef.once("value", function(snapshot) {
                 var userInfo;
                 var resultType;
                 currentUserResultDetails =snapshot.val();

                 try{

                     console.log("UPDATE  RESULTS EXIT OBJECT" );
                     resultType = "update";
                     userInfo = {
                         refid:currentUserId,
                         playerWins: note.notificationWinsPost + currentUserResultDetails.playerWins ,
                         UserWins: note.notificationWinsRecieve + currentUserResultDetails.UserWins,
                         date: Firebase.ServerValue.TIMESTAMP
                     };

                 }catch (err){
                     resultType = "new";
                     userInfo = {
                         refid:currentUserId,
                         playerWins: note.notificationWinsPost + 0 ,
                         UserWins: note.notificationWinsRecieve + 0,
                         date: Firebase.ServerValue.TIMESTAMP
                     };
                 }

                 if (resultType === "new" ){
                     playerResultRef.set(userInfo );
                 }else{
                     playerResultRef.update(userInfo);
                 }
             }, function (errorObject) {
                 // console.log("The read failed: " + errorObject.code);
             });



             var postId =  note.playerPostUserId; //Get notification userid
             var result =  note.resultID; //Get notification userid
             var resultIdref = note.$id; //Get notification userid
             var confirmMessageRef = new Firebase(FIREBASE_URL + 'bears/poolbear/notification/' + postId + "/" + result);
             var confirmMessageRefRecieved = new Firebase(FIREBASE_URL + 'bears/poolbear/notification/' + currentUserId+ "/" + resultIdref);


//             $firebaseArray creates an empty array and placed using the reference create above

             confirmMessageRef.update({confirmShow:true});
             confirmMessageRefRecieved.update({confirmShow:true});


             if(confirmMessageRef.confirm ===true && confirmMessageRefRecieved.confirm ===true )
                 $scope.confirm = true;



         }; // CONFIRM END


           return {
               confirmScore:confirmScore
        };


    }]);


}());

(function () {
    "use strict";

    angular.module('poolBear.login').controller('RegistrationController',


        ['$scope', '$rootScope', 'Authentication', '$state', '$location', '$firebaseArray', 'FIREBASE_URL', '$firebaseObject', '$firebaseAuth', 'fileUpload', 'Upload', '$timeout', '$window',
            function ($scope, $rootScope, Authentication, $state, $location, $firebaseArray, FIREBASE_URL, $firebaseObject, $firebaseAuth, fileUpload, Upload, $timeout, $window) {

                // console.log("RegistrationController-CTRL-FIRED");
                // GET AUTH REFERENCE
                var ref = new Firebase(FIREBASE_URL);
                var auth = $firebaseAuth(ref);


                auth.$onAuth(function (authUser) {
                    if (authUser) {


                        var bearAddRef = new Firebase(FIREBASE_URL + 'users/' + $rootScope.currentUser.$id);
                        var UserRef = new Firebase(FIREBASE_URL + 'bears/poolbear/users/' + $rootScope.currentUser.$id);
                        var registerBearRef = new Firebase(FIREBASE_URL + 'bears/poolbear/users/' + $rootScope.currentUser.$id + '/bearList');

                        // var test = $firebaseObject(bearAddRef);

                        $scope.currentState = $state.current.name;
                        $scope.showPageHero = $location.path() === '/';
                        console.log("UserRef.userimage", UserRef);
                        $scope.profileUser = UserRef.userimage;

                        $scope.registeredBearsList = $firebaseObject(registerBearRef);
                        // console.log("registeredBearsList", $scope.registeredBearsList);


                        //CHECK IT IMAGE IS PRESENT


                        $firebaseObject(bearAddRef).$loaded(function (player) {
                            // console.log("bearAddRef.userimage" , player.userimage);

                            if (player.userimage === "noImages") {
                                $scope.imageUploadShow = true;
                                $scope.bearShow = false;
                            } else {
                                $scope.imageUploadShow = false;
                                $scope.bearShow = true;
                            }


                        });


                        $scope.detail = false;
                        $scope.hideDetail = function () {
                            $scope.detail = !$scope.detail;

                        }


                        $scope.checked = false;
                        $scope.bearArray = [];


                        $scope.bearsList = [
                            {id: 1, name: "poolBear"},
                            {id: 2, name: "runningBear"},
                            {id: 3, name: "footballBear"},
                            {id: 4, name: "squashBear"}
                        ];

                        $scope.chosebear = function () {
                            console.log("chosebears");

                        }

                        Array.prototype.remove = function () {
                            // console.log("REMOVE FIRED");
                            var what, a = arguments, L = a.length, ax;
                            while (L && this.length) {
                                what = a[--L];
                                while ((ax = this.indexOf(what)) !== -1) {
                                    this.splice(ax, 1);
                                }
                            }
                            return this;
                        };


                        //CHECK IN BEAR SELECT
                        $scope.isChecked = function (bear, checked) {
                            // console.log("checked", checked);
                            // console.log("bear", bear);
                            if (checked === true) {
                                $scope.bearArray.push(bear);
                                // console.log("$scope.bearArray " , $scope.bearArray);

                            } else {
                                $scope.bearArray.remove(bear);
                                // console.log("$scope.bearArray" , $scope.bearArray);
                            }
                        }

                        //BEAR LIST
                        var bearListObject = $firebaseObject(bearAddRef);
                        // console.log("  bearAddRef" ,   bearListObject);
                        $scope.bearLists = bearListObject;

                    } // User Authenticated
                }); // on Auth

                //ADD BEARS
                $scope.addbears = function () {
                    console.log("ADD-BEARS FIRED ");
                    var bearAddRef = new Firebase(FIREBASE_URL + 'users/' + $rootScope.currentUser.$id);
                    var poolBearUserRef = new Firebase(FIREBASE_URL + 'bears/poolbear/users');


                    var newBearArray = [];


                    // ADD BEAR REF START
                    bearAddRef.on('value', function (snap) {
                        console.log("snap", snap.val());

                        // TO DO
                        // note if stantment here to prevent add if theme is active
                        //  Add BOT INFORMATION


                        var mainPlayerInfo = snap.val();
                        mainPlayerInfo.wins = 0;
                        mainPlayerInfo.lost = 0;
                        mainPlayerInfo.points = 0;
                        mainPlayerInfo.cheats = 0;
                        mainPlayerInfo.declined = 0;
                        mainPlayerInfo.active = true;

                        console.log("mainPlayerInfo ", mainPlayerInfo);

                        poolBearUserRef.child($rootScope.currentUser.$id).set(mainPlayerInfo);
                    });

                    console.log("bearArray", $scope.bearArray);
                    console.log("$scope.registeredBearsList", $scope.registeredBearsList);


                    $scope.bearArray.forEach(function (item) {
                        newBearArray.push(item);
                    });
                    $scope.registeredBearsList.forEach(function (item) {
                        newBearArray.push(item);
                    })

                    console.log("newBearArray", newBearArray);

                    var uniqList = _.uniq(newBearArray);

                    bearAddRef.update({
                        bearList: uniqList
                    }); //user info
                }
                // ADD BEAR REF END //

                $scope.login = function () {
                    console.log("LOGIN FIRED");
                    Authentication.login($scope.user);

                }; //login

                $scope.logout = function () {
                    Authentication.logout();
                }; //logouti

                $scope.register = function () {
                    // console.log("REGISTER FIRED");
                    // console.log("$scope.user ", $scope.user);
                    Authentication.register($scope.user);
                }; // register


            }]) // Controller#


}());
(function () {

  angular.module('poolBear')
  .directive('tbLoginForm', function() {
    console.log("TB-LOGIN-FORM-DIR FIRED" );
    return {
      restrict: 'E',
      templateUrl:'components/login/directives/templates/login.html'
    };
  })

}());

(function () {
    'use strict';


    angular.module( 'poolBear')
.directive('ifLogo', function() {
  return {
      restrict: 'E',
      templateUrl:'components/login/directives/templates/logo.html'
  };
})

}());


(function(){
"use strict";

    angular.module("poolBear.player")
        .controller('SetScoreController',
            ['$scope', '$rootScope', '$firebaseAuth', '$firebaseArray', 'FIREBASE_URL', '$firebaseObject', '$stateParams', '$state', 'confirmScoreService',
                function ($scope, $rootScope, $firebaseAuth, $firebaseArray, FIREBASE_URL, $firebaseObject, $stateParams, $state, confirmScoreService) {


                    // CONNECT TO FIREBASE
                    let ref = new Firebase(FIREBASE_URL);
                    var auth = $firebaseAuth(ref);



                    auth.$onAuth(function (authUser) {
                        if (authUser) {

                            $scope.messageShow;
                            //****************************
                            // Notificatoin Post
                            // notificationRef is the location
                            // where the new Score Notifications
                            // are placed
                            //***********************************
                            //   showMessage();


                            var notificationRef = new Firebase(FIREBASE_URL + 'bears/poolbear/notification/' + $rootScope.currentUser.$id);
                            var notificationInfoPost = $firebaseArray(notificationRef);

                            $scope.notifications = notificationInfoPost; //      Loads Current Posts


                            // ENSURES THAT POSTS ARE LOADED ON THE PAGE LOAD
                            notificationInfoPost.$loaded().then(function (data) {console.log("$loaded fired" );
                                console.log("$loaded fired" );
                                $rootScope.howManyNotification = notificationInfoPost.length;

                            }); //Make sure meeting data is loaded

                            notificationInfoPost.$watch(function (data) {
                                console.log("$watch fired" );
                                $rootScope.howManyNotification = notificationInfoPost.length;
                            });


                            //*******************
                            // Notification Recieve: Below covers
                            // all the elements  required to populate
                            // the player recieving the notification
                            //*********************

                            //GETS PLAYER OBJECT START
                            var setScorePlayerUserId = $stateParams.id;
                            //create reference to get players detail
                            var PlayerRecieveRef = new Firebase(FIREBASE_URL + 'bears/poolbear/users/' +
                                setScorePlayerUserId);


                            var playerRecieveInfo = $firebaseObject(PlayerRecieveRef);
                            $scope.playerRecieveScore = playerRecieveInfo;
                            // $scope.currentBearObject= playerRecieveInfo;

                            var notificationRefRecieve = new Firebase(FIREBASE_URL + 'bears/poolbear/notification/' +
                                //player clicked here
                                setScorePlayerUserId);
                            //       $firebaseArray creates an empty array and placed using the reference create above
                            var notificationInfoRecieve = $firebaseArray(notificationRefRecieve);


                            notificationInfoRecieve.$loaded().then(function (data) {
                                $rootScope.howManyNotification = notificationInfoRecieve.length;

                            }); //Make sure meeting data is loaded

                            notificationInfoRecieve.$watch(function (data) {
                                $rootScope.howManyNotification = notificationInfoRecieve.length;

                            });


                            // The addNotification function pushes
                            // Alerts to both the
                            $scope.addNotification = function () {

                                $scope.playerPostFirstNameRef = $rootScope.currentUser.firstname;
                                $scope.playerPostLastNameRef = $rootScope.currentUser.lastname;


                                $scope.totalGame = $scope.notificationWinsPost + $scope.notificationWinsRecieve;


                                $scope.playerPostLost = $scope.totalGame - $scope.notificationWinsPost;
                                $scope.playerRecieveLost = $scope.totalGame - $scope.notificationWinsRecieve;


                                //        ADD nofitication to post
                                notificationInfoPost.$add({
                                    playerPostLost: $scope.playerPostLost,
                                    playerRecieveLost: $scope.playerRecieveLost,
                                    notificationWinsPost: $scope.notificationWinsPost,
                                    notificationWinsRecieve: $scope.notificationWinsRecieve,
                                    playerPostFirstName: $scope.playerPostFirstNameRef,
                                    playerPostlastName: $scope.playerPostLastNameRef,
                                    playerRecieveFirstName: playerRecieveInfo.firstname,
                                    playerRecieveLastName: playerRecieveInfo.lastname,
                                    postImage: $rootScope.currentUser.userimage,
                                    recieveImage: playerRecieveInfo.userimage,


                                    postTag: $rootScope.currentUser.tagline,
                                    recieveTag: playerRecieveInfo.tagline,

                                    playerRecieveUserId: setScorePlayerUserId,
                                    totalGame: $scope.totalGame,
                                    confirmed: true,
                                    collapse: false,
                                    sender: true,
                                    confirmShow: false,
                                    confirmHide: false,
                                    date: Firebase.ServerValue.TIMESTAMP


                                }).then(function (notificationRef) {

                                    //          passes the result key reference into the sendesrnotification
                                    var resultId = notificationRef.key();
                                    var result = new Firebase(FIREBASE_URL + 'bears/poolbear/notification/' +
                                        $rootScope.currentUser.$id + '/' + resultId);

                                    var notificationInfoPostresult = $firebaseArray(result);
                                    notificationInfoPostresult.$add({
                                        resultID: resultId
                                    });


                                    //         Add post to reciever
                                    notificationInfoRecieve.$add({
                                        resultID: resultId,
                                        playerPostLost: $scope.playerPostLost,
                                        playerRecieveLost: $scope.playerRecieveLost,
                                        notificationWinsPost: $scope.notificationWinsPost,
                                        notificationWinsRecieve: $scope.notificationWinsRecieve,
                                        playerRecieveFirstName: playerRecieveInfo.firstname,
                                        playerRecieveLastName: playerRecieveInfo.lastname,
                                        postImage: playerRecieveInfo.userimage,
                                        recieveImage: $rootScope.currentUser.userimage,


                                        postTag: playerRecieveInfo.tagline,
                                        recieveTag: $rootScope.currentUser.tagline,
                                        playerPostFirstName: $scope.playerPostFirstNameRef,
                                        playerPostlastName: $scope.playerPostLastNameRef,
                                        playerPostUserId: $rootScope.currentUser.$id,
                                        totalGame: $scope.totalGame,
                                        confirmed: false,
                                        collapse: false,
                                        sender: false,
                                        confirmShow: false,
                                        confirmHide: false,
                                        date: Firebase.ServerValue.TIMESTAMP


                                    }).then(function (notificationRefRecieve) {

                                        var resultIdref = notificationRefRecieve.key();
                                        var resultref = new Firebase(FIREBASE_URL + 'bears/poolbear/notification/' +
                                            setScorePlayerUserId + '/' + resultIdref);

                                        var notificationInfoPostresultref = $firebaseArray(resultref);
                                        notificationInfoPostresultref.$add({
                                            resultID: resultIdref
                                        })
                                    })

                                    $scope.notificationWinsPost = '';
                                    $scope.notificationWinsRecieve = '';

                                }); //promise

                            }; // addMeeting


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


}());



(function () {
    'use strict';

    angular.module('poolBear.player')
        .directive('ifLayout', function () {
            // console.log("IF-LAYOUT FIRED " );
            return {
                restrict: 'E',
                link: function(scope, element, attrs ) {

                    scope.layoutLocation = 'components/player/'+ attrs.theme +'/player.html'
                },
                template: '<div ng-include="layoutLocation"></div>'
            };
        })

}());






















(function () {
    'use strict';


    angular.module( 'poolBear.player')
.directive('tbModal', function() {
  return {
    restrict: 'E',
    templateUrl: "components/player/directive/templates/modal.html"
  };
})

}());


(function () {
    'use strict';


    angular.module( 'poolBear.player')
.directive('tbPlayerScore', function() {


  return {
    restrict: 'E',
    templateUrl: "components/player/directive/templates/tb-player-score.html",
      scope:true,
      controller:function () {



      },
      link: function (scope,element, attrs) {
        // console.log("scope" , scope);
        // console.log("element" , element);
        // console.log("attrs" , attrs);


      }
  };
})

}());


(function () {
    'use strict';


    angular.module( 'poolBear.player')
.directive('tbProfilesCard', function() {
  return {
    restrict: 'E',
    templateUrl: "components/player/directive/templates/profile.html",
      link:function (scope,element,attr) {

          
      }
  };
})

}());


(function () {
    'use strict';

    angular.module( 'poolBear')



.directive('angularRating', function() {
    return {
        replace: true,
        require: 'ngModel',
        controller:function ($scope) {


            $scope.maxValue = 10;

            $scope.fn = function () {
                if ($scope.rating.value === 10) {
                    $scope.callbackText = 'This text was changed through the callback function! ' +
                        'And it was validated to say "YOU\'RE AWESOME" ' +
                        'if the value was 10!';
                    return;
                }
                $scope.callbackText = 'The new rating is ' + $scope.rating.value + '. ' +
                    'This text was changed through a callback function! ' +
                    'Try hitting the max value star!';
            }

        },
        scope: {
            ngModel: '=',
            onChangeFunction: '&onChange'
        },
        template: '' +
        '<ul   ng-class="[listClass, decimal]">' +
        '<li ng-repeat="icon in icons track by $index" ' +
        'ng-style="getListItemStyle($index)" ' +
        'ng-click="setValue($index)" ' +
        'ng-mouseenter="paintIcons($index)" ' +
        'ng-mouseleave="resetIcons()" ' +
        '>' +
        '<i ng-class="getClass($index)" ng-style="getIconStyle($index)"></i>' +
        '</li>' +
        '</ul>',

        link: function(scope, element, attrs, controller) {
            // Settings

            console.log("attrs" ,attrs);

            scope.icons = new Array(+attrs.max || 10);
            scope.value = controller.$viewValue || (+attrs.defaultValue || 0);
            scope.size = +attrs.iconSize || 20;
            scope.spacing = +attrs.iconSpacing || 5;
            scope.listClass = 'angular-rating-icons';
            scope.readOnly = !(attrs.readonly === undefined);
            scope.decimal = !(attrs.decimal === undefined) ? 'angular-rating-icons-decimal' : undefined;


            console.log("attrs.max" ,attrs.max);
            console.log("scope.icons" ,scope.icons);
            console.log("scope.value" ,  scope.value);
            console.log("scope.size" , scope.size);
            console.log("scope.spacing" ,   scope.spacing);
            console.log("scope.listClass " , scope.listClass );
            console.log("scope.readOnly" , scope.readOnly);

            // Colors
            var colorBase = attrs.colorBase || 'black';
            var colorSelected = attrs.colorSelected || 'orange';
            var colorHover = attrs.colorHover || 'orange';

            // Different states
            var iconBase = attrs.iconBase || 'fa';
            var iconEmpty = attrs.iconEmpty || 'fa-star-o';
            var iconFull = attrs.iconFull || 'fa-star';
            var iconHover = attrs.iconHover || 'fa-star';

            // Model
            controller.$render = function() {

                console.log("controller.$viewValue " , controller.$viewValue );

                scope.value = controller.$viewValue === 0 ? 0 : controller.$viewValue || scope.value;

                // update model safeguard/fallback should it not be initialized before
                controller.$setViewValue(scope.value);
            };

            /**
             * Returns the appropriate class for the icon.
             * Changes if it's meant to be full or empty.
             * All indexes above the given value will be empty, all bellow or equal will be full.
             *
             * @param {int} index - the icon's index
             * @return {string} - the icon class to use
             */
            scope.getClass = function(index) {
                return iconBase + ' ' + (index >= scope.value ? iconEmpty : iconFull);
            };

            /**
             * Returns the appropriate style for the icon's color.
             * Changes if it's meant to be full or empty.
             * If it's decimal type, modifies the style to reduce the icon size by 2px, and move the odd index icons
             * half of their size minus 2, to the left.
             *
             * @param {int} index - the icon's index
             * @return {Object} - the icon style to use
             */
            scope.getIconStyle = function(index) {
                var css = {
                    color: index >= scope.value ? colorBase : colorSelected
                };

                if (!scope.decimal) {
                    return css;
                }

                css.height = scope.size - 2 + 'px';
                css.width = scope.size - 2 + 'px';
                css.left = index % 2 ? '-' + (scope.size - 2) / 2 + 'px' : '';

                return css;
            };

            /**
             * Returns the appropriate style fo the list item's font-size and padding-right.
             * If it's decimal type, modifies the style to reduce the height and width by 2 px, and the only the width
             * by half of that result. Also for every even index it removes the right padding.
             *
             * @param {int} index - the list item's index
             * @return {object} - the list item's style to use
             */
            scope.getListItemStyle = function(index) {
                var css = {
                    'font-size': scope.size + 'px',
                    'padding-right': index !== scope.icons.length - 1 ? scope.spacing + 'px' : '0'
                };

                if (!scope.decimal) {
                    return css;
                }

                css.height = scope.size - 2 + 'px';
                css.width = (scope.size - 2) / 2 + 'px';

                if (!(index % 2)) {
                    css['padding-right'] = '0';
                }

                return css;
            };

            /**
             * Doesn't run if set to readonly.
             * Sets the directive's scope value to the clicked icon plus 1.
             * List item's indexes go from 0 to 9, whilst real values should go from 1 to 10.
             * Sets the model's value to the directive's scope value.
             * Runs the onChangeFunction function.
             *
             * @param {int} index - the clicked icon's index
             */
            scope.setValue = function(index) {
                if (scope.readOnly) {
                    return;
                }

                controller.$setViewValue(scope.value = index + 1);
                scope.onChangeFunction();
            };

            /**
             * Runs the paintIcon function to paint the icons only up to the current scope value - 1,
             * since the indexes range from 0 to 9 but the real values range from 1 to 10.
             */
            scope.resetIcons = function() {
                scope.paintIcons(scope.value - 1, true);
            };

            /**
             * Doesn't run if set to readonly.
             * Changes the icon's classes accordingly to their index.
             * Cycles all the icons, and if the current index is smaller than the cycle number, it gives the icon the
             * empty class, otherwise gives it the hover class and sets the color to the hover color.
             * If reset is true, the above first case scenario also sets the color to the base color, and the second
             * adds the class full and paints with the selected color instead.
             *
             * @param {int} index - the clicked icon's index
             * @param {boolean} reset - if icon's paint should be reset
             */
            scope.paintIcons = function(index, reset) {
                if (scope.readOnly) {
                    return;
                }

                var items = element.find('li').find('i');
                for (var i = 0; i < items.length; i++) {
                    var icon = angular.element(items[i]);

                    if (index >= i) {
                        icon.removeClass(iconEmpty)
                            .addClass(reset ? iconFull : iconHover)
                            .css('color', reset ? colorSelected : colorHover);
                    } else {
                        icon.removeClass(iconFull)
                            .addClass(iconEmpty)
                            .css('color', reset ? colorBase : icon.css('color'));
                    }

                    if (reset && iconHover !== iconFull) {
                        icon.removeClass(iconHover);
                    }
                }
            };
        }
    };
});


}());
(function () {
    'use strict';


    angular.module( 'poolBear')
.directive('tbStatistic', function() {
  return {
    restrict: 'E',

    templateUrl: "components/player/directive/templates/statistic.html"
  };
})

}());


(function () {
    'use strict';


    angular.module( 'poolBear.result')
.directive('tbReceiver', function() {
  return {
      restrict: 'E',
      templateUrl: "components/result/directive/template/receiver.html"
  };
})

}());





(function () {
    'use strict';


    angular.module( 'poolBear.result')
.directive('tbSender', function() {
  return {
    restrict: 'E',
    templateUrl: "components/result/directive/template/sender.html"
  };
})

}());





(function () {
'use strict';

    angular.module('services.menu', [])

        .factory('menuService', function() {
    var showMenu = false;
   
       console.log("showMenu" + showMenu );
    return {
        showMenu: showMenu,
        state: function() {
            return showMenu;
        },
        toggle: function() {
            showMenu = !showMenu;
//             console.log("toggle");
            return showMenu;
        },
        close: function() {
            showMenu = false;
            return showMenu;
        },
        open: function() {
            showMenu = true;
            return showMenu;
        }
    };
});
}());