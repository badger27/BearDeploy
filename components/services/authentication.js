(function () {

    angular.module("poolBear.auth", []).factory('Authentication',
        ['$rootScope', '$firebaseAuth', '$firebaseObject', '$location', 'FIREBASE_URL',
            function  ($rootScope, $firebaseAuth, $firebaseObject, $location, FIREBASE_URL) {

                console.log("Authentication SERVICE FIRED(APP)");

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

                        console.log("MAIN USER-OBJECT DETAILS", $rootScope.currentUser);
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
                            console.log("regUser", regUser);

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