'use strict';
angular.module('poolBear.group', [
    
   
])
.config(function ($stateProvider) {

    $stateProvider
      .state('app.group', {
           
          
          url: '/group',
          data: { title: 'Group' },
          views: {
              'main': {
                  controller: 'GroupCtrl',
                  templateUrl: 'components/groups/group.html'


              }
          }


      })
    
}).controller('GroupCtrl', function GroupCtrl($scope) {
    
    console.log('RGroupCtrlesultCtrl');
    
  
    
});

