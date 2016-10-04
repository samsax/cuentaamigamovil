angular.module('starter')
	.controller('RegisterCtrl', function($scope, $ionicPopup, Users) {

		$scope.user = {};

		$scope.saveUser = function() {

			if (validPassword($scope.user.password, $scope.user.checkPassword)) {
				$scope.user.checkPassword = undefined;


				Users.save($scope.user, function(data) {
					//saves serializes $scope.entry object as JSON and sends as 
					console.log(data);
					$ionicPopup.alert({
						title: 'Sucesso',
						template: 'Usuario grabado con sucesso.'
					});
					$scope.user = {};
				}, function(error) {
					$ionicPopup.alert({
						title: 'Error',
						template: 'Erro al grabar. ' + error.statusText
					});
					console.log(error);
				});

			}
		}


		var validPassword = function(password, checkPassword) {
			if (password != checkPassword) {
				$ionicPopup.confirm({
					title: 'Error',
					template: 'Password estas diferente.'
				});
				return false;
			}
			return true;
		}

	});