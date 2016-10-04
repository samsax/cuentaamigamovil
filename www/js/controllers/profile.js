angular.module('starter')
    .controller('ProfileCtrl', function ($scope, USER_ROLES, $ionicPopup, Users) {


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

				Users.update($scope.user, function(data) {
					//saves serializes $scope.entry object as JSON and sends as 
					console.log(data);
					$ionicPopup.alert({
						title: 'Éxito',
						template: 'Atualizado con éxito.'
					});
				}, function(error) {
					$ionicPopup.alert({
						title: 'Error',
						template: 'Error al tentar grabar. ' + error
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
