(function() {
 'use strict';
 
 angular.module('app', ["ui.router","ngFileUpload"])
 .config(function($stateProvider, $urlRouterProvider) {
 	
 	$urlRouterProvider.otherwise("/");
	 
	 	$stateProvider.state("login", {
	 		url: "/",
	 		templateUrl: "/views/login.html",
	 		controller: "userController"
	 	})
	 	.state("register", {
	 		url: "/register",
	 		templateUrl: "/views/register.html",
	 		controller: "userController"
	 	})
	 	.state("users", {
	 		url: "/users",
	 		templateUrl: "/views/user/list.html",
	 		controller: "userController"
	 	})
	 	.state("create", {
	 		url: "/create",
	 		templateUrl: "/views/user/create.html",
	 		controller: "userController"
	 	})
	 	.state("edit", {
	 		url: "/edit/:id",
	 		templateUrl: "/views/user/create.html",
	 		controller: "userController"
	 	})
	 	.state("details", {
	 		url: "/details/:id",
	 		templateUrl: "/views/user/details.html",
	 	controller: "userController"
	 	});
	})
	.constant("globalConfig", {
	 	apiAddress: 'http://localhost:3000/api',
	 	hostAddress: 'http://localhost:3000'
	});

})();