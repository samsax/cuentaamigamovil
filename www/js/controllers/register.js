angular.module('starter')
    .controller('RegisterCtrl', function ($scope, $http, $ionicPopup) {

    	$scope.users = {};
		 
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
			     template: 'Error al tentar grabar.'
				});
		  });
    
    });
