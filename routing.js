var mainApp = angular.module("mainApp", ['ngRoute', 'ngStorage', 'ngResource', 'ngAnimate', 'ngSanitize', 'ui.bootstrap']);

mainApp.config(function($routeProvider) {
	$routeProvider
		.when('/home', {
			templateUrl: 'testNG.html',
			controller: 'RegisterController'
		})
		.when('/notes', {
			templateUrl: 'notes.html',
			controller: 'NotesController'
		})
		.when('/notes/viewOnly', {
			templateUrl: 'notesViewOnly.html',
			controller: 'NotesViewController'
		})
		.otherwise({
			redirectTo: '/home'
		});
});

