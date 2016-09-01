
mainApp.controller("ItemsController", function($localStorage, $routeParams, $scope, $location) {
	var self = this;
	self.currentNote = $routeParams.param1;
	
  	self.current = localStorage.getItem('currentUser');
	self.addItem = function(todoInput, privacy) {
		var items = [];
    	items = JSON.parse(localStorage.getItem('items'));
    	//alert(todoInput);
    	items.push({ todoText: todoInput, done: false, currentNote: self.currentNote, private: privacy});
    	localStorage.setItem('items', JSON.stringify(items));
    	self.items = JSON.parse(localStorage.getItem('items')).filter(function(element) {
			return element.currentNote == self.currentNote;
		});
	}

	self.items = JSON.parse(localStorage.getItem('items')).filter(function(element) {
		return element.currentNote == self.currentNote;
	});

	self.save = function() {
		localStorage.setItem('items', JSON.stringify(self.items));
		$location.url('/notes');
	}

	self.removeItem = function(index) {
		var items = [];
    	items = JSON.parse(localStorage.getItem('items'));
    	items.splice(index, 1);
    	localStorage.setItem('items', JSON.stringify(items));
		self.items = JSON.parse(localStorage.getItem('items')).filter(function(element) {
			return element.currentNote == self.currentNote;
		});
	}

});