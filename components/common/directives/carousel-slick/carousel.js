(function(){
"use strict";



angular.module('slickExampleApp',['slickCarousel'])
  .config(['$stateProvider', function ($stateProvider) {
      $stateProvider.state('app.slick', {
          url: '/slick',
          views: {
              'main': {
                  controller: 'SlickController',
              }
          },

      });
  }])
  .config(['slickCarouselConfig', function (slickCarouselConfig) {
    slickCarouselConfig.dots = true;
    slickCarouselConfig.autoplay = false;
  }])
  .controller('SlickController', [ '$scope', '$timeout' ,'bearApi', function ($scope, $timeout, bearApi) {


    //====================================
    //Shop
    //====================================

      let name = (x,y) => x + y ;

      var onSuccessShop = (data) => {
          console.log(" onSuccessShop  " , data );

            $scope.shopData =  data ;
            $scope.slickConfig3Loaded = true;
            $scope.slickConfig3 = {
      method: {},
      dots: false,
      infinite: false,
      speed: 300,
      slidesToShow: 6,
      slidesToScroll: 6,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 3,
            infinite: true,
              dots: false,
          }
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2
          }
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1
          }
        }
      ]
    };

      }
      bearApi.getShopData().then(onSuccessShop);

  }]);
}());
