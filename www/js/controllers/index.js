angular.module('starter')
    .controller('IndexCtrl', function ($scope) {

    	$scope.userRegister = false;
        $scope.lostPassword = false;

    	$scope.register = function() {
    		$scope.userRegister = true;
        }

        $scope.forgotPassword = function(){
            $scope.lostPassword = true;
        }

        $scope.returnMain = function() {
        	$scope.userRegister = false;
            $scope.lostPassword = false;
        }


    });
