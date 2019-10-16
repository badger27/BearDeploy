'use strict';
angular.module('poolBear.chat', [
    
   
])
.config(function ($stateProvider) {

    $stateProvider
      .state('app.chat', {
           
          
          url: '/chat',
          data: { title: 'Chat' },
          views: {
              'main': {
                  controller: 'chatCtrl',
                  templateUrl: 'components/chat/template/chat.html'


              }
          }


      })
    
}).controller('chatCtrl', ['$scope', function chatCtrl($scope) {

    $scope.comingSoon = "Coming Soom ";
    

  }]);
      

