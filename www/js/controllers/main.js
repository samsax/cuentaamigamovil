angular.module('starter')
	.controller('MainCtrl', function($scope, USER_ROLES, $ionicPopup, $http) {

		$scope.users = [{ 'id': '1', 'name':'Victor Cesar'}, { 'id': '2','name':'Prash'}, { 'id': '3', 'name':'Zoara'}, { 'id': '4','name':'Daniel'} ];
		$scope.usersChecked = [];
		$scope.account = {};

		$scope.onValueChanged = function(value){
	        //Value return a array objects with items selected
	        console.log(value);
		};

		$scope.contabilizar = function(){
			$scope.usersChecked = [];
			var total = 0;
			angular.forEach($scope.users, function(value, key) {
				if(value.checked != undefined && value.checked){
			   		total += 1;
				}
			});

			angular.forEach($scope.users, function(value, key) {
				if(value.checked != undefined && value.checked){
			   		$scope.usersChecked.push({id_pago: USER_ROLES.id, id_debe: value.id, cuenta: $scope.account.sueldo/total});
				}
			});
			salve($scope.usersChecked);
		}

		var salve = function(users){
			$http({
			  method: 'POST',
			  url: 'http://cuentaamiga-samsax.c9users.io:8080/api/Usuarios'
			}).then(function successCallback(response) {
			    $ionicPopup.confirm({
			     title: 'Éxito',
			     template: 'Grabado con éxito.'
				});
			}, function errorCallback(response) {
				    $ionicPopup.confirm({
				     title: 'Error',
				     template: 'Error al grabar. ' + response
					});
			});
		};

	});