angular.module('starter')
	.controller('RegisterCtrl', function($scope, $ionicPopup, Users, $filter) {

		$scope.user = {};

		// Image default (Menu.html)
		if ($scope.user.photo == undefined || $scope.user.foto == '') {
			$scope.showImage = true;
		} else {
			$scope.showImage = false;
		}

		$scope.changeImage = function() {
			if ($scope.user.foto == undefined || $scope.user.foto == '') {
				$scope.showImage = true;
			} else {
				$scope.showImage = false;
			}
		}

		$scope.saveUser = function() {

			if (validPassword($scope.user.password, $scope.user.checkPassword)) {
				$scope.user.checkPassword = undefined;


				Users.save($scope.user, function(data) {
					//saves serializes $scope.entry object as JSON and sends as 
					console.log(data);
					$ionicPopup.alert({
						title: $filter('translate')('KEY_SUCESS'),
						template: $filter('translate')('KEY_MSG_SUCESS_RECORD_USER')
					});
					$scope.user = {};
				}, function(error) {
					$ionicPopup.alert({
						title: $filter('translate')('KEY_ERROR'),
						template: $filter('translate')('KEY_MSG_ERROR_RECORD')
					});
					console.log(error);
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