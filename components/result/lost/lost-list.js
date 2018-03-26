'use strict';
angular.module('poolBear.result')
.config(function ($stateProvider) {

    $stateProvider
      .state('app.lost', {
          url: '/player/lost',
          data: { title: 'lost' },
          views: {
              'main': {
                  controller: 'lostCtrl',
                  templateUrl: 'components/result/lost/lost-list.html'


              }
          }


      })
    
}).controller('lostCtrl', ['$scope', function lostCtrl($scope) {
    
    
    
}]);

