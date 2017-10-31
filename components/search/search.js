'use strict';
angular.module('poolBear.search', [
   
 
    
   
])
.config(function ($stateProvider) {

    $stateProvider
      .state('app.search', {
           
          
          url: '/search',
          data: { title: 'Search' },
          views: {
              'main': {
                  controller: 'SearchCtrl',
                  templateUrl: 'components/search/search.html'


              }
          }


      })
    
}).controller('SearchCtrl', function SearchCtrl($scope) {
    
    
    
});

