'use strict';
angular.module('poolBear.geo', [
    
   
])
.config(function ($stateProvider) {

    $stateProvider
      .state('app.geo', {
           
          
          url: '/geo',
          data: { title: 'Geo' },
          views: {
              'main': {
                  controller: 'SimpleArrayCtrl',
                  templateUrl: 'components/beargeo/beargeo.html'


              }
          }


      })
    
}).controller('SimpleArrayCtrl', ['$scope', function SimpleArrayCtrl($scope) {
    // fruits
    $scope.fruits = ['apple', 'orange', 'pear', 'naartjie'];
    
    // selected fruits
    $scope.selection = [];
    
    // toggle selection for a given fruit by name
    $scope.toggleSelection = function toggleSelection(fruitName) {
      var idx = $scope.selection.indexOf(fruitName);
      
      // is currently selected
      if (idx > -1) {
        $scope.selection.splice(idx, 1);
      }
      
      // is newly selected
      else {
        $scope.selection.push(fruitName);
      }
            console.log("selection:",$scope.selection);
            console.log("idx:",idx);
    };
  }]);
      
//        .controller('ObjectArrayCtrl', ['$scope', 'filterFilter', function ObjectArrayCtrl($scope, filterFilter) {
//    // fruits
//    $scope.fruits = [
//      { name: 'apple',    selected: true },
//      { name: 'orange',   selected: false },
//      { name: 'pear',     selected: true },
//      { name: 'naartjie', selected: false }
//    ];
//    
//    // selected fruits
//    $scope.selection = [];
//    
//    // helper method
//    $scope.selectedFruits = function selectedFruits() {
//      return filterFilter($scope.fruits, { selected: true });
//    };
//    
//    // watch fruits for changes
//    $scope.$watch('fruits|filter:{selected:true}', function (nv) {
//      $scope.selection = nv.map(function (fruit) {
//        return fruit.name;
//      });
//    }, true);
//  }]).filter('fruitSelection', ['filterFilter', function (filterFilter) {
//    return function fruitSelection(input, prop) {
//      return filterFilter(input, { selected: true }).map(function (fruit) {
//        return fruit[prop];
//      });
//    };
//  }]);
