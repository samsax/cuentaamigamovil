angular.module('starter')
    .controller('LoginCtrl', function($scope, $ionicModal, $timeout, USER_ROLES, $http, $ionicPopup, $filter, $state, Users) {

        $scope.checked = false;
        // Form data for the login modal
        $scope.loginData = {};

        // Image default (Menu.html)
        if (USER_ROLES.photo == undefined) {
            $scope.showImage = true;
        } else {
            $scope.showImage = false;
        }


        // Triggered in the login modal to close it
        $scope.closeLogin = function() {
            $scope.modal.hide();
        };

        // Open the login modal
        $scope.login = function(user, password) {

            $scope.checked = true;
            Users.logIn({nickname:user, password: password}, function(response) {
                var user = response.id;
                 if (user != null) {
                     USER_ROLES.id = user.id;
                     USER_ROLES.name = user.nombre;
                     USER_ROLES.user_name = user.nickname;
                     USER_ROLES.email = user.correo;
                     USER_ROLES.password = user.password;
                     USER_ROLES.photo = user.photo;
                     USER_ROLES.authorized = true;
                 } else {
                     $ionicPopup.alert({
                         title: 'Error',
                         template: $filter('translate')('KEY_MSG_USER_NOT_FOUND')
                     });
                 }
                 $scope.checked = false;
            }, function(error) {
                $scope.checked = false;
                 $ionicPopup.alert({
                     title: 'Error',
                     template: 'No es possible logar. Data: ' + response.data + '. Status Text: ' + response.statusText
                 });

            });

        };


        $scope.loginFacebook = function(authMethod) {
            var provider = new firebase.auth.FacebookAuthProvider();
            firebase.auth().signInWithPopup(provider).then(function(result) {

                // This gives you a Facebook Access Token. You can use it to access the Facebook API.
                var token = result.credential.accessToken;
                // The signed-in user info.
                var user = result.user;
                console.log(user);

                //USER_ROLES.id = response.data.id.id;
                USER_ROLES.name = user.displayName;
                USER_ROLES.user_name = user.email;
                USER_ROLES.email = user.email;
                USER_ROLES.photo = user.photoURL;
                USER_ROLES.password = '';
                USER_ROLES.token = token;
                USER_ROLES.authorized = true;

                $state.reload();

            }).catch(function(error) {

                console.log(error);
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
                // The email of the user's account used.
                var email = error.email;
                // The firebase.auth.AuthCredential type that was used.
                var credential = error.credential;
                // ...
                $ionicPopup.alert({
                    title: 'Error',
                    template: error.message
                });
            });

        }

        $scope.logout = function() {
            console.log("Salindo");
            USER_ROLES.authorized = false;
        };

        // Perform the login action when the user submits the login form
        $scope.doLogin = function() {
            console.log('Doing login', $scope.loginData);

            // Simulate a login delay. Remove this and replace with your login
            // code if using a login system
            $timeout(function() {
                $scope.closeLogin();
            }, 1000);
        };

    });