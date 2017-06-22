//This service store the last selected items 
(function () {
    'use strict';

    angular.module('poolbear.confirmServices', [])
     .factory('confirmScoreService', [ confirmScoreService]);
   
    

       function confirmScoreService( FIREBASE_URL ,$rootScope ,$scope, $q , $firebaseAuth, $firebaseObject) {
           
           
         var confirmScore = function(key,note) {

             var currentUserDetails ;   //Main user ref details
             var currentPlayerDetails;  //Main player ref details
             var confirmedResultObject ; //selected notification

             // Get User and Player refs for update
             var userRef = new Firebase(FIREBASE_URL + 'bears/poolbear/users/' + $rootScope.currentUser.$id );
             // var resultRef = new Firebase(FIREBASE_URL + 'bears/poolbear/result/' + $rootScope.currentUser.$id );

             var playerRef = new Firebase(FIREBASE_URL + 'bears/poolbear/users/' + note.playerPostUserId );
             // var resultRef = new Firebase(FIREBASE_URL + 'bears/poolbear/result/' + note.playerPostUserId );

             //get values from  the current users
             userRef.on("value", function(snapshot) {

                 currentUserDetails =snapshot.val();
                 return currentUserDetails;

             }, function (errorObject) {
                 console.log("The read failed: " + errorObject.code);
             });

             // gets value of selected Player
             playerRef.on("value", function(snapshot) {

                 currentPlayerDetails =snapshot.val();
                 return currentPlayerDetails;

             }, function (errorObject) {
                 console.log("The read failed: " + errorObject.code);
             });

             // console.log(" currentPlayerDetails" ,  currentPlayerDetails);


             var newWinValueUser =  currentUserDetails.wins + note.notificationWinsPost;
             var newWinValuePlayer=  currentPlayerDetails.wins + note.notificationWinsRecieve;
             var totalNoGames = note.notificationWinsRecieve + note.notificationWinsPost ;
             var newLostValueUser =   currentUserDetails.lost  + totalNoGames - note.notificationWinsPost;
             var newLostValuePlayer=  currentPlayerDetails.lost + totalNoGames  - note.notificationWinsRecieve;
             var newPointsValueUser = currentUserDetails.points + 10;
             var newPointsValuePlayer = currentPlayerDetails.points + 5;



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



//          Updates Result Record of player
             var userResultRef = new Firebase(FIREBASE_URL + 'bears/poolbear/result/' + $rootScope.currentUser.$id + '/'  + note.playerPostUserId);
             var playerResultRef = new Firebase(FIREBASE_URL + 'bears/poolbear/result/' + note.playerPostUserId + '/'  +  $rootScope.currentUser.$id) ;

             console.log("userResultRef " + userResultRef );

             var currentUserResultDetails ;
             //get values from  the current users

             userResultRef.on("value", function(snapshot) {
                 currentUserResultDetails =snapshot.val();
                 return  currentUserResultDetails;

             }, function (errorObject) {
                 console.log("The read failed: " + errorObject.code);
             });

             console.log(" currentResultDetails" ,  currentUserResultDetails);
             console.log(" currentResultDetails-PlayerWins" ,  currentUserResultDetails.playerWins);
             console.log(" currentResultDetails-UserWins" ,  currentUserResultDetails.UserWins);

             var currentPlayerResultDetails ;
             //get values from  the current users

             playerResultRef.on("value", function(snapshot) {
                 currentPlayerResultDetails =snapshot.val();
                 return  currentPlayerResultDetails;

             }, function (errorObject) {
                 console.log("The read failed: " + errorObject.code);
             });


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



             //after confirmation delete notification of reciever

             var postId =  note.playerPostUserId; //Get notification userid
             var result =  note.resultID; //Get notification userid
             var resultIdref = note.$id; //Get notification userid
             var confirmMessageRef = new Firebase(FIREBASE_URL + 'bears/poolbear/notification/' + postId + "/" + result);
             var confirmMessageRefRecieved = new Firebase(FIREBASE_URL + 'bears/poolbear/notification/' + $rootScope.currentUser.$id + "/" + resultIdref);


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
