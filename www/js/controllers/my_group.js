angular.module('starter')
	.controller('MyGroupCtrl', function($scope, $ionicPopup, Users, USER_ROLES, GroupUser, $filter, $cordovaFacebook, $ionicModal) {


		$scope.groups = [];
		GroupUser.getgrupos({
			id1: USER_ROLES.id
		}, function(success) {
			for (var i = 0; i < success.id.length; i++) {
				if (success.id[i].grupos != undefined) {
					$scope.groups.push(success.id[i].grupos);
				}
			}
		}, function(error) {

		});

		$scope.showImage = function(imageUrl) {
			return imageUrl != null ? true : false;
		}

		$scope.showImageDefault = function(imageUrl) {
			return imageUrl == null ? true : false;
		}

		$scope.groupSelected = function(groupId, groupName) {

			var myPopup = $ionicPopup.show({

				title: $filter('translate')('KEY_CHOOSE_OPTION'),
				subTitle: groupName,
				scope: $scope,
				buttons: [{
					text: '<b>' + $filter('translate')('KEY_ADD_USER') + '</b>',
					type: 'button-positive',
					onTap: function(e) {
						$scope.getFriendsApiFacebook();
						$scope.modal.show();
					}
				}, {
					text: $filter('translate')('KEY_CHANGE_USER'),
					type: 'button-calm',
					onTap: function(e) {
						changeGroup(groupId, groupName);
					}
				}]
			});

		}

		var updateGroup = function(grupoId, groupName) {
			Users.updateGrupo({
				id: USER_ROLES.id,
				grupoid: grupoId
			}, function(success) {
				console.log(success);
				$ionicPopup.alert({
					title: $filter('translate')('KEY_SUCESS'),
					template: $filter('translate')('KEY_CHANGE_USER_GROUP') + ' ' + groupName + '.'
				});
			}, function(error) {
				console.log(error);
				$ionicPopup.alert({
					title: $filter('translate')('KEY_ERROR'),
					template: $filter('translate')('KEY_ERROR_CHANGE_USER_GROUP') + ' ' + groupName + '.'
				});
			});
		}

		var changeGroup = function(groupId, groupName) {
			// A confirm dialog			 
			var confirmPopup = $ionicPopup.confirm({
				title: $filter('translate')('KEY_CHANGE_USER'),
				template: $filter('translate')('KEY_MSG_DO_YOU_WANT_TO_CHANGE_GROUP') + ' ' + groupName + '?'
			});

			confirmPopup.then(function(res) {
				if (res) {
					updateGroup(groupId, groupName);
				} else {
					//console.log('Grupo no Cambiado');
				}
			});
		}

		$scope.getFriendsApiFacebook = function() {
			//me/friends?fields=picture.width(100).height(100)
			$cordovaFacebook.api('/me/friends?access_token=' + USER_ROLES.token, ["public_profile", "email"])
				.then(function(success) {
						$scope.friendsFacebook = success.data;
					},
					function(error) {
						//error
						console.log(error);
					});
		}


		//MODAL FRIENDS
		$scope.friendsFacebook = [];
		$ionicModal.fromTemplateUrl('friends-modal.html', {
			scope: $scope,
			animation: 'slide-in-up'
		}).then(function(modal) {
			$scope.modal = modal;
		});
		$scope.openModal = function() {
			$scope.modal.show();
		};
		$scope.closeModal = function() {
			$scope.modal.hide();
		};
		// Cleanup the modal when we're done with it!
		$scope.$on('$destroy', function() {
			$scope.modal.remove();
		});
		// Execute action on hide modal
		$scope.$on('modal.hidden', function() {
			// Execute action
		});
		// Execute action on remove modal
		$scope.$on('modal.removed', function() {
			// Execute action
		});

	});