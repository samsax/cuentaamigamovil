angular.module('starter')
    .controller('ProfileCtrl', function ($scope, USER_ROLES, $http, $ionicPopup, SETTINGS_SYSTEM) {


    	$scope.user = {};
    	$scope.user.id = USER_ROLES.id;
    	$scope.user.nombre = USER_ROLES.name;
    	$scope.user.nickname = USER_ROLES.user_name;
    	$scope.user.correo = USER_ROLES.email;


		$scope.update = function() {

			var bool = true;
			if($scope.user.password == undefined || $scope.user.password == '' ){
				$scope.user.password = USER_ROLES.password;
			}else{
				bool = validPassword($scope.user.password, $scope.user.checkPassword);
			}
			
			if(bool){
				$scope.user.checkPassword = undefined;

				console.log($scope.user);

				$http({
					method: 'PUT',
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
