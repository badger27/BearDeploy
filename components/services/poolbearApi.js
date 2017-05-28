(function () {
    'use strict';

    angular.module('poolBear.api',[ ]).factory('bearApi',['$rootScope', '$http','$q', 'FIREBASE_URL','$firebaseAuth', '$firebaseObject',   bearApi]);
    console.log('Api');
    function bearApi($rootScope,$http, $q , $firebaseAuth, $firebaseObject, FIREBASE_URL ) {
           console.log('FIREBASE_URL' + FIREBASE_URL);
           var getPlayers = function () {
            console.log('got here');
//            return $http.get('http://micrositeifd.azurewebsites.net/api/v1/1ddfe01a-2ced-4b5d-92ce-899738a8e95a/localisation/languages')
             return $http.get('http://gatherngo.tonicdigitalmedia.com/json/player.json')
//             return $http.get('../json/player.json')
                  .then(function (response) {
                       console.log('data' + response);
                  return response.data;           
              });
        };
        
            var getPlayersfireBase = function () {
            console.log('got here fire');
            
             var userRef = new Firebase('https://thebear.firebaseio.com/users' );
            console.log('userRef' +userRef);
             return $http.get(userRef)

                  .then(function (response) {

                       console.log('data Fire' + response);
                  return response.data;           
              });
        };
        
        
        
        return {
        getPlayersfireBase:getPlayersfireBase ,    
        getPlayers: getPlayers        
        };
      
    
     }
      
}());

















