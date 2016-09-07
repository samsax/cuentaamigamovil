angular.module('starter')
	.controller('MainCtrl', function($scope, USER_ROLES) {

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

		}

	});