angular.module('starter')
.config(function ($translateProvider) {

  $translateProvider
    .translations('es-MX',{

      'KEY_EXEMPLE': 'Ejemplo',
      'KEY_NAME_APLICACION': 'CUENTA AMIGA',
      'KEY_LOGIN_IN': 'Iniciar sesión',
      'KEY_LOGOUT': 'Salir',
      'KEY_RETURN': 'Volver',
      'KEY_REGISTER_NOW': 'Regístrate ahora',
      'KEY_LOST_YOUR_PASSWORD': '¿Olvidaste tu contraseña?',
      'KEY_OR_FROM': 'o desde',

      'KEY_WELCOME': 'Bienvenido',
      'KEY_START': 'Inicio',
      'KEY_REGISTER': 'Registro',
      'KEY_CONTACT': 'Contacto',
      'KEY_HISTORY': 'Historico',

    });
$translateProvider.preferredLanguage('es-MX');
});
// {{ 'KEY_EXEMPLE' | translate }}