angular.module('starter')
	.controller('MainCtrl', function($scope, USER_ROLES, $ionicPopup, $http, $filter, SETTINGS_SYSTEM, Cuenta) {

		$scope.users = [];
		$scope.usersChecked = [];
		$scope.account = {};
		$scope.checked = false;
		$scope.userSelected = {};

		$scope.onValueChanged = function(value) {
			//Value return a array objects with items selected
			console.log(value);
		};

		var loadUsers = function() {
			$http({
				method: 'GET',
				url: SETTINGS_SYSTEM.url + '/Usuarios',
			}).then(function successCallback(response) {
				$scope.userSelected.id = USER_ROLES.id;
				$scope.users = response.data;
			}, function errorCallback(response) {
				$ionicPopup.alert({
					title: 'Error',
					template: 'Error en el servidor.'
				});
			});
		}
		loadUsers();

		$scope.contabilizar = function() {

			if (checkedFields()) {

				$scope.usersChecked = [];
				var total = 0;
				angular.forEach($scope.users, function(value, key) {
					if (value.checked != undefined && value.checked) {
						total += 1;
					}
				});

				var d = new Date();
				var fecha = d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDay();

				fecha += " " + d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds();

				angular.forEach($scope.users, function(value, key) {
					if (value.checked != undefined && value.checked && value.id != $scope.userSelected.id) {
						$scope.usersChecked.push({
							usuarioPago: $scope.userSelected.id,
							usuarioDebe: value.id,
							cantidad: $scope.account.sueldo / total,
							fecha: fecha,
							comentario: $scope.account.comentario,
							flag: 1
						});
					}
				});

				save($scope.usersChecked);
			}
		}

		var checkedFields = function() {

			if ($scope.userSelected.id == null) {

				$ionicPopup.alert({
					title: 'Error',
					template: 'Selecione usuario que esta pagando.'
				});
				return false;
			}

			if ($scope.account.sueldo == undefined || $scope.account.sueldo == '') {

				$ionicPopup.alert({
					title: 'Error',
					template: 'Cuál valor deve ser pago.'
				});
				return false;
			}


			var bool = false;
			for (var i = 0; i < $scope.users.length; i++) {

				if ($scope.users[i].checked != undefined && $scope.users[i].checked) {
					var bool = true;
					break;
				}
			}
			if (!bool) {
				$ionicPopup.alert({
					title: 'Error',
					template: 'Selecione usuario que deve pagar.'
				});
				return false;
			}
			return true;
		}

		var save = function(users) {
			$scope.checked = true;

			Cuenta.saveCuenta(users[0], function(data) {
				$ionicPopup.alert({
					title: 'Éxito',
					template: 'Guardado con éxito.'
				});
				$scope.checked = false;
				limpiar();
			}, function(error) {
				$scope.checked = false;
				$ionicPopup.alert({
					title: 'Error',
					template: 'Error al guardar. ' + response
				});
			});

		};

		var limpiar = function() {
			$scope.usersChecked = [];
		}

	});