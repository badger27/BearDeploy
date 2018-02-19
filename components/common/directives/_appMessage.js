angular.module("poolBear.Message", [])

        .controller('messageCtrl', function ($scope){
            
            console.log("messageController", $scope);
    
    
           $scope.messageInDev = {
               
               note:"developer"
           }
           
             $scope.messagePremium = {
               
               note:"premium"
           }
            

        })

        .directive('notavailable', function () {
          return{
             templateUrl: './components/directives/view/indevMessage.html',
              restrict: 'E',
              scope:{
                  name: '=',
                  name2: '='
              },
               
              controller: function($scope){
        
                  $scope.indevelopment =function( messageInDev){
                    
                   $scope.collapsed= ! $scope.collapsed;
                   $scope.collapsedp= ! $scope.collapsedp;
                  }
                   console.log("messageDirective", $scope);
              }
          }  
        }); 