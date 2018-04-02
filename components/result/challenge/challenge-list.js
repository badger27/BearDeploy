'use strict';
angular.module('poolBear.result')
.config(function ($stateProvider) {

    $stateProvider
      .state('app.challenge', {
          url: '/player/challlenge',
          data: { title: 'challenge' },
          views: {
              'main': {
                  controller: 'challengeCtrl',
                  templateUrl: 'components/result/challenge/challenge-list.html'


              }
          }


      })
    
}).controller('challengeCtrl', ['$scope', function challengeCtrl($scope) {
    
    
    
}]);

