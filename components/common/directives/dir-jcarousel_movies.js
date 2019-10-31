
    angular.module('inflightApp.jcarousel', [])
        .directive('carousel', carousel)
        .controller('tvController', tvController)
        .controller('movieController', movieController)

    function carousel() {
        return {
            restrict: 'A',
            replace: true,
            transclude: false,
            scope: {
                images: "="
            },




            template:
            '<div class="jcarousel-wrapper">' +
            '<div class="jcarousel">' +
            '<div class="menu-item">' +
            '<ul>' +
            '<li ng-repeat="img in images">' +
            '<div class="menu-image">' +
            '<div class="poster">' +
            '<img src="{{img.contentMeta.poster_mage_600x900}}" ' +
            'ui-sref="app.menu" style="cursor:pointer; max-width:300px;"/>' +
            '<img src="{{img.contentMeta.tv_poster_600x900}}" ' +
            'ui-sref="app.menu" style="cursor:pointer; max-width:300px;"/>' +
            '</div>' +
            '</div>' +
            '<h2>{{img.name}}</h2>' +
            '</li>' +
            '</ul>' +
            '</div>' +
            '</div>' +
            '<a href="javascript:void(0)" class="jcarousel-control-prev">&lsaquo;</a>' +
            '<a href="javascript:void(0)" class="jcarousel-control-next">&rsaquo;</a>' +
            '</div>',




            link: function link(scope, element, attrs) {
                var container = $(element);
                var carousel = container.children('.jcarousel');
                 
                carousel.jcarousel({
                    wrap: 'circular'
                });

                scope.$watch(attrs.images, function (value) {
                    carousel.jcarousel('reload');
                });

                container.find('.jcarousel-control-prev')
                    .jcarouselControl({
                    target: '-=1'
                });

                container.find('.jcarousel-control-next')
                    .jcarouselControl({
                    target: '+=1'
                });
            }
        };
    }



    function tvController($scope, micrositeApi, selector) {
        console.log("TVCrtl Fired");

        var onTvSuccess = function (data) {
            data =_.filter(data, function(item){
                return item.contentMeta._highlight === "True";
            });
            console.log("data TV" ,data);
            $scope.tvs= data;
            console.log("$scope" ,$scope);
        }

        micrositeApi.getAllContentItemsByType("tv").then(onTvSuccess);

    }

    function movieController($scope, micrositeApi, selector) {
        console.log("MovieCTRL Fired" );
        var onMovieSuccess = function (data) {
            data = _.filter(data, function (item) {
                return item.contentMeta._highlights === "True";
            });
            console.log("data Movies", data);
            $scope.movies = data;
            // console.log("$scope" ,$scope);
        }
        micrositeApi.getAllContentItemsByType("movies").then(onMovieSuccess);
    }

    function audioController($scope, micrositeApi, selector) {

        console.log("AudioCTRL Fired" );
        var onAudioSuccess = function (data) {
            data = _.filter(data, function (item) {
                return item.contentMeta._highlights === "True";
            });
            console.log("data Audio ", data);
            $scope.audio = data;
            // console.log("$scope" ,$scope);
        }
        micrositeApi.getAllContentItemsByType("audio").then(onAudioSuccess);
    }




