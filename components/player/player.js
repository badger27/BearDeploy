'use strict';
angular.module('poolBear.player', [

    'poolbear.confirmServices'
    

 
])
.config(function ($stateProvider) {

    $stateProvider 
      .state('app.player', {

       
          url: '/player',
          data: { title: 'played' },
          views: {
              'main': {
                  controller:'PlayerController',
                  templateUrl: 'components/player/player.html',
                  
                       //This code restricts access to logged in users only 
                     resolve: {
          currentAuth: function(Authentication) {
          return Authentication.requireAuth();
        } //current Auth
      } //resolve
                  
                  
                 
              }
          }
      })  .state('app.playersetscore', {
          url: '/player/setscore/:id',
          data: { title: 'Set Score' },
          views: {
              'main': {
                  
                  controller:'SetScoreController',
                  templateUrl: 'components/player/views/_setscore.html',
                  
                               //This code restricts access to logged in users only 
                     resolve: {
          currentAuth: function(Authentication) {
          return Authentication.requireAuth();
        } //current Auth
      } //resolve
                     
              
            }          
          }
      }).state('app.playerdetails', {
          url: '/player/detail/:id',
          data: { title: 'Details' },
          views: {
              'main': {
                  
                  controller:'DetailsCtrl',
                  templateUrl: 'components/player/views/_playerdetails.html'}          
          }
      })
}).controller('PlayerCtrl', function ( $scope, bearApi, $location, $window, confirmScoreService) {
            
       
//

    $scope.showPageHero = $location.path() === '/player';

    // console.log("notavailable", notavailable);
        
        //filter by category
    $scope.filterByDropdownFilter = function(filterId,filterName){
        
         $scope.filterSelection = "1";
        
        // set category in URL
        $location.search('catID', filterId);
        $location.search('cat', filterName);

        $scope.dropdownCurrentLabel=categoryName;
        var filteredMovies;
        
        if(categoryName=='A-Z'){
            //only sort A-Z
                filteredMovies =  $filter('orderBy')(allMovies, 'contentMeta.title'); 
        } else {
            //filter
                 filteredMovies = _.filter(allMovies, function(item){
                 return item.categoryID ==categoryID;
                })    
        }
        $scope.movies=filteredMovies;

    }
})
  .controller('SetScoreController',
  ['$scope', '$rootScope', '$firebaseAuth', '$firebaseArray', 'FIREBASE_URL', '$firebaseObject', '$stateParams', '$state', 'confirmScoreService',
  function($scope, $rootScope, $firebaseAuth, $firebaseArray, FIREBASE_URL, $firebaseObject, $stateParams, $state ,confirmScoreService) {

    var ref = new Firebase(FIREBASE_URL);
    var auth = $firebaseAuth(ref);


    auth.$onAuth(function(authUser) {
      if (authUser) {

          $scope.messageShow ;
        //****************************
        // Notificatoin Post
        // notificationRef is the location
        // where the new Score Notifications
        // are placed
        //***********************************
        //   showMessage();
        var notificationRef = new Firebase(FIREBASE_URL + 'bears/poolbear/notification/' +
          $rootScope.currentUser.$id );

//       $firebaseArray creates an empty array and placed using the reference create above
        var notificationInfoPost = $firebaseArray(notificationRef);



        $scope.notifications = notificationInfoPost; //      Loads Current Posts
        notificationInfoPost.$loaded().then(function(data) {
          $rootScope.howManyNotification = notificationInfoPost.length;


        }); //Make sure meeting data is loaded

        notificationInfoPost.$watch(function(data) {
          $rootScope.howManyNotification  = notificationInfoPost.length;
        });


        //*******************
        // Notification Recieve: Below covers
        // all the elements  required to populate
        // the player recieving the notification
        //*********************
          
        //get selected players userID from statw params
         var setScorePlayerUserId = $stateParams.id;



          // var notificationRefRecieveID = new Firebase(FIREBASE_URL + 'bears/poolbear/notification/' +
          //     setScorePlayerUserId);


         //create reference to get players detail
          var PlayerRecieveRef = new Firebase(FIREBASE_URL + 'bears/poolbear/users/' +
          setScorePlayerUserId );
          
         var playerRecieveInfo = $firebaseObject(PlayerRecieveRef);
         $scope.playerRecieveScore = playerRecieveInfo;


          // Reference to the recievers notification
        var notificationRefRecieve = new Firebase(FIREBASE_URL + 'bears/poolbear/notification/' +
          //player clicked here
          setScorePlayerUserId );
//       $firebaseArray creates an empty array and placed using the reference create above 
        var notificationInfoRecieve = $firebaseArray(notificationRefRecieve);
       
        
        notificationInfoRecieve.$loaded().then(function(data) {
          $rootScope.howManyNotification = notificationInfoRecieve.length;

        }); //Make sure meeting data is loaded

          notificationInfoRecieve.$watch(function(data) {
          $rootScope.howManyNotification  = notificationInfoRecieve.length;

        });
        

         
        // The addNotification function pushes
        // Alerts to both the 
        $scope.addNotification = function() {
            
         $scope.playerPostFirstNameRef = $rootScope.currentUser.firstname;
         $scope.playerPostLastNameRef = $rootScope.currentUser.lastname;


           $scope.totalGame= $scope.notificationWinsPost + $scope.notificationWinsRecieve;

           
           $scope.playerPostLost= $scope.totalGame - $scope.notificationWinsPost ;
           $scope.playerRecieveLost= $scope.totalGame - $scope.notificationWinsRecieve ;
           
         


//        ADD nofitication to post 
          notificationInfoPost.$add({
           playerPostLost: $scope.playerPostLost,
           playerRecieveLost: $scope.playerRecieveLost,
            notificationWinsPost: $scope.notificationWinsPost,
            notificationWinsRecieve: $scope.notificationWinsRecieve,
            playerPostFirstName: $scope.playerPostFirstNameRef,
            playerPostlastName: $scope.playerPostLastNameRef ,
            playerRecieveFirstName: playerRecieveInfo.firstname,
            playerRecieveLastName: playerRecieveInfo.lastname,
              recieveImage: playerRecieveInfo.userimage,
              postImage: playerRecieveInfo.userimage,
            playerRecieveUserId:setScorePlayerUserId,
            totalGame:$scope.totalGame,
            confirmed:true,
            collapse:false,
            sender:true,
            confirmShow:false,
              confirmHide:false,
            date: Firebase.ServerValue.TIMESTAMP


          }).then(function(notificationRef) {

//          passes the result key reference into the sendesrnotification
            var resultId = notificationRef.key();
            var result = new Firebase(FIREBASE_URL + 'bears/poolbear/notification/' +
            $rootScope.currentUser.$id + '/' + resultId );

           var notificationInfoPostresult = $firebaseArray(result);
              notificationInfoPostresult.$add({
              resultID: resultId
          });


     
//         Add post to reciever 
            notificationInfoRecieve.$add({
           resultID: resultId ,
           playerPostLost: $scope.playerPostLost,
           playerRecieveLost: $scope.playerRecieveLost,
            notificationWinsPost: $scope.notificationWinsPost,
            notificationWinsRecieve: $scope.notificationWinsRecieve,
            playerRecieveFirstName: playerRecieveInfo.firstname,
            playerRecieveLastName: playerRecieveInfo.lastname,
                postImage: playerRecieveInfo.userimage,
                recieveImage: playerRecieveInfo.userimage,
            playerPostFirstName: $scope.playerPostFirstNameRef,
            playerPostlastName: $scope.playerPostLastNameRef ,
            playerPostUserId:$rootScope.currentUser.$id,
            totalGame:$scope.totalGame,
            confirmed:false,
            collapse:false,
            sender:false,
            confirmShow:false,
                confirmHide:false,
            date: Firebase.ServerValue.TIMESTAMP


          }).then(function(notificationRefRecieve) {

             var resultIdref = notificationRefRecieve.key();
             var resultref = new Firebase(FIREBASE_URL + 'bears/poolbear/notification/' +
                 setScorePlayerUserId + '/' + resultIdref);

              var notificationInfoPostresultref = $firebaseArray(resultref);
              notificationInfoPostresultref.$add({
                  resultID: resultIdref
          })
            })

            $scope.notificationWinsPost='';
            $scope.notificationWinsRecieve='';

          }); //promise          
          
        }; // addMeeting



      $scope.confirmHide = function(key, note){
          var confirmHideRef = new Firebase(FIREBASE_URL + 'bears/poolbear/notification/' + $rootScope.currentUser.$id  + '/' +  note.$id);

          confirmHideRef.update({confirmHide:true});
          showMessage();
      }; //confirm Hide




       var showMessage = function (){
           notificationInfoPost.$loaded().then(function(data) {
               var noteTotal = notificationInfoPost.length;
               var hiddenNotes= _.filter(data, function(item){
                   return item.confirmHide == true;
               });
               var hiddenNotesTotal = hiddenNotes.length;

               if(hiddenNotesTotal === noteTotal ){
                   $scope.messageShow = true;


               }else {
                   $scope.messageShow = false;
               }

           }); //Make sure meeting data is loaded
       };

          showMessage();


      $scope.deleteMeeting = function(key) {
        console.log("key" + key  );
         notificationInfoPost.$remove(key);
        }; // deleteMeeting

        $scope.confirmedHide= true;

        $scope.confirmScoreTrigger = function(key,note ) {
            console.log("note " , note );
            console.log("CONFIRM-SCORE-TRIGGER FIRED" );
            confirmScoreService.confirmScore(key,note, $rootScope.currentUser.$id);
        }; // confirm



      } // User Authenticated
    }); // on Auth
}]) 

