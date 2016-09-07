angular.module('starter')
    .controller('RegisterCtrl', function ($scope, $http) {

    	$scope.users = {};

        $http.post("http://cuentaamiga-samsax.c9users.io:8080/api/Usuarios")
        .success(function(response) {
        	$scope.users = response
            console.log(response);
        });
    
    });
