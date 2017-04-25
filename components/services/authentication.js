(function () {

 angular.module("auth", []).factory('Authentication', 
  ['$rootScope', '$firebaseAuth', '$firebaseObject',
  '$location', 'FIREBASE_URL','bearSelect',
  function($rootScope, $firebaseAuth, $firebaseObject,
    $location, FIREBASE_URL,bearSelect,bearSelect) {

  var ref = new Firebase(FIREBASE_URL);
  var auth = $firebaseAuth(ref);
  var bearObject = bearSelect.getBearsFromBearSelect();

  auth.$onAuth(function(authUser) {
    if (authUser) {
      var userRef = new Firebase(FIREBASE_URL + 'users/' + authUser.uid );
      var userObj = $firebaseObject(userRef);
      $rootScope.currentUser = userObj;
    } else {
      $rootScope.currentUser = '';
    }
  });


  return {
    login: function(user) {
      auth.$authWithPassword({
        email: user.email,
        password: user.password
      }).then(function(regUser) {
        $location.path('/');
      }).catch(function(error) {
       $rootScope.message = error.message;
      });
    }, //login

    logout: function() {
      return auth.$unauth();
    }, //logout

    requireAuth: function() {
      return auth.$requireAuth();
    }, //require Authentication

    register: function(user ) {
      auth.$createUser({
        email: user.email,
        password: user.password
      }).then(function(regUser) {
       
        var regRef = new Firebase(FIREBASE_URL + 'users')
        .child(regUser.uid).set({
          date: Firebase.ServerValue.TIMESTAMP,
          regUser: regUser.uid,
          bears: bearObject ,
          firstname: user.firstname,
          lastname: user.lastname,
          email:  user.email,
           results: '',
           played: '',
//           bearloaded: user.bearSelection,
           rank: 0,
           rated: 12,
           wins: 48,
           lost: 52,
           points:100
           
       
          
          
        }); //user info
      
        $rootScope.message = "Hi " + user.firstname +
        ", Thanks for registering";
      }).catch(function(error) {
        $rootScope.message = error.message;
      }); // //createUser
    } // register
  };

}])

}());