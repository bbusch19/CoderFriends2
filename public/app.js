angular.module('friendsApp', ['ui.router']).config(function($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/');

    $stateProvider
    .state('login', {
        url: '/',
    })
    .state('home', {
        url: '/home',
        templateUrl: './templates/home.html'
    })
    .state('friend', {
        url: '/friend/:github_username',
        templateUrl: './templates/friend.html'
    })

})