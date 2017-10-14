//This service store the last selected items 
(function () {
    'use strict';

    angular.module('poolbear.confirmServices', [])
     .factory('confirmScoreService', [ '$rootScope','FIREBASE_URL', confirmScoreService]);
   
    

       function confirmScoreService($rootScope , FIREBASE_URL ) {
           console.log("FIREBASE_URL:" + FIREBASE_URL);

         var confirmScore = function(key,note,currentUserId) {
             console.log("key ", key);
             console.log("note ", note);
             console.log("currentUserId", currentUserId);


             var currentUserDetails ;   //Main user ref details
             var currentPlayerDetails;  //Main player ref details
             var confirmedResultObject ; //selected notification

             // Get User and Player refs for update
             var userRef = new Firebase(FIREBASE_URL + 'bears/poolbear/users/' + currentUserId );
             // var resultRef = new Firebase(FIREBASE_URL + 'bears/poolbear/result/' + $rootScope.currentUser.$id );

             var playerRef = new Firebase(FIREBASE_URL + 'bears/poolbear/users/' + note.playerPostUserId );
             // var resultRef = new Firebase(FIREBASE_URL + 'bears/poolbear/result/' + note.playerPostUserId );

             console.log("here1" );
             //get values from  the current users
             userRef.on("value", function(snapshot) {
                 currentUserDetails =snapshot.val();
                 console.log("currentUserDetails" , currentUserDetails);
                 return currentUserDetails;
             }, function (errorObject) {
                 console.log("The read failed: " + errorObject.code);
             });


             console.log("here2" );

             // gets value of selected Player
             playerRef.on("value", function(snapshot) {
                 currentPlayerDetails =snapshot.val();
                 console.log("currentPlayerDetails" , currentPlayerDetails);
                 return currentPlayerDetails;


             console.log("here3" );
             console.log(" currentPlayerDetails" ,  currentPlayerDetails);


             var newWinValueUser =  currentUserDetails.wins + note.notificationWinsPost;
             var newWinValuePlayer=  currentPlayerDetails.wins + note.notificationWinsRecieve;
             var totalNoGames = note.notificationWinsRecieve + note.notificationWinsPost ;
             var newLostValueUser =   currentUserDetails.lost  + totalNoGames - note.notificationWinsPost;
             var newLostValuePlayer=  currentPlayerDetails.lost + totalNoGames  - note.notificationWinsRecieve;
             var newPointsValueUser = currentUserDetails.points + 10;
             var newPointsValuePlayer = currentPlayerDetails.points + 5;

             console.log("here4" );

             // updates wins for current user in notification
             userRef.update(
                 {
                     wins:newWinValueUser,
                     lost:newLostValueUser,
                     points:newPointsValueUser
                 }), function (err) {
                 if(err){  console.log("err " +err)
                 }
             }
             playerRef.update(
                 {
                     wins:newWinValuePlayer,
                     lost:newLostValuePlayer,
                     points:newPointsValuePlayer

                 }), function (err) {
                 if(err){  console.log("err " +err)
                 }
             }

             }, function (errorObject) {
                 console.log("The read failed: " + errorObject.code);
             });




//          Updates Result Record of player
             var userResultRef = new Firebase(FIREBASE_URL + 'bears/poolbear/result/' + currentUserId + '/'  + note.playerPostUserId);
             var playerResultRef = new Firebase(FIREBASE_URL + 'bears/poolbear/result/' + note.playerPostUserId + '/'  +  currentUserId) ;

             console.log("userResultRef1 " + userResultRef );

             var currentUserResultDetails ;
             //get values from  the current users

             userResultRef.on("value", function(snapshot) {
                 currentUserResultDetails =snapshot.val();
                 return  currentUserResultDetails;


             console.log(" currentResultDetails" ,  currentUserResultDetails);
             console.log(" currentResultDetails-PlayerWins" ,  currentUserResultDetails.playerWins);
             console.log(" currentResultDetails-UserWins" ,  currentUserResultDetails.UserWins);

             }, function (errorObject) {
                 console.log("The read failed: " + errorObject.code);
             });


             var currentPlayerResultDetails ;
             //get values from  the current users

             playerResultRef.on("value", function(snapshot) {
                 currentPlayerResultDetails =snapshot.val();
                 return  currentPlayerResultDetails;



             console.log(" currentPlayerResultDetails" ,  currentPlayerResultDetails);
             console.log(" currentPlayerResultDetails-PlayerWins" ,  currentPlayerResultDetails.playerWins);
             console.log(" currentPlayerResultDetails-UserWins" ,  currentPlayerResultDetails.UserWins);


             var userInfo = {

                 refid:note.playerPostUserId,
                 playerWins:  note.notificationWinsRecieve  + currentUserResultDetails.playerWins   ,
                 UserWins: note.playerRecieveLost  + currentUserResultDetails.UserWins + currentPlayerResultDetails.UserWins,
                 date: Firebase.ServerValue.TIMESTAMP
             };

             var playerInfo = {
                 refid:$rootScope.currentUser.$id,
                 playerWins:  note.playerRecieveLost  + currentPlayerResultDetails.playerWins ,
                 UserWins: note.notificationWinsRecieve  + + currentPlayerResultDetails.UserWins,
                 date: Firebase.ServerValue.TIMESTAMP
             };

             console.log("userInfo" ,userInfo. playerWins);


             userResultRef.set(userInfo );
             playerResultRef.set( playerInfo);

             }, function (errorObject) {
                 console.log("The read failed: " + errorObject.code);
             });


             //after confirmation delete notification of reciever

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



         }; // confirm


           return {
               confirmScore:confirmScore
        };


    };


}());
