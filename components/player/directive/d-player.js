(function () {
    'use strict';


    angular.module('poolBear.player')
        .directive('ifLayout', function () {
            console.log("IF-LAYOUT FIRED " );
            return {
                restrict: 'E',
                link: function(scope, element, attrs ) {
                    console.log("attrs", attrs.theme);
                    console.log("scope1" , scope);
                    scope.layoutLocation = 'components/player/'+ attrs.theme +'/player.html'
                },
                template: '<div ng-include="layoutLocation"></div>'
            };
        })

}());





















