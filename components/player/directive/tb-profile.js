(function () {
    'use strict';


    angular.module( 'poolBear.player')
.directive('tbProfilesCard', function() {
  return {
    restrict: 'E',
      controller: function ($window , $scope) {
          let themeName = window.localStorage.getItem("theme") ;
          console.log("themeName" ,themeName);
          $scope.theme = themeName;
          themeName = themeName.split("B");
          $scope.activities= themeName[0];
      },
    templateUrl: "components/player/directive/templates/profile.html",
      link:function (scope,element,attr) {
        console.log("scope" , scope.theme);
      }

  };
})

}());

