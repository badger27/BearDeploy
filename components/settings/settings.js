'use strict';
angular.module('poolBear.settings', [
    
   
])
.config(function ($stateProvider) {

    $stateProvider
      .state('app.settings', {
           
          
          url: '/settings',
          data: { title: 'Settings' },
          views: {
              'main': {
                  controller: 'SettingsCtrl',
                  templateUrl: 'components/settings/settings.html'


              }
          }


      })
    
}).controller('SettingsCtrl', function SettingsCtrl($scope) {
    

    
});

