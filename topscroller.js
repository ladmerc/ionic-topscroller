angular.module('topscroller', ['ionic'])

.controller('scrollToTopCtrl', ['$window','$scope', '$element', '$ionicScrollDelegate',
    function($window, $scope, $element, $ionicScrollDelegate) {
        var self = this;

        self.init = function(offset) {
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

                var defaultOffset = (phoneHeight - (topBarHeight + navTabHeight)) * 2;
            }
            if (offset && ((typeof(parseInt(offset)) !== "number") || isNaN(parseInt(offset)) )) {                
                throw "expected a number, but got " + "'" + offset + "'\n";
            } 
            self.verticalOffset = offset ? offset :  defaultOffset
        }

        self.getScrollPosition = function() {
          var currentScrollPosition = $ionicScrollDelegate.getScrollPosition().top;
            $scope.$apply(function() {
              if (currentScrollPosition >= self.verticalOffset){
                $scope.$broadcast('show');
              }
              else {
                $scope.$broadcast('hide');
              }
            });
            
        }; 

        self.scrollToTop = function() {
            $scope.$broadcast('hide');
            $ionicScrollDelegate.anchorScroll(true);
        }
}])

.directive('scrollToTop', ['$ionicGesture', function($ionicGesture) {
        return {
            restrict: 'EA',
            controller: 'scrollToTopCtrl',
            link: function($scope, element, attrs, ctrl) {

                if (element[0].tagName !== "ION-VIEW") {
                    throw "'scroll-to-top' should be placed in an 'ion-view' \n"
                }

                // get the vertical offset supplied from the template
                var verticalOffset = attrs.scrollToTop;
                ctrl.init(verticalOffset);

                // get the  ion-content tag that's a direct child of the ion-view.
                // ion-views are not scrollable, but ion-contents are.
                // Possible bug: line below might return multiple ion-content, if exists
                var ionContent = element.children('ion-content');

                
                $ionicGesture.on('scroll', function(e) {
                    ctrl.getScrollPosition()
                }, ionContent)
            }
        }
}])

.directive('scrollToTopButton', ['$ionicGesture', function($ionicGesture) {
    return {
        restrict: 'E',
        controller: 'scrollToTopCtrl',
        require: '^scrollToTop',
        link: function($scope, element, attrs, ctrl) {
            
            // hide the button initially
            element.css({'display': 'none'});

            $scope.$on('show', function() {
                element.css({'display': 'block'});
            });
            $scope.$on('hide', function() {
                element.css({'display': 'none'});
            });

            $ionicGesture.on('tap', function(e) {
                    ctrl.scrollToTop();
            }, element)

        }
    }
}])