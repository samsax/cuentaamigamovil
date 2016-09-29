angular.module('starter')
	.controller('RegisterCtrl', function($scope, $http, $ionicPopup, SETTINGS_SYSTEM) {

		$scope.user = {};

		$scope.salveUser = function() {

			if (validPassword($scope.user.password, $scope.user.checkPassword)) {
				$scope.user.checkPassword = undefined;

				$http({
					method: 'POST',
					url: SETTINGS_SYSTEM + '/Usuarios',
					data: $scope.user
				}).then(function successCallback(response) {
					$ionicPopup.confirm({
						title: 'Éxito',
						template: 'Grabado con éxito.'
					});
				}, function errorCallback(response) {
					$ionicPopup.confirm({
						title: 'Error',
						template: 'Error al tentar grabar.'
					});
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


