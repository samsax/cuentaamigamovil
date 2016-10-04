angular.module('starter')
	.controller('BillsToPayCtrl', function($scope, $http, $ionicPopup, USER_ROLES, SETTINGS_SYSTEM) {


		$scope.accounts = [];
		$scope.users = [];
		$scope.totalPago = {};
		$scope.totalDeb = {};
		$scope.checked = false;

		var searchHistory = function() {
			var url = SETTINGS_SYSTEM.url + '/Cuenta/getcuentas?id1=' + USER_ROLES.id + '&id2=' + $scope.accounts.userId;
			console.log(url);
			$http({
				method: 'GET',
				url: url,
			}).then(function successCallback(response) {
				console.log(response);
				$scope.accounts = response.data.id;
				
				loadUsers();

				//$scope.compareDate("2016-09-02 16:31:18", "2016-09-02 16:31:19");

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
			var userPago = $scope.totalPago.nombre,
				userDebe = $scope.totalDeb.nombre;
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
			$scope.checked = true;
			$http({
				method: 'GET',
				url: SETTINGS_SYSTEM.url + '/Usuarios',
			}).then(function successCallback(response) {
				$scope.users = response.data;


				$scope.accounts.sort(function(a, b) {
					return new Date(a.fecha).getTime() - new Date(b.fecha).getTime();
				});
				$scope.accounts.reverse();


				for (var i = 0; i < $scope.accounts.length; i++) {
					$scope.accounts[i].usuarioPago = searchUser($scope.accounts[i].usuarioPago);
					$scope.accounts[i].usuarioDebe = searchUser($scope.accounts[i].usuarioDebe);
				}


				if ($scope.accounts.length > 0) {
					$scope.totalPago.nombre = $scope.accounts[0].usuarioPago;
					$scope.totalDeb.nombre = $scope.accounts[0].usuarioDebe;
				}

				for (var i = 0; i < $scope.users.length; i++) {
					if (USER_ROLES.id == $scope.users[i].id) {
						$scope.users.splice(i, 1);
						console.log(i, $scope.users);
					}
				}

				if ($scope.accounts.length > 0) {
					calculaCuenta($scope.accounts);
				}else{
					limpiar();
				}


				$scope.checked = false;
			}, function errorCallback(response) {
				$scope.checked = false;
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

		$scope.update = function() {
			searchHistory();
		}

		Number.prototype.formatMoney = function(c, d, t) {
			var n = this,
				c = isNaN(c = Math.abs(c)) ? 2 : c,
				d = d == undefined ? "." : d,
				t = t == undefined ? "," : t,
				s = n < 0 ? "-" : "",
				i = parseInt(n = Math.abs(+n || 0).toFixed(c)) + "",
				j = (j = i.length) > 3 ? j % 3 : 0;
			return s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");
		};

		$scope.checkName = function(name) {
			if (name == "Indefinido") {
				return USER_ROLES.name;
			}
			return name;
		}

		$scope.formatDate = function(date) {
			return date.substring(0, (date.length - 5)).replace("T", " ");
		}

		$scope.compareDate = function(date1, date2) {
			return new Date(date1).getTime() - new Date(date2).getTime();
		}

	});