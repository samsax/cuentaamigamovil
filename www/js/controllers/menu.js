angular.module('starter')
	.controller('MenuCtrl', function($scope, USER_ROLES) {
		$scope.user = USER_ROLES;
	});