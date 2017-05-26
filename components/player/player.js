'use strict';
angular.module('poolBear.player', [
    

 
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
}).controller('PlayerCtrl', function ( $scope, bearApi, $location,$window) {
            
       
//

    $scope.showPageHero = $location.path() === '/player';

    console.log("notavailable", notavailable);
        
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
  ['$scope', '$rootScope', '$firebaseAuth', '$firebaseArray', 'FIREBASE_URL', '$firebaseObject', '$stateParams', '$state', 
  function($scope, $rootScope, $firebaseAuth, $firebaseArray, FIREBASE_URL, $firebaseObject, $stateParams, $state) {

    var ref = new Firebase(FIREBASE_URL);
    var auth = $firebaseAuth(ref);

    auth.$onAuth(function(authUser) {
      if (authUser) {
          
         
        //****************************
        // Notificatoin Post          
        // notificationRef is the location
        // where the new Score Notifications 
        // are placed
        //***********************************
        var notificationRef = new Firebase(FIREBASE_URL + 'bears/poolbear/notification/' +
          $rootScope.currentUser.$id );
//       $firebaseArray creates an empty array and placed using the reference create above 
        var notificationInfoPost = $firebaseArray(notificationRef);
         console.log("notificationInfoPost" + notificationInfoPost);
         

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
         console.log("setScorePlayerUserId " , setScorePlayerUserId );


          // var notificationRefRecieveID = new Firebase(FIREBASE_URL + 'bears/poolbear/notification/' +
          //     setScorePlayerUserId);


         //create reference to get players detail
          var PlayerRecieveRef = new Firebase(FIREBASE_URL + 'bears/poolbear/users/' +
          setScorePlayerUserId );
          
         var playerRecieveInfo = $firebaseObject(PlayerRecieveRef);
         $scope.playerRecieveScore = playerRecieveInfo;
         console.log('playerRecieveScore',$scope.playerRecieveScore );

          // Reference to the recievers notification
        var notificationRefRecieve = new Firebase(FIREBASE_URL + 'bears/poolbear/notification/' +
          //player clicked here
          setScorePlayerUserId );
//       $firebaseArray creates an empty array and placed using the reference create above 
        var notificationInfoRecieve = $firebaseArray(notificationRefRecieve);
       
        
        notificationInfoRecieve.$loaded().then(function(data) {
          $rootScope.howManyNotification = notificationInfoRecieve.length;
           console.log("howManyNotification_L" + $rootScope.howManyNotification);
        }); //Make sure meeting data is loaded

          notificationInfoRecieve.$watch(function(data) {
          $rootScope.howManyNotification  = notificationInfoRecieve.length;
           console.log("howManyNotification_W" +  $rootScope.howManyNotification );
        });
        
         console.log('notificationRefRecieve '+ notificationRefRecieve  );
         console.log('notificationInfoRecieve'+ notificationInfoRecieve );
         
         
        // The addNotification function pushes
        // Alerts to both the 
        $scope.addNotification = function() {
            
         $scope.playerPostFirstNameRef = $rootScope.currentUser.firstname;
         $scope.playerPostLastNameRef = $rootScope.currentUser.lastname;
         console.log( "  $scope.playerPostFirstNameRef " +   $scope.playerPostFirstNameRef  +   "$scope.playerPostLastNameRef " + $scope.playerPostLastNameRef );
          
          $scope.totalGame= $scope.notificationWinsPost + $scope.notificationWinsRecieve;
           console.log(" $scope.totalGame" +  $scope.totalGame);  
           
           $scope.playerPostLost= $scope.totalGame - $scope.notificationWinsPost ;
           $scope.playerRecieveLost= $scope.totalGame - $scope.notificationWinsRecieve ;
           
         
          console.log("addNotification" );
          
         
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
          console.log("confirmHideRef" + confirmHideRef);
          confirmHideRef.update({confirmHide:true});
      };


        $scope.deleteMeeting = function(key) {

        console.log("key" + key  );
         notificationInfoPost.$remove(key);
         //To do 
         //add decline To decline Varaible 
         //delete in to both places
        }; // deleteMeeting


        $scope.confirmedHide= true;

       
        $scope.confirmScore = function(key) {


            console.log("key" + key);

            // $scope.confirmShow = true;
             var currentUserDetails ;
             var confirmedResultObject ;

            //main user reference variable  controls global details
           var userRef = new Firebase(FIREBASE_URL + 'bears/poolbear/users/' + $rootScope.currentUser.$id );
            //get values from  the current users to get current win values
            userRef.on("value", function(snapshot) {
            console.log("snapshot.val()" + snapshot.val());
            currentUserDetails =snapshot.val();
            return currentUserDetails;

          }, function (errorObject) {
            console.log("The read failed: " + errorObject.code);
          });

          // Get confirmed user new wins and adds it to current wins
          notificationInfoPost.$loaded(function(data) {
            confirmedResultObject= data[key];

            // console.log("currentUserDetails ;"  , currentUserDetails.wins );
            // console.log("confirmedResultObject;" , confirmedResultObject.notificationWinsPost);

//            Checks if the confirmedResultObject is the sender or reciever of the notification
            if(confirmedResultObject.sender===true){
                var newWinValue=  currentUserDetails.wins + confirmedResultObject.notificationWinsRecieve;
            }else{
                var newWinValue=  currentUserDetails.wins + confirmedResultObject.notificationWinsPost;
            }

             console.log(newWinValue);
             userRef.update({wins:newWinValue}), function (err) {
                 if(err){  console.log("err " +err)
                 }
              }

             //to do
             //set up a result node with the user user confirming result
             //inside user confirming id add the post user id
             //inside that add the recent wins result to the to current player wins
             //This update each individuals player wins for the players page


           //ConfirmedResultPlayerObject controls individula player options

          var userPlayerResultRef = new Firebase(FIREBASE_URL + 'bears/poolbear/result/'
                                                              + $rootScope.currentUser.$id
                                                              );
          var playerResult = $firebaseArray(userPlayerResultRef );

//          var newWinValueResult = playerResult.playerPostUserId.playerWinsRecieve;
//                                  console.log("newWinValueResult" + newWinValueResult);
//
//           console.log("confirmedResultObject" + confirmedResultObject.playerRecieveUserId);
              var userPlayerInfo = {

//                notificationWinsPost: confirmedResultObject.playerPostWinsPost,


                playerWinsRecieve: confirmedResultObject.notificationWinsRecieve,
                playerLostRecieve: confirmedResultObject.playerRecieveLost,
                playerFirstname: confirmedResultObject.playerPostFirstName,
                playerLastname: confirmedResultObject.playerPostlastName

               };


              userPlayerResultRef.child(confirmedResultObject.playerPostUserId).set(userPlayerInfo );
              userPlayerResultRef.child(confirmedResultObject.playerPostUserId).update({playerWinsRecieve:newWinValue, collapse:true}), function (err) {
                 if(err)
                 {  console.log("err " + err)
                 }
              };

//              playerResult.$add(userInfo).then(function(userPlayerResultRef) {
//
//    });


//               notificationInfoPost.$remove(key);

              //after confirmation delete notification of reciever

              var postId =  confirmedResultObject.playerPostUserId; //Get notification userid
              var result =  confirmedResultObject.resultID; //Get notification userid
              var resultIdref = confirmedResultObject.$id; //Get notification userid

              var confirmMessageRef = new Firebase(FIREBASE_URL + 'bears/poolbear/notification/' + postId + "/" + result);


              var confirmMessageRefRecieved = new Firebase(FIREBASE_URL + 'bears/poolbear/notification/' + $rootScope.currentUser.$id + "/" + resultIdref);


//             $firebaseArray creates an empty array and placed using the reference create above

              confirmMessageRef.update({confirmShow:true});
              confirmMessageRefRecieved.update({confirmShow:true});


              if(confirmMessageRef.confirm ===true && confirmMessageRefRecieved.confirm ===true )
             $scope.confirm = true;

          });
           
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
            "filterName": "ranked"},
           {"filterId": 2,
            "filterName": "played"}
          ];
//       Set the filters in the drop down 
         $scope.playerFilterDropdown = playerFilterObject ;  
         
          
            var PlayerUserRefAll= new Firebase(FIREBASE_URL + 'bears/poolbear/users');
            var poolBearResultsAllFilter=$firebaseArray(PlayerUserRefAll);
            $scope.players = poolBearResultsAllFilter;
            console.log("PlayAll",$scope.players  );
            $scope.filterSet= 0;
         
         $scope.filterByDropdownFilter = function (filterID) {
                                    
         if(filterID === 1 ){
            console.log("Rnaked Players Have been selected  "   +  filterID );
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
            console.log('selectedDetailPlayer', selectedDetailPlayer );
//          PlayerRef is the location
//          where the new meetings are place 
        var PlayerRef = new Firebase(FIREBASE_URL + 'bears/poolbear/results/' + selectedDetailPlayer + '/user'   ); 
//        var currentUser = PlayerRef.child(selectedDetailPlayer);
//        
        console.log('PlayerRef', PlayerRef );
//        console.log('currentUser', currentUser );
  
  //       $firebaseArray creates an empty array and placed using the reference create above 
        var PlayerInfo = $firebaseObject(PlayerRef );
        $scope.players = PlayerInfo;
        console.log("PlayerInfo", PlayerInfo);
//        console.log("$scope.players", $scope.players);
        

   
}]);



