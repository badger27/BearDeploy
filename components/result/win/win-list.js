'use strict';
angular.module('poolBear.result')
.config(function ($stateProvider) {

    $stateProvider
      .state('app.wins', {
          url: '/player/wins',
          data: { title: 'wins' },
          views: {
              'main': {
                  controller: 'winCtrl',
                  templateUrl: 'components/result/win/win-list.html'


              }
          }


      })
    
}).controller('winCtrl', ['$scope', function winCtrl($scope) {
    
    
    
}]);

