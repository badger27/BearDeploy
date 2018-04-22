(function () {
    'use strict';


    angular.module( 'poolBear.player')
.directive('tbProfilesCardPlayerSmall', function() {
  return {
    restrict: 'E',
      controller: function ($window , $scope) {
          let themeName = window.localStorage.getItem("theme") ;
          console.log("themeName" ,themeName);
          $scope.theme = themeName;
          themeName = themeName.split("B");
          $scope.activities= themeName[0];
      },
    templateUrl: "components/player/directive/templates/profile-player-small.html",
      link:function (scope,element,attr) {
        console.log("scope" , scope.theme);
      }

  };
})

}());

