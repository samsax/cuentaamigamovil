    angular.module('starter')
      .factory('Users',
        function($resource, SETTINGS_SYSTEM) {
          var data = $resource(SETTINGS_SYSTEM.url + '/Usuarios/:id', {
            id: '@_id'
          }, {
            saveUser: {
              method: 'POST',
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              }
            },
            update: {
              method: 'PUT'
            },
            findById: {
              method: 'GET',
              isArray: false,
              globalError: false,
            },
            findAll: {
              method: 'GET',
              isArray: true,
              globalError: false,
            },
            logIn: {
              url: SETTINGS_SYSTEM.url + '/Usuarios/getlogin?nickname=:nickname&password=:password',
              method: 'GET',
              params: {
                nickname: '@nickname',
                password: '@password'
              }
            }
          });
          return data;
        }
      )
      .factory('Cuenta',
        function($resource, SETTINGS_SYSTEM) {
          var data = $resource(SETTINGS_SYSTEM.url + '/Cuenta/:id', {
            id: '@_id'
          }, {
            saveCuenta: {
              method: 'POST',
            },
            update: {
              method: 'PUT'
            },
            findById: {
              method: 'GET',
              isArray: false,
              globalError: false,
            },
            findAll: {
              method: 'GET',
              isArray: true,
              globalError: false,
            }
          });
          return data;
        }
      )