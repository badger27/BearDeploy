
"use strict";
angular.module('poolBear.shop', [

])
    .config(['$stateProvider', function ($stateProvider) {

        $stateProvider
            .state('app.shop', {
                url: '/shop',
                data: {title: 'shop'},
                views: {
                    'main': {
                        controller: 'shopController',
                        templateUrl: 'components/shop/shop.html',
                    }
                }
            })
        }])


    .controller('shopController',
        ['$scope', '$rootScope', '$firebaseAuth', '$firebaseArray', '$firebaseObject', 'FIREBASE_URL', 'firebaseDataService', 'bearApi',
            function ($scope, $rootScope, $firebaseAuth, $firebaseArray, $firebaseObject, FIREBASE_URL, firebaseDataService, bearApi) {

            console.log("Shop FIRED" );
            var onSuccessShop = function (data) {
                console.log("***** data shop" , data);

                $scope.shopData =  data ;
            }

                bearApi.getShopData().then(onSuccessShop);


            }])

