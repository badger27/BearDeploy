'use strict';
angular.module('poolBear.result')
.config(function ($stateProvider) {

    $stateProvider
      .state('app.decline', {
          url: '/player/decline',
          data: { title: 'decline' },
          views: {
              'main': {
                  controller: 'declineCtrl',
                  templateUrl: 'components/result/decline/decline-list.html'


              }
          }


      })
    
}).controller('lostCtrl', ['$scope', function lostCtrl($scope) {
    
    
    
}]);

