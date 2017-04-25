  'use strict';

angular.module( 'poolBear.actionmodal', ['ngAnimate'])
.directive('modal', function() {
  return {
    restrict: 'E',
    scope: {
      show: '='
    },
    replace: true, // Replace with the template below
    transclude: true, // we want to insert custom content inside the directive
    link: function(scope, element, attrs) {
      scope.hideModal = function() {
        scope.show = false;
      };
    },
    template: "<div class='ng-modal' ng-show='show'>"+
                "<div class='reveal-modal' ng-show='show'>"+
                  "<div ng-transclude></div>"+
                  "<a class='close-reveal-modal' ng-click='hideModal()'>&#215;</a>"+
                "</div>"+
                "<div class='reveal-modal-bg' ng-click='hideModal()'></div>"+
              "</div>"
  };
})

.controller('ActionCtrl', ['$scope', function($scope) {
                console.log('ActionCtrl');
  $scope.modalShown = false;
  $scope.toggleModal = function() {
    $scope.modalShown = !$scope.modalShown;
    
  };
}]);


































//
//angular.module('poolBear.actionmodal', ['ngAnimate'])
//.directive('modal', function() {
//  return {
//    restrict: 'E',
//    scope: {
//      show: '='
//    },
//    replace: true, // Replace with the template below
//    transclude: true, // we want to insert custom content inside the directive
//    link: function(scope, element, attrs) {
//      scope.hideModal = function() {
//        scope.show = false;
//      };
//    },
//    template: "<div class='ng-modal' ng-show='show'>"+
//                "<div class='reveal-modal' ng-show='show'>"+
//                  "<div ng-transclude></div>"+
//                  "<a class='close-reveal-modal' ng-click='hideModal()'>&#215;</a>"+
//                "</div>"+
//                "<div class='reveal-modal-bg' ng-click='hideModal()'></div>"+
//              "</div>"
//  };
//})
//
//.controller('ActionCtrl', ['$scope', function($scope) {
//  $scope.modalShown = false;
//  $scope.toggleModal = function() {
//    $scope.modalShown = !$scope.modalShown;
//  };
//}]);

