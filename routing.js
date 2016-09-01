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
		/*.when('/note', {
			templateUrl: 'note.html',
			controller: 'ItemsController'
		})*/
		.when('/note/:param1', {
			templateUrl: 'note.html',
			controller: 'ItemsController'
		}) 
		.when('/note/viewOnly/:param1', {
			templateUrl: 'noteViewOnly.html',
			controller: 'ItemsViewController'
		}) 
		.otherwise({
			redirectTo: '/home'
		});
});

