angular.module('starter')
	.controller('HistoryCtrl', function($scope) {

		$scope.accounts = [{ 'id_user1':'Victor', 'id_user2':'Samuel', 'cuenta':'30.00' }, { 'id_user1':'Victor', 'id_user2':'Samuel', 'cuenta':'50.00' }, { 'id_user1':'Samuel', 'id_user2':'Victor', 'cuenta':'30.00' } ];

		

	});