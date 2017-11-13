(function() {
 'use strict';
 
angular
.module('app')
.controller('userController', Controller);

Controller.$inject = ['$scope', '$rootScope', 'userService', '$state', '$stateParams','Upload','$window'];

	function Controller($scope, $rootScope, userService, $state, $stateParams,Upload,$window) {
		$scope.users = [];
		//document.querySelectorAll(".headerNavBar")[0].style.display = "block";
		//$scope.baseUrl = $locaton.$$host;
		//$scope.baseUrl = $location.$$protocol + '://' + $location.$$host;
		if ($state.current.name == "login") {
			$rootScope.Title = "User Login";
			//document.querySelectorAll(".headerNavBar")[0].style.display = "none";	
			$scope.loginfun = function(user) {
				$scope.IsLogin = true;
				if ($scope.loginForm.$valid) {
					console.log(user);
				    userService.userLogin(user).then(function(res) {
						if (res.data == "created") {
							//$state.go("users");
						}
					}).catch(function(err) {
						console.log(err);
					});
				}
			};					
		}
		else if ($state.current.name == "register") {
			$rootScope.Title = "User Register";
			//document.querySelectorAll(".headerNavBar")[0].style.display = "none";	
			$scope.saveRegister = function(user) {
				$scope.IsSubmit = true;
				if ($scope.userForm.$valid) {
					console.log(user);
				    userService.userRegister(user).then(function(res) {
						if (res.data == "created") {
							$state.go("users");
						}
					}).catch(function(err) {
						console.log(err);
					});
				}
			};		
		}
		else if ($state.current.name == "users") {
			$rootScope.Title = "User Listing";
			userService.getUsers().then(function(res) {
				$scope.users = res.data;
			}).catch(function(err) {
				console.log(err);
			});

			$scope.deleteUser = function(id) {
				if (confirm('Are you sure to delete?')) {
					userService.deleteUser(id).then(function(res) {
						if (res.data == "deleted") {
							$state.go("users", {}, { reload: true });
						}
					}).catch(function(err) {
						console.log(err);
					});
				}
			};
		} else if ($state.current.name == "edit") {
			$rootScope.Title = "Edit User";
			var id = $stateParams.id;
			userService.getUser(id).then(function(res) {
				$scope.user = res.data;
			}).catch(function(err) {
				console.log(err);
			});

			$scope.saveData = function(user) {
				if ($scope.userForm.$valid) {
					userService.updateUser(user).then(function(res) {
						if (res.data == "updated") {
							$state.go("users");
						}
					}).catch(function(err) {
						console.log(err);
					});
				}
			};
		} else if ($state.current.name == "create") {
			$rootScope.Title = "Create User";
			$scope.saveData = function(user) {
				$scope.IsSubmit = true;
				if ($scope.userForm.$valid) {
					if ($scope.userForm.file.$valid && $scope.user.file) { //check if from is valid
			            Upload.upload({
				            url: 'http://localhost:3000/upload', //webAPI exposed to upload the file
				            data:{file:$scope.user.file} //pass file as data, should be user ng-model
				        })
				        .then(function (resp) { //upload function returns a promise
				            if(resp.data.error_code === 0){ //validate success
				            	user.file=resp.data.imgFilename;
							    userService.createUser(user).then(function(res) {
									if (res.data == "created") {
										$state.go("users");
									}
								}).catch(function(err) {
									console.log(err);
								});    
				            } else {
				                
				            }
				        });
		        		//$scope.upload($scope.user.file); //call upload function
			        }
					
				}
			};
			
			$scope.upload = function (file) {
		        Upload.upload({
		            url: 'http://localhost:3000/upload', //webAPI exposed to upload the file
		            data:{file:file} //pass file as data, should be user ng-model
		        }).then(function (resp) { //upload function returns a promise
		            if(resp.data.error_code === 0){ //validate success
		                $window.alert('Success ' + resp.config.data.file.name + 'uploaded. Response: ');
		            } else {
		                $window.alert('an error occured');
		            }
		        }, function (resp) { //catch error
		            console.log('Error status: ' + resp.status);
		            $window.alert('Error status: ' + resp.status);
		        }, function (evt) { 
		            console.log(evt);
		            var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
		            console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
		            $scope.progress = 'progress: ' + progressPercentage + '% '; // capture upload progress
		        });
		    };
		}
	}
})();