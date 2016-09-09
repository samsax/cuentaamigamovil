angular.module('starter')
	.controller('MainCtrl', function($scope, USER_ROLES, $ionicPopup, $http) {

		$scope.users = [];
		$scope.usersChecked = [];
		$scope.account = {};

		$scope.onValueChanged = function(value){
	        //Value return a array objects with items selected
	        console.log(value);
		};

		var loadUsers = function() {
			$http({
				method: 'GET',
				url: 'http://cuentaamiga-samsax.c9users.io:8080/api/Usuarios',
			}).then(function successCallback(response) {
				$scope.users = response.data;
			}, function errorCallback(response) {
				$ionicPopup.alert({
					title: 'Error',
					template: 'Error en el servidor.'
				});
			});
		}
		loadUsers();

		$scope.contabilizar = function(){
			$scope.usersChecked = [];
			var total = 0;
			angular.forEach($scope.users, function(value, key) {
				if(value.checked != undefined && value.checked){
			   		total += 1;
				}
			});

			angular.forEach($scope.users, function(value, key) {
				if(value.checked != undefined && value.checked && value.id != USER_ROLES.id){
			   		$scope.usersChecked.push({usuarioPago: USER_ROLES.id, usuarioDebe: value.id, cantidad: $scope.account.sueldo/total});
				}
			});			
			console.log($scope.usersChecked);
			salve($scope.usersChecked);
		}

		var salve = function(users){
			$http({
			  method: 'POST',
			  url: 'http://cuentaamiga-samsax.c9users.io:8080/api/Cuenta',
			  data: users
			}).then(function successCallback(response) {
			    $ionicPopup.alert ({
			     title: 'Éxito',
			     template: 'Guardado con éxito.'
				});
			}, function errorCallback(response) {
				    $ionicPopup.alert({
				     title: 'Error',
				     template: 'Error al guardar. ' + response
					});
			});
		};

	});
