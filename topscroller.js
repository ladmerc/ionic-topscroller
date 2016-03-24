angular.module('topscroller', ['ionic'])

.controller('scrollToTopCtrl', ['$window','$scope', '$element', '$ionicScrollDelegate', '$rootScope',
    function($window, $scope, $element, $ionicScrollDelegate, $rootScope) {
        var self = this;

        self.init = function(offset) {
            // if offset not specified from template
            if (!offset) {
                var phoneHeight = $window.innerHeight;
                var topBarHeight, defaultOffset;

                // if there is a top bar
                try {
                    topBarHeight = document.querySelector('.bar').offsetHeight;
                } catch (err) {
                    topBarHeight = 0;
                }
                // if there is a nav bar
                try {
                    navTabHeight = document.querySelector('.tab-nav').offsetHeight;
                } catch (err) {
                    navTabHeight = 0;                    
                }

                // set default to twice the current view width, excluding bars
                var defaultOffset = (phoneHeight - (topBarHeight + navTabHeight)) * 2;
            }
            // make sure user inputs a number type as offset
            if (offset && ((typeof(parseInt(offset)) !== "number") || isNaN(parseInt(offset)) )) {                
                throw "expected a number, but got " + "'" + offset + "'\n";
            } 
            self.verticalOffset = offset ? offset :  defaultOffset
        }

        self.getScrollPosition = function() {
            // create delegate instance to not interfere with other instances
          var currentScrollPosition = $ionicScrollDelegate.$getByHandle('scroller').getScrollPosition().top;
            $scope.$apply(function() {
              if (currentScrollPosition >= self.verticalOffset) {
                $rootScope.$broadcast('showButton');
              }
              else {
                $rootScope.$broadcast('hideButton');
              }
            });    
        }; 

        self.scrollToTop = function(shouldAnimate) {
            $scope.$broadcast('hideButton');
            $ionicScrollDelegate.scrollTop(shouldAnimate);
        }
}])

.directive('scrollToTop', ['$ionicGesture', function($ionicGesture) {
        return {
            restrict: 'EA',
            controller: 'scrollToTopCtrl',
            link: function(scope, element, attrs, ctrl) {

                // get the vertical offset supplied from the template
                var verticalOffset = attrs.scrollToTop;
                ctrl.init(verticalOffset);

                $ionicGesture.on('scroll', function(e) {
                    ctrl.getScrollPosition()
                }, element)
            }
        }
}])

.directive('scrollToTopButton', ['$rootScope', '$ionicGesture', function($rootScope, $ionicGesture) {
    return {
        restrict: 'E',
        controller: 'scrollToTopCtrl',
        // require: '^scrollToTop',
        link: function($scope, element, attrs, ctrl) {

            // set animation option
            shouldAnimate = attrs.animate === "false" ? false : true;
            
            // hide the button initially
            element.css({'display': 'none'});

            $rootScope.$on('showButton', function() {
                element.css({'display': 'block'});
            });
            $rootScope.$on('hideButton', function() {
                element.css({'display': 'none'});
            });

            $ionicGesture.on('tap', function(e) {
                    ctrl.scrollToTop(shouldAnimate);
            }, element)

        }
    }
}])