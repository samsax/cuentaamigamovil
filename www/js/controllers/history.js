angular.module('starter')
	.controller('HistoryCtrl', function($scope, $http, $ionicPopup, USER_ROLES) {

		$scope.accounts = [];
		$scope.users = [];
		$scope.totalPago = {};
		$scope.totalDeb = {};

		var searchHistory = function() {
			var url = 'http://cuentaamiga-samsax.c9users.io:8080/api/Cuenta/getcuentas?id1=' + USER_ROLES.id + '&id2=' + $scope.accounts.userId;
			console.log(url);
			$http({
				method: 'GET',
				url: url,
			}).then(function successCallback(response) {
				console.log(response);
				$scope.accounts = response.data.id;
				if ($scope.accounts.length > 0) {
					calculaCuenta($scope.accounts);
				} else {
					limpiar();
				}
				loadUsers();

			}, function errorCallback(response) {
				$ionicPopup.alert({
					title: 'Error',
					template: 'Error en el servidor.'
				});
			});

		}


		var calculaCuenta = function() {
			$scope.totalPago.cantidad = 0;
			$scope.totalDeb.cantidad = 0;

			var totalPago = 0,
				totalDeb = 0;
			var userPago = $scope.accounts[0].usuarioPago,
				userDebe = $scope.accounts[0].usuarioDebe;
			for (var i = 0; i < $scope.accounts.length; i++) {
				if (userPago == $scope.accounts[i].usuarioPago) {
					totalPago += $scope.accounts[i].cantidad;
				} else {
					totalDeb += $scope.accounts[i].cantidad;
				}
			}

			$scope.totalPago.cantidad = totalPago - totalDeb;
			$scope.totalDeb.cantidad = totalDeb - totalPago;

			$scope.totalPago.cantidad = ($scope.totalPago.cantidad).formatMoney(2, '.', ',');
			$scope.totalDeb.cantidad = ($scope.totalDeb.cantidad).formatMoney(2, '.', ',');
		}

		var loadUsers = function() {
			$http({
				method: 'GET',
				url: 'http://cuentaamiga-samsax.c9users.io:8080/api/Usuarios',
			}).then(function successCallback(response) {
				$scope.users = response.data;

				for (var i = 0; i < $scope.users.length; i++) {
					if(USER_ROLES.id == $scope.users[i].id){
						$scope.users.splice(i, 1);
						console.log(i, $scope.users);
					}
				}

				for (var i = 0; i < $scope.accounts.length; i++) {
					$scope.accounts[i].usuarioPago = searchUser($scope.accounts[i].usuarioPago);
					$scope.accounts[i].usuarioDebe = searchUser($scope.accounts[i].usuarioDebe);
				}

				if ($scope.accounts.length > 0) {
					$scope.totalPago.nombre = $scope.accounts[0].usuarioPago;
					$scope.totalDeb.nombre = $scope.accounts[0].usuarioDebe;
				}
			}, function errorCallback(response) {
				$ionicPopup.alert({
					title: 'Error',
					template: 'Error en el servidor.'
				});
			});
		}
		searchHistory();

		var limpiar = function() {
			$scope.accounts.totalPago = {};
			$scope.accounts.totalDeb = {};
			$scope.users = [];
			$scope.totalPago = {};
			$scope.totalDeb = {};
		}

		var searchUser = function(userId) {
			for (var i = 0; i < $scope.users.length; i++) {
				if ($scope.users[i].id == userId) {
					return $scope.users[i].nombre;
				}
			}
			return "Indefinido";
		};

		$scope.pagar = function() {
			searchHistory();
		}

		Number.prototype.formatMoney = function(c, d, t){
		var n = this, 
		    c = isNaN(c = Math.abs(c)) ? 2 : c, 
		    d = d == undefined ? "." : d, 
		    t = t == undefined ? "," : t, 
		    s = n < 0 ? "-" : "", 
		    i = parseInt(n = Math.abs(+n || 0).toFixed(c)) + "", 
		    j = (j = i.length) > 3 ? j % 3 : 0;
		   return s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");
		 };

	});