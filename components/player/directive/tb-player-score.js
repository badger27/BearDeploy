(function () {
    'use strict';


    angular.module( 'poolBear.player')
.directive('tbPlayerScore', function() {


  return {
    restrict: 'E',
    templateUrl: "components/player/directive/templates/tb-player-score.html",
      scope:true,
      controller:function ($scope) {

          let themeName = window.localStorage.getItem("theme") ;
          $scope.theme = themeName;

      },
      link: function (scope,element, attrs) {
        // console.log("scope" , scope);
        // console.log("element" , element);
        // console.log("attrs" , attrs);


      }
  };
})

}());

