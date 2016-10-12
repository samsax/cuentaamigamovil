angular.module('starter')
    .controller('ProfileCtrl', function ($scope, USER_ROLES, $ionicPopup, Users, $filter) {


    	$scope.user = {};
    	$scope.user.id = USER_ROLES.id;
    	$scope.user.nombre = USER_ROLES.name;
    	$scope.user.nickname = USER_ROLES.user_name;
    	$scope.user.correo = USER_ROLES.email;
    	$scope.user.foto = USER_ROLES.photo;

    	 // Image default (Menu.html)
        if (USER_ROLES.photo == undefined) {
            $scope.showImage = true;
        } else {
            $scope.showImage = false;
        }



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
						title: $filter('translate')('KEY_SUCESS'),
						template: $filter('translate')('KEY_MSG_UPDATE_SUCESS')
					});
				}, function(error) {
					$ionicPopup.alert({
						title: 'Error',
						template: $filter('translate')('KEY_MSG_ERROR_RECORD') + error
					});
					
				});			
			}
			
		}


		var validPassword = function(password, checkPassword) {
			if (password != checkPassword) {
				$ionicPopup.confirm({
					title: $filter('translate')('KEY_ERROR'),
					template: $filter('translate')('KEY_MSG_INCORRECT_PASSWORD')
				});
				return false;
			}
			return true;
		}


    });
