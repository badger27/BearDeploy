(function () {
    'use strict';


    angular.module( 'poolBear')
.directive('searchDirective', function() {
  return {
    restrict: 'E',
    templateUrl: "components/common/directives/search/templates/search.html"
  };
})

}());

