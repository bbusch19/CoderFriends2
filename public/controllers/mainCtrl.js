angular.module('friendsApp').controller('mainCtrl', function($scope, mainSvc) {
    $scope.githubLogin = function() {
        mainSvc.githubLogin();
    }
})