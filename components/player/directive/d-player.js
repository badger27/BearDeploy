(function () {
    'use strict';

    angular.module('poolBear.player')
        .directive('ifLayout', function () {
            // console.log("IF-LAYOUT FIRED " );
            return {
                restrict: 'E',
                link: function(scope, element, attrs ) {

                    scope.layoutLocation = 'components/player/'+ attrs.theme +'/player.html'
                },
                template: '<div ng-include="layoutLocation"></div>'
            };
        })

}());





















