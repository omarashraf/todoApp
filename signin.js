var app = angular.module('myApp', []);
app.controller('ControllerA', function($scope,$rootScope) {
    $scope.increment = 0;
    $scope.text = '';
    $scope.add = function() {
        $scope.increment++; 
    }
    /*$scope.$on('hasIncremented', function(event) {
        $scope.increment++; 
    });*/
    
    $scope.$watch('increment', function() {
        $scope.text = 'Your increment now =' + $scope.increment;
    });
});