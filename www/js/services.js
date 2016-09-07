    angular.module('starter')
    .factory('Users', ['$resource',
        function($resource) {
          return $resource('http://localhost:8080/ProjetoRest/rest/cliente/:service/:id', {
            id: '@id'
          }, {
            pages: {
              method: 'GET',
              isArray: false,
              globalError: false,
              params: {
                service: ''
              }
            },
            save: {
              method: 'POST',
              params: {
                service: ''
              }
            },
            update: {
              method: 'PUT',
              params: {
                service: ''
              }
            },
            findById: {
              method: 'GET',
              isArray: false,
              globalError: false,
            }
          });
        }
      ]);
