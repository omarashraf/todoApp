
mainApp.controller("ItemsViewController", ['$scope', '$routeParams', function($localStorage, $routeParams, $scope) {
	var self = this;
	self.currentNote = $routeParams.param1;
  	self.current = localStorage.getItem('currentUser');

	self.items = JSON.parse(localStorage.getItem('items')).filter(function(element) {
		return element.currentNote == self.currentNote && element.private == false;
	});
}]);