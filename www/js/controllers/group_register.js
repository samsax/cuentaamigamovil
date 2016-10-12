angular.module('starter')
	.controller('GroupCtrl', function($scope, $ionicPopup, Group, USER_ROLES, Users, GroupUser, $filter) {


		$scope.group = {};

		// Image default (Menu.html)
		if ($scope.group.foto == undefined || $scope.group.foto == '') {
			$scope.showImage = true;
		} else {
			$scope.showImage = false;
		}

		$scope.changeImage = function() {
			if ($scope.group.foto == undefined || $scope.group.foto == '') {
				$scope.showImage = true;
			} else {
				$scope.showImage = false;
			}
		}

		$scope.saveGroup = function() {

			if (validPassword($scope.group.password, $scope.group.checkPassword)) {
				$scope.group.checkPassword = undefined;

				var d = new Date();
				$scope.group.fecha = d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDay();
				$scope.group.fecha += " " + d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds();

				Group.save($scope.group, function(data) {

					saveUserGrupo(data.id, data.nombreGrupo);
					$scope.group = {};
				}, function(error) {
					$ionicPopup.alert({
						title: 'Error',
						template: $filter('translate')('KEY_MSG_ERROR_RECORD') + error.statusText
					});
					console.log(error);
				});

			}
		}

		var saveUserGrupo = function(grupoId, grupoName) {
			GroupUser.save({
				grupoId: grupoId,
				usuarioId: USER_ROLES.id
			}, function(data) {
				//saves serializes $scope.entry object as JSON and sends as 
				updateGroupUser(grupoId, grupoName);
				$scope.group = {};
			}, function(error) {
				$ionicPopup.alert({
					title: $filter('translate')('KEY_ERROR'),
					template: $filter('translate')('KEY_MSG_ERROR_RECORD_TABLE_USER_GROUP') + error.statusText
				});
				console.log(error);
			});
		}

		var updateGroupUser = function(grupoId, groupName) {
			Users.updateGrupo({
				id: USER_ROLES.id,
				grupoid: grupoId
			}, function(success) {
				console.log(success);
				$ionicPopup.alert({
					title:  $filter('translate')('KEY_SUCESS'),
					template: $filter('translate')('KEY_MSG_RECORD_GROUP_CHANGE_USER_GROUP') + groupName + '.'
				});
			}, function(error) {
				console.log(error);
				$ionicPopup.alert({
					title: $filter('translate')('KEY_ERROR'),
					template: $filter('translate')('KEY_MSG_ERROR_CHANGE_USER_GROUP') + groupName + '.'
				});
			});
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