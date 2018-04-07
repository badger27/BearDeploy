'use strict';
angular.module('poolBear.challenge', [
    
   
])
.config(function ($stateProvider) {

    $stateProvider
      .state('app.challenge', {
           
          
          url: '/challenge',
          data: { title: 'challenge' },
          views: {
              'main': {
                  controller: 'challengeCtrl',
                  templateUrl: 'components/challenge/challenge.html'


              }
          }


      })
    
}).controller('challengeCtrl', ['$scope', function challengeCtrl($scope) {
    
    
    
}]);