.controller('PlayerController', 
  ['$scope', '$rootScope', '$firebaseAuth', '$firebaseArray', '$firebaseObject','FIREBASE_URL',
  function($scope, $rootScope, $firebaseAuth, $firebaseArray,$firebaseObject, FIREBASE_URL) {
  console.log("Player$scope", $scope);     
  
    var ref = new Firebase(FIREBASE_URL);
    var auth = $firebaseAuth(ref);

    auth.$onAuth(function(authUser) {
      if (authUser) {
         
      
//       Create the list of filter categories 
         var playerFilterObject =[
           {"filterId": 1,
            "filterName": "RANK"},
           {"filterId": 2,
            "filterName": "PLAYED"}
          ];
//       Set the filters in the drop down 
         $scope.playerFilterDropdown = playerFilterObject ;

         console.log("$rootScope.currentUser.$id" , $rootScope.currentUser.$id);

         $scope.UserId = $rootScope.currentUser.$id ;
         

         var playerResult =[];
          var newRecord;

          var  currentUserRef= new Firebase(FIREBASE_URL + 'bears/poolbear/users/' +  $rootScope.currentUser.$id);


          $scope.currentBearObject=$firebaseObject(currentUserRef);

          console.log(" $scope.currentUserRef" ,  $scope.currentUserRef);

          var PlayerUserRefAll= new Firebase(FIREBASE_URL + 'bears/poolbear/users');
          var UserRef= new Firebase(FIREBASE_URL + 'bears/users');
          var poolBearResultsAllFilter=$firebaseArray(PlayerUserRefAll);



          var individualRecordUserRef= new Firebase(FIREBASE_URL + 'bears/poolbear/result/' + $rootScope.currentUser.$id);
          var individualRecordUserArray=$firebaseArray(individualRecordUserRef);

          console.log("poolBearResultsAllFilter," , poolBearResultsAllFilter);
          $scope.results = individualRecordUserArray;
          $scope.players = poolBearResultsAllFilter;
          $scope.profileImages = UserRef.userimage;




          // poolBearResultsAllFilter.$loaded()
          //     .then(function(){
          //         angular.forEach(poolBearResultsAllFilter, function(playerItem) {
          //
          //             individualRecordUserArray.$loaded().then(function () {
          //
          //               newRecord =  _.filter(individualRecordUserArray, function(resultItem) {
          //
          //                   console.log(resultItem.refid + " / " + playerItem.regUser);
          //
          //                     return resultItem.refid == playerItem.regUser  ;
          //
          //                 });
          //
          //             });
          //
          //
          //
          //
          //         })
          //     });
          //









            $scope.filterSet= 0;
         
         $scope.filterByDropdownFilter = function (filterID) {
                                    
         if(filterID === 1 ){
            console.log("Ranked Players Have been selected  "   +  filterID );
            $scope.filterSet= filterID;
                 //This code pull in all the players on the platform     
            PlayerUserRefAll= new Firebase(FIREBASE_URL + 'bears/poolbear/users');
            poolBearResultsAllFilter=$firebaseArray(PlayerUserRefAll);
            $scope.players = poolBearResultsAllFilter;
            console.log("PlayAll",$scope.players  );
            
            
         }else if (filterID === 2) {
             $scope.filterSet= filterID;
              console.log("Played Players Have been selected  "   +  filterID );
              //      This code pull in details on the user played details
         var PlayerPLayedRef = new Firebase(FIREBASE_URL + 'bears/poolbear/result/'  +  $rootScope.currentUser.$id );
         var poolBearResultsPlayedFilter = $firebaseArray(PlayerPLayedRef);            
              $scope.players = poolBearResultsPlayedFilter ;
              console.log("Played",$scope.players  );
             
              }
        };
          
        
     } // User Authenticated
    }); // on Auth
   
}]).controller('DetailsCtrl', 
  ['$scope', '$rootScope', '$firebaseAuth', '$firebaseObject', 'FIREBASE_URL', '$stateParams', '$state',
  function($scope, $rootScope, $firebaseAuth, $firebaseObject, FIREBASE_URL,  $stateParams ,$state) {
  
        var selectedDetailPlayer = $stateParams.id;

        console.log("selectedDetailPlayer" + selectedDetailPlayer);

            console.log('selectedDetailPlayer', selectedDetailPlayer );
//          PlayerRef is the location
//          where the new meetings are place
        var PlayerRef = new Firebase(FIREBASE_URL + 'bears/poolbear/users/' + selectedDetailPlayer   );
//        var currentUser = PlayerRef.child(selectedDetailPlayer);
//
        console.log('PlayerRef', PlayerRef );
//        console.log('currentUser', currentUser );

  //       $firebaseArray creates an empty array and placed using the reference create above
        var PlayerInfo = $firebaseObject(PlayerRef );
        $scope.player = PlayerInfo;
        console.log("PlayerInfo", PlayerInfo);
//        console.log("$scope.players", $scope.players);


   
}]);



