angular.module('starter')
	.controller('HistoryCtrl', function($scope, $http, $ionicPopup) {

		$scope.accounts = [];
		$scope.users = [];
		$scope.totalPago = {};
		$scope.totalDeb = {};

		var searchHistory = function() {
			$http({
				method: 'GET',
				url: 'http://cuentaamiga-samsax.c9users.io:8080/api/Cuenta/getcuentas?id1=2&id2=3',
			}).then(function successCallback(response) {
				$scope.accounts = response.data.id;
				calculaCuenta($scope.accounts);
				loadUsers();

			}, function errorCallback(response) {
				$ionicPopup.alert({
					title: 'Error',
					template: 'Error en el servidor.'
				});
			});

		}


		var calculaCuenta = function(){
			$scope.totalPago.cantidad = 0;
			$scope.totalDeb.cantidad = 0;

			var totalPago = 0, totalDeb = 0;
			var userPago = $scope.accounts[0].usuarioPago,
				userDebe = $scope.accounts[0].usuarioDebe;
			for (var i = 0; i < $scope.accounts.length; i++) {
				if(userPago == $scope.accounts[i].usuarioPago){
					totalPago += $scope.accounts[i].cantidad;
				}else{
					totalDeb += $scope.accounts[i].cantidad;
				}
			}
			$scope.totalPago.cantidad = totalPago - totalDeb;
			$scope.totalDeb.cantidad = totalDeb - totalPago;
		}

		var loadUsers = function() {
			$http({
				method: 'GET',
				url: 'http://cuentaamiga-samsax.c9users.io:8080/api/Usuarios',
			}).then(function successCallback(response) {
				$scope.users = response.data;

				for (var i = 0; i < $scope.accounts.length; i++) {
					$scope.accounts[i].usuarioPago = searchUser($scope.accounts[i].usuarioPago);
					$scope.accounts[i].usuarioDebe = searchUser($scope.accounts[i].usuarioDebe);
				}

				$scope.totalPago.nombre = $scope.accounts[0].usuarioPago;
				$scope.totalDeb.nombre = $scope.accounts[0].usuarioDebe;
			}, function errorCallback(response) {
				$ionicPopup.alert({
					title: 'Error',
					template: 'Error en el servidor.'
				});
			});
		}
		searchHistory();


		var searchUser = function(userId){
			for (var i = 0; i < $scope.users.length; i++) {
				if($scope.users[i].id == userId){
					return $scope.users[i].nombre;
				}
			}
			return "Indefinido";
		};

	});