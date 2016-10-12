angular.module('starter', ['ionic', 'ngCordova', 'pascalprecht.translate', 'ionic-multiselect', 'monospaced.elastic', 'ngResource', 'firebase'])

.run(function($ionicPlatform, USER_ROLES, $rootScope, SETTINGS_FIREBASE) {
    $rootScope.USER_ROLES = USER_ROLES;
    $ionicPlatform.ready(function() {

      var config = {
        apiKey: SETTINGS_FIREBASE.apiKey,
        authDomain: SETTINGS_FIREBASE.authDomain,
        databaseURL: SETTINGS_FIREBASE.databaseURL,
        storageBucket: SETTINGS_FIREBASE.storageBucket,
        messagingSenderId: SETTINGS_FIREBASE.messagingSenderId
      };
      firebase.initializeApp(config);

      if (window.cordova && window.cordova.plugins.Keyboard) {
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        cordova.plugins.Keyboard.disableScroll(true);

      }
      if (window.StatusBar) {
        StatusBar.styleDefault();
      }

    });
  })
  .config(['$httpProvider', function($httpProvider, $cordovaFacebookProvider) {
    $httpProvider.defaults.useXDomain = true;
    delete $httpProvider.defaults.headers.common['X-Requested-With'];
  }])
  .config(function($stateProvider, $urlRouterProvider) {

    $stateProvider

      .state('app', {
        url: '/app',
        abstract: true,
        templateUrl: 'templates/menu.html',
        controller: 'MainCtrl'
      })
      .state('app.main', {
        url: '/main',
        cache: false,
        views: {
          'menuContent': {
            templateUrl: 'templates/main.html',
            controller: 'MainCtrl'
          }
        }
      })
      .state('app.register', {
        url: '/register',
        cache: false,
        views: {
          'menuContent': {
            templateUrl: 'templates/register.html',
            controller: 'RegisterCtrl'
          }
        }
      })
      .state('app.bills_to_pay', {
        url: '/bills_to_pay',
        cache: false,
        views: {
          'menuContent': {
            templateUrl: 'templates/bills_to_pay.html',
            controller: 'BillsToPayCtrl'
          }
        }
      })
      .state('app.history', {
        url: '/history',
        cache: false,
        views: {
          'menuContent': {
            templateUrl: 'templates/history.html',
            controller: 'HistoryCtrl'
          }
        }
      })
      .state('app.group_register', {
        url: '/group_register',
        cache: false,
        views: {
          'menuContent': {
            templateUrl: 'templates/group_register.html',
            controller: 'GroupCtrl'
          }
        }
      })
      .state('app.my_group', {
        url: '/my_group',
        cache: false,
        views: {
          'menuContent': {
            templateUrl: 'templates/my_group.html',
            controller: 'MyGroupCtrl'
          }
        }
      })
      .state('app.profile', {
        url: '/profile',
        cache: false,
        views: {
          'menuContent': {
            templateUrl: 'templates/profile.html',
            controller: 'ProfileCtrl'
          }
        }
      });
    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/app/main');

  });