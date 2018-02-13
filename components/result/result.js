'use strict';
angular.module('poolBear.result', [
    
'poolBear.login',
'poolBear.player',


])
.config(function ($stateProvider) {

    $stateProvider
      .state('app.result', {
           
        
          url: '/result',
          data: { title: 'Result' },
          views: {
              'main': {
                  controller: 'ResultCtrl',
                  templateUrl: 'components/result/result.html',

                                    //This code restricts access to logged in users only 
                     resolve: {
          currentAuth: function(Authentication) {
          return Authentication.requireAuth();
        } //current Auth
      } //resolve
              }
          }


      })
    
}).controller('ResultCtrl', function ResultCtrl($scope, $rootScope ) {
      console.log('RESULT-CTRL FIRED');



   $scope.alerts = [
    { type: 'danger', msg: 'Oh snap! Change a few things up and try submitting again.' },
    { type: 'success round', msg: 'Well done! You successfully read this important alert message.' }
  ];

  $scope.addAlert = function() {
    $scope.alerts.push({msg: "Another alert!"});
  };

  $scope.closeAlert = function(index) {
    $scope.alerts.splice(index, 1);
  }; 
    
});
