//This service store the last selected items
(function () {
    'use strict';

    angular.module('poolbear.confirmServices', [])
     .factory('confirmScoreService', [ '$rootScope','FIREBASE_URL', confirmScoreService]);
       function confirmScoreService($rootScope , FIREBASE_URL ) {

           // TO DO
           // create a result record base on root


         var confirmScore = function(key,note,currentUserId) {
             console.log("CONFIRM-SCORE- FIRED" );
             console.log("key ", key);
             console.log("note ", note);
             console.log("currentUserId", currentUserId);

             //SET GLOBAL START

             //USER UPDATE VARIABLE
             // User Variable
             var currentUserDetails ;   //Main user ref details
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
                     snapshot.ref().update({"wins":newUserValueObject.newWinValueUser });
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
             var playerResultRef = new Firebase(FIREBASE_URL + 'bears/poolbear/result/' + note.playerPostUserId + '/' + currentUserId) ;



             console.log("userResultRef " ,userResultRef );
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

                 console.log("currentUserResultDetails" , currentUserResultDetails);

             }, function (errorObject) {
                 // console.log("The read failed: " + errorObject.code);


             });


              console.log("currentUserResultDetails" , currentUserResultDetails);

             // playerResultRef.once("value", function(snapshot) {
             //     currentPlayerResultDetails =snapshot.val();
             //     return  currentPlayerResultDetails;



             // console.log(" currentPlayerResultDetails" ,  currentPlayerResultDetails);
             // console.log(" currentPlayerResultDetails-PlayerWins" ,  currentPlayerResultDetails.playerWins);
             // console.log(" currentPlayerResultDetails-UserWins" ,  currentPlayerResultDetails.UserWins);


             // var userInfo = {
             //
             //     // refid:note.playerPostUserId,
             //     playerWins:  note.notificationWinsRecieve  + currentUserResultDetails.playerWins   ,
             //     // UserWins: note.playerRecieveLost  + currentUserResultDetails.UserWins + currentPlayerResultDetails.UserWins,
             //     // date: Firebase.ServerValue.TIMESTAMP
             // };

             // var playerInfo = {
             //     // refid:$rootScope.currentUser.$id,
             //     playerWins:  note.playerRecieveLost  + currentPlayerResultDetails.playerWins ,
             //     // UserWins: note.notificationWinsRecieve  + + currentPlayerResultDetails.UserWins,
             //     // date: Firebase.ServerValue.TIMESTAMP
             // };

             // console.log("userInfo" ,userInfo. playerWins);


             // userResultRef.set(userInfo );
             // playerResultRef.set( playerInfo);
             //
             // }, function (errorObject) {
             //     console.log("The read failed: " + errorObject.code);
             // });









             // var playerInfo = {
             //     // refid:$rootScope.currentUser.$id,
             //     playerWins: note.notificationWinsRecieve ,
             //     // UserWins: note.notificationWinsRecieve  + + currentPlayerResultDetails.UserWins,
             //     // date: Firebase.ServerValue.TIMESTAMP
             // };
             // playerResultRef.update(playerInfo);


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



         }; // CONFIRM END


           return {
               confirmScore:confirmScore
        };


    };


}());
