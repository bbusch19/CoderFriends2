angular.module('friendsApp').service('mainSvc', function($http, $q, $window) {
    this.githubLogin = function() {
        $window.location = '/auth/github'
    }
})