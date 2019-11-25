//This service store the last selected items
(function () {
    'use strict';

    angular.module('poolbear.confirmServices', [])
        .factory('confirmScoreService', ['$rootScope', 'FIREBASE_URL', confirmScoreService]);
    function confirmScoreService($rootScope, FIREBASE_URL) {

        // CONFIRM SCORE STARTED
        let confirmScore = function (key, note, currentUserId) {




            //USER UPDATE VARIABLE
            let currentUserDetails;   //Current user ref details

            //Player Variable
            let currentPlayerDetails;  //Main player ref details
            //USER UPDATE VARIABLE END


            //******USER UPDATES START****
            // UPDATE POOL USER VALUE START
            // TO DO - Set up variable for each bear

            let database = firebase.database();
            let userData = database.ref( 'bears/poolbear/users/' + currentUserId);
            userData.once('value', function(snapshot) {
                currentUserDetails = (snapshot.val() && snapshot.val()) || 'Anonymous';

                var totalNoGames = note.notificationWinsRecieve + note.notificationWinsPost;

                if (snapshot.val() === null) {
                    console.log("Snap Shot = null");
                } else {

                    userData.update({
                        "wins":  currentUserDetails.wins + note.notificationWinsPost,
                        "lost":  currentUserDetails.lost + totalNoGames - note.notificationWinsPost,
                        "point": currentUserDetails.points + 10

                    });
                    console.log("UPDATE CURRENT USER VALUE  SUCCESS");
                }

            });






            // UPDATE POOL PLAYER VALUE START
            let playerRef = database.ref( 'bears/poolbear/users/' + note.playerPostUserId);
            playerRef.once("value", function (snapshot) {
                currentPlayerDetails = snapshot.val();
                var totalNoGames = note.notificationWinsRecieve + note.notificationWinsPost;

                if (snapshot.val() === null) {
                    console.log("Snap Shot = null");
                } else {
                    playerRef.update(
                        {   "wins":  currentPlayerDetails.wins + note.notificationWinsRecieve,
                            "lost":  currentPlayerDetails.lost + totalNoGames - note.notificationWinsRecieve,
                            "point": currentPlayerDetails.points + 10
                        });
                    console.log("UPDATE CURRENT PLAYER VALUE  SUCCESS");
                }
            })
            // UPDATE POOL PLAYER VALUE END


            //RESULT UPDATE VARIABLE
            var currentUserResultDetails;
            var currentPlayerResultDetails;
            var confirmedResultObject; //selected notification


            //******USER UPDATE RESULT RECORD START ****
            var userResultRef = database.ref('bears/poolbear/result/' + currentUserId + '/' + note.playerPostUserId);
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

                console.log("resultType" , resultType);
                if (resultType === "new") {
                    console.log("Set Fired" );
                    userResultRef.set(userInfo);
                } else {
                    console.log("Update Fired" );
                    userResultRef.update(userInfo);
                }
            }, function (errorObject) {
                // console.log("The read failed: " + errorObject.code);
            });

            var playerResultRef = database.ref('bears/poolbear/result/' + note.playerPostUserId  + '/' + currentUserId);
            playerResultRef.once("value", function (snapshot) {



                // this.mykey=key;


                var userInfo;
                var resultType;
                currentUserResultDetails = snapshot.val();

                try {

                    console.log("UPDATE  RESULTS EXIT OBJECT");
                    resultType = "update";
                    userInfo = {
                        refid: currentUserId,
                        playerWins: note.notificationWinsPost + currentUserResultDetails.UserWins,
                        UserWins: note.notificationWinsRecieve +  currentUserResultDetails.playerWins,
                        date: Firebase.ServerValue.TIMESTAMP
                    };

                } catch (err) {
                    resultType = "new";
                    userInfo = {
                        refid: currentUserId,
                        playerWins: note.notificationWinsRecieve + 0,
                        UserWins: note.notificationWinsPost + 0,
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



            var resultIdref = note.resultIDOppenent; //Get notification userid

            var confirmMessageRef = database.ref('bears/poolbear/notification/' + currentUserId + '/' + result);
            var confirmMessageRefRecieved = database.ref('bears/poolbear/notification/' + postId + "/" + resultIdref);
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
