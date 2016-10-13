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
            },
            updateGrupo: {
              url: SETTINGS_SYSTEM.url + '/Usuarios/updateGrupo?id=:id&grupoid=:grupoid',
              method: 'GET',
              params: {
                id: '@id',
                grupoid: '@grupoid'
              }
            },
            getWithCorreo: {
              url: SETTINGS_SYSTEM.url + '/Usuarios/getWithCorreo?correo=:correo',
              method: 'GET',
              params: {
                correo: '@correo'
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
      .factory('Group',
        function($resource, SETTINGS_SYSTEM) {
          var data = $resource(SETTINGS_SYSTEM.url + '/Grupos/:id', {
            id: '@_id'
          }, {
            save: {
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
      .factory('GroupUser',
        function($resource, SETTINGS_SYSTEM) {
          var data = $resource(SETTINGS_SYSTEM.url + '/GrupoUsuarios/:id', {
            id: '@_id'
          }, {
            save: {
              method: 'POST',
            },
            getgrupos: {
              url: SETTINGS_SYSTEM.url + '/GrupoUsuarios/getgrupos?id1=:id1',
              method: 'GET',
              params: {
                id1: '@id1'
              }
            },
            getUsersByGroup: {
              url: SETTINGS_SYSTEM.url + '/GrupoUsuarios/getusuarios?id1=:id1',
              method: 'GET',
              params: {
                id1: '@id1'
              }
            }
          });
          return data;
        })
      .factory('SendNotification',
        function($resource, SETTINGS_NOTIFICATION) {
          var data = $resource(SETTINGS_NOTIFICATION.url, null, {
            send: {
              url: 'https://cordova-plugin-fcm.appspot.com/push/freesend',
              method: 'POST',
              params: {
                recipient: "@recipient",
                isTopic: "@isTopic",
                title: "@title",
                body: "@body",
                apiKey: "@apiKey",
                application: "@application",
                customData: []
              }
            }
          });
          return data;
        }
      );