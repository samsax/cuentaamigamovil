angular.module('starter')
	.controller('MainCtrl', function($scope, USER_ROLES, $ionicPopup, $http, $filter, SETTINGS_SYSTEM, Cuenta, SendNotification, SETTINGS_FIREBASE) {

		$scope.users = [];
		$scope.usersChecked = [];
		$scope.account = {};
		$scope.checked = false;
		$scope.userSelected = {};
		$scope.notifications = [];


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
					title: $filter('translate')('KEY_ERROR'),
					template: $filter('translate')('KEY_MSG_ERROR_SERVER')
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

				for (var i = 0; i < $scope.usersChecked.length; i++) {
					save($scope.usersChecked[i]);
				}
			}
		}

		var checkedFields = function() {

			if ($scope.userSelected.id == null) {

				$ionicPopup.alert({
					title: $filter('translate')('KEY_ERROR'),
					template: $filter('translate')('KEY_MSG_ERROR_SELECT_USER')
				});
				return false;
			}

			if ($scope.account.sueldo == undefined || $scope.account.sueldo == '') {

				$ionicPopup.alert({
					title: $filter('translate')('KEY_ERROR'),
					template: $filter('translate')('KEY_MSG_VALUE_MUST_BE_PAY')
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
					template: $filter('translate')('KEY_MSG_ERROR_SELECT_USER')
				});
				return false;
			}
			return true;
		}

		var save = function(user) {
			$scope.checked = true;
			Cuenta.saveCuenta(user, function(data) {
				$ionicPopup.alert({
					title: $filter('translate')('KEY_SUCESS'),
					template: $filter('translate')('KEY_MSG_RECORD_SUCCESS')
				});
				$scope.checked = false;
				$scope.title = $filter('translate')('KEY_NAME_APLICACION_NORMAL');
				$scope.body = searchUser(data.usuarioDebe) + $filter('translate')('KEY_OWE') + $filter('translate')('KEY_SYMBOL_MONEY') + data. cantidad + $filter('translate')('KEY_TO') + searchUser(data.usuarioPago) + ". " + $filter('translate')('KEY_COMMENT') + " " + user.comentario;
				sendNotification($scope.title, $scope.body, []);
				limpiar();
			}, function(error) {
				$scope.checked = false;
				$ionicPopup.alert({
					title: 'Error',
					template: $filter('translate')('KEY_MSG_ERROR_RECORD')  + " " + error.statusText
				});
			});

		};

		var limpiar = function() {
			$scope.usersChecked = [];
		}

		var searchUser = function(userId) {
			for (var i = 0; i < $scope.users.length; i++) {
				if ($scope.users[i].id == userId) {
					return $scope.users[i].nombre;
				}
			}
			return "Indefinido";
		};

		var sendNotification = function(title, body, customData) {
			// customData = [{"param": "fecha", "value": "2016-10-02 08:56:21"}, {param: ... , value: ...}, {param: ... , value: ...} ]
			$scope.notification = {
				"recipient": "all",
				"isTopic": true,
				"title": title,
				"body": body,
				"apiKey": SETTINGS_FIREBASE.apiKey,
				"application": SETTINGS_FIREBASE.application,
				"customData": customData
			};
			SendNotification.send($scope.notification, function(data) {
				console.log(data);

			}, function(error) {
				$ionicPopup.alert({
					title: 'Error',
					template: $filter('translate')('KEY_MSG_ERROR_RECORD') + ' ' + error.statusText
				});
			});
		}

	});