
"use strict";
    angular.module("poolBear.auth", []).factory('Authentication',

                     ['$rootScope', '$firebaseAuth', '$firebaseObject', '$location', 'FIREBASE_URL',
            function  (  $rootScope,   $firebaseAuth,   $firebaseObject,   $location,   FIREBASE_URL) {

                var auth = firebase.auth();


                return {

                    //LOGIN START
                    login: function (user) {
                        console.log("LOGIN FIRED" );
                        auth.signInWithEmailAndPassword( user.email, user.password)
                            .then(function(cred) {
                                console.log("firebaseUser", cred);
                                // $rootScope.message = "Hi " + user.email + ", Thanks for registering";
                            })
                            .catch(function(error) {
                            console.log(error);
                            console.log("logged in " );
                        });
                    },



                    logout: function () {
                        return auth.signOut().then(function() {
                            // Sign-out successful.
                            console.log("Sign-out successful");
                        }, function(error) {
                            console.log(error);
                        });
                    }, //logout



                    requireAuth: function () {
                        return true
                    }, //require Authentication


                    //REGISTRATION START
                    register: function (user) {
                        console.log("REGISTER FIRED");

                        //CREATE USER START
                        auth.createUserWithEmailAndPassword(user.email, user.password).then(function (regUser) {

                            var userDatails = {
                                date: Firebase.ServerValue.TIMESTAMP,
                                regUser: regUser.user.uid,
                                firstname: user.firstname,
                                lastname: user.lastname,
                                email: user.email,
                                tagline: user.tagline,
                                userimage: "noImages"
                            }


                            var updates = {};
                            updates['users/' + regUser.user.uid] = userDatails;
                            firebase.database().ref().update(updates);


                            // $scope.showRegForm = false;

                            $rootScope.message = "Hi " + user.lastname + ", Thanks for registering";

                        }).catch(function (error) {
                            $rootScope.message = error.message;
                        }); // CREATE USERS
                    } // REGISTER END
                }
            }])
