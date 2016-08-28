angular.module('App', ['ionic', 'topscroller'])

.config(function($stateProvider, $urlRouterProvider) {

  $stateProvider
    .state('home', {
      url: "/",
      templateUrl: "templates/home.html"
    })
  $urlRouterProvider.otherwise("/");
})

.controller('AppCtrl', function($scope, $http) {
  $http.get('https://raw.githubusercontent.com/mledoze/countries/master/countries.json').then(function(countries) {
    console.log(countries);
    $scope.countries = countries.data.slice(0, 350);
  }, function(err) {
    console.log(err);
  })
})
  
  