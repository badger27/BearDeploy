'use strict';
angular.module('poolBear.challenge', [
    
   
])
.config(function ($stateProvider) {

    $stateProvider
      .state('app.shop', {
          url: '/shop',
          data: { title: 'shop' },
          views: {
              'main': {
                  controller: 'shopCtrl',
                  templateUrl: 'components/shop/shop.html'


              }
          }


      })
    
}).controller('shopCtrl', ['$scope', function shopCtrl($scope) {
    
    
    
}]);

