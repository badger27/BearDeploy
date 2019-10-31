"use strict";
  angular.module('poolBear')
  .directive('tbLoginForm', function() {
    console.log("TB-LOGIN-FORM-DIR FIRED" );
    return {
      restrict: 'E',
      templateUrl:'components/login/directives/templates/login.html'
    };
  })

