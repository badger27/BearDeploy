(function () {
    'use strict';


    angular.module( 'poolBear.player')
.directive('tbProfilesCard', function() {
  return {
    restrict: 'E',
      controller: function ($window , $scope) {
          let theme = window.localStorage.getItem("theme") ;
          theme = theme.split("B");
          $scope.theme= theme[0];
      },
    templateUrl: "components/player/directive/templates/profile.html",
      link:function (scope,element,attr) {
        console.log("scope" , scope.theme);
      }

  };
})

}());

