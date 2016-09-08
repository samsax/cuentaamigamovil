angular.module('starter')
	.controller('HistoryCtrl', function($scope, $http, $ionicPopup) {

		$scope.accounts = [];

		var searchHistory = function() {
			$http({
				method: 'GET',
				url: 'http://cuentaamiga-samsax.c9users.io:8080/api/Cuenta',
			}).then(function successCallback(response) {
				$scope.accounts = response.data;
			}, function errorCallback(response) {
				$ionicPopup.confirm({
					title: 'Error',
					template: 'Error en el servidor.'
				});
			});
		}
		searchHistory();

	});