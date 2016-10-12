angular.module('starter')
    .controller('LoginCtrl', function($scope, $ionicModal, $timeout, USER_ROLES, $http, $ionicPopup, $filter, $state, Users, $cordovaFacebook) {

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
            Users.logIn({
                nickname: user,
                password: password
            }, function(response) {
                var user = response.id;
                if (user != null) {
                    USER_ROLES.id = user.id;
                    USER_ROLES.name = user.nombre;
                    USER_ROLES.user_name = user.nickname;
                    USER_ROLES.email = user.correo;
                    USER_ROLES.photo = user.photo;
                    USER_ROLES.token = '';
                    USER_ROLES.grupoid = user.grupoid;
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
                    title:  $filter('translate')('KEY_ERROR'),
                    template: $filter('translate')('KEY_MSG_LOGIN_NOT_POSSIBLE')
                });

            });

        };


        $scope.loginStatus = function() {
            $cordovaFacebook.getLoginStatus()
                .then(function(success) {
                    if (success.status == 'connected') {
                        USER_ROLES.token = success.authResponse.userID;
                        $scope.apiFacebook();
                    }
                    /*
                    { authResponse: {
                        userID: "12345678912345",
                        accessToken: "kgkh3g42kh4g23kh4g2kh34g2kg4k2h4gkh3g4k2h4gk23h4gk2h34gk234gk2h34AndSoOn",
                        session_Key: true,
                        expiresIn: "5183738",
                        sig: "..."
                      },
                      status: "connected"
                    }
                    */
                }, function(error) {
                    // error
                });
        }


        $scope.loginFacebook = function() {


            $cordovaFacebook.login(["public_profile", "email", "user_friends"])
                .then(function(success) {
                    USER_ROLES.token = success.authResponse.accessToken;
                    var credential = firebase.auth.FacebookAuthProvider.credential(success.authResponse.accessToken);
                    firebase.auth().signInWithCredential(credential).then(function(success) {
                        console.log(success);
                        $scope.successFirebase = success;
                        Users.getWithCorreo({
                            correo: success.email
                        }, function(success) {
                            var user = success.id;
                            if (user.length == 0) {
                                console.log($scope.successFirebase);
                                var newUser = {
                                    nombre: $scope.successFirebase.displayName,
                                    nickname: $scope.successFirebase.email,
                                    password: null,
                                    foto: $scope.successFirebase.photoURL,
                                    correo: $scope.successFirebase.email,
                                    grupoid: null
                                };
                                Users.save(newUser, function(data) {
                                    //saves serializes $scope.entry object as JSON and sends as 
                                    $state.reload();
                                    $ionicPopup.alert({
                                        title: 'Sucesso',
                                        template: 'Bienvenido ' + data.nombre + '.'
                                    });
                                }, function(error) {
                                    $ionicPopup.alert({
                                        title: $filter('translate')('KEY_ERROR'),
                                        template: $filter('translate')('KEY_MSG_ERROR_FIRST_LOGIN')
                                    });
                                    console.log(error);
                                });
                            } else {
                                USER_ROLES.id = user[0].id;
                                USER_ROLES.name = user[0].nombre;
                                USER_ROLES.user_name = user[0].nickname;
                                USER_ROLES.email = user[0].correo;
                                USER_ROLES.photo = user[0].foto;
                                USER_ROLES.grupoid = user[0].grupoid;
                                USER_ROLES.authorized = true;
                                $state.reload();
                            }
                            console.log(success);
                        }, function(error) {
                            console.log(error);
                        });

                    }, function(error) {
                        console.log(error);
                    });

                    USER_ROLES.Token = success.authResponse.accessToken;
                    USER_ROLES.id = success.authResponse.userID;

                }, function(error) {
                    // error
                    $ionicPopup.alert({
                        title: $filter('translate')('KEY_ERROR'),
                        template: $filter('translate')('KEY_MSG_ERROR_CONEXTION')
                    });
                });

        }

        $scope.apiFacebook = function() {
            //me/friends?fields=picture.width(100).height(100)
            $cordovaFacebook.api('/me?fields=first_name, last_name, picture.type(large), email', ["public_profile", "email"])
                .then(function(success) {


                        USER_ROLES.name = success.first_name + ' ' + success.last_name;
                        USER_ROLES.user_name = success.first_name;
                        USER_ROLES.email = success.email;
                        USER_ROLES.photo = success.picture.data.url;
                        USER_ROLES.authorized = true;
                        $state.reload();
                    },
                    function(error) {
                        //error
                        console.log(error);
                    });
        }

        $scope.loginGoogle = function() {
            var provider = new firebase.auth.GoogleAuthProvider();

            firebase.auth().signInWithPopup(provider).then(function(result) {
                // This gives you a Google Access Token. You can use it to access the Google API.
                var token = result.credential.accessToken;
                console.log(token);
                // The signed-in user info.
                setUserRoles(result.user, token);

                $state.reload();
                // ...
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
                    title: $filter('translate')('KEY_ERROR'),
                    template: error.message
                });
            });
        }

        $scope.logout = function() {
            USER_ROLES.authorized = false;
            $cordovaFacebook.logout()
                .then(function(success) {
                    $ionicPopup.alert({
                        title: 'Error',
                        template: $filter('translate')('KEY_MSG_LOGOUT_USER')
                    });
                }, function(error) {
                    $ionicPopup.alert({
                        title: $filter('translate')('KEY_ERROR'),
                        template: $filter('translate')('KEY_MSG_ERROR_LOGOUT_USER')
                    });
                });
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


        var setUserRoles = function(user, token) {
            USER_ROLES.id = user.id;
            USER_ROLES.name = user.displayName;
            USER_ROLES.user_name = user.email;
            USER_ROLES.email = user.email;
            USER_ROLES.photo = user.photoURL;
            console.log(user.photoURL);
            USER_ROLES.password = '';
            USER_ROLES.token = token;
            USER_ROLES.authorized = true;
        }

    });