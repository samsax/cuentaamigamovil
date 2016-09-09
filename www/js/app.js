angular.module('starter', ['ionic', 'ngCordova', 'pascalprecht.translate', 'ionic-multiselect'])

.run(function ($ionicPlatform, USER_ROLES, $rootScope) {
    $rootScope.USER_ROLES = USER_ROLES;
    $ionicPlatform.ready(function () {
        if (window.cordova && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            cordova.plugins.Keyboard.disableScroll(true);

        }
        if (window.StatusBar) {
            StatusBar.styleDefault();
        }

    });
})
.config(['$httpProvider', function ($httpProvider) {
    $httpProvider.defaults.useXDomain = true;
    delete $httpProvider.defaults.headers.common['X-Requested-With'];
}
])
.config(function ($stateProvider, $urlRouterProvider) {
    
    $stateProvider

      .state('app', {
          url: '/app',
          abstract: true,
          templateUrl: 'templates/menu.html',
          controller: 'MainCtrl'
      })
      .state('app.main', {
          url: '/main',
          views: {
              'menuContent': {
                  templateUrl: 'templates/main.html',
                  controller: 'MainCtrl'
              }
          }
      })
     .state('app.register', {
         url: '/register',
         views: {
             'menuContent': {
                 templateUrl: 'templates/register.html',
                 controller: 'RegisterCtrl'
             }
         }
     })
     .state('app.history', {
         url: '/history',
         views: {
             'menuContent': {
                 templateUrl: 'templates/history.html',
                 controller: 'HistoryCtrl'
             }
         }
     });
    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/app/history');

});


