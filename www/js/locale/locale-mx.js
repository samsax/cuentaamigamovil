angular.module('starter')
  .config(function($translateProvider) {

    $translateProvider
      .translations('es-MX', {

        'KEY_SYMBOL_MONEY': '$',

        'KEY_EXEMPLE': 'Ejemplo',
        'KEY_NAME_APLICACION': 'CUENTA AMIGA',
        'KEY_MAIN': 'Principal',
        'KEY_LOGIN_IN': 'Iniciar sesión',
        'KEY_LOGOUT': 'Salir',
        'KEY_RETURN': 'Volver',
        'KEY_REGISTER_NOW': 'Regístrate ahora',
        'KEY_LOST_YOUR_PASSWORD': '¿Olvidaste tu contraseña?',
        'KEY_CHANGE_PASSWORD': 'Solicitar Contraseña',
        'KEY_OR_FROM': 'o desde',
        'KEY_PROFILE': 'Perfil',

        'KEY_BALANCE': 'Sueldo',
        'KEY_FRIENDS': 'Amigos',
        'KEY_SELECT_FRIENDS': 'Seleccione Amigos',
        'KEY_ACCOUNTING': 'Contabilizar',

        'KEY_WELCOME': 'Bienvenido',
        'KEY_START': 'Inicio',
        'KEY_ACCOUNT': 'Cuenta',
        'KEY_REGISTER': 'Registro',
        'KEY_CONTACT': 'Contacto',
        'KEY_HISTORY': 'Historico',
        'KEY_COMMENT': 'Comentario',
        'KEY_PAY_OWE': 'Pago / Debe',
        'KEY_BILLS_TO_PAY': 'Cuentas a Pagar',
        'KEY_TOTAL_TO_PAY': 'Total a Pagar',
        'KEY_QUANTITY': 'Cantidad',
        'KEY_UPDATE': 'Atualizar',
        'KEY_DATE': 'Fecha',
        'KEY_DETAILS': 'Detalles',


        'KEY_NAME': 'Nombre',
        'KEY_USER_NAME': 'User Name',
        'KEY_EMAIL': 'Correo electronico',
        'KEY_PASSWORD': 'Contraseña',
        'KEY_CHECK_PASSWORD': 'Confirme contraseña',

        'KEY_REGISTER': 'Registrar',
        'KEY_RECORD': 'Grabar',

        'KEY_OBJECT_PLACE': 'Objeto / Lugar',

        'KEY_MSG_USER_NOT_FOUND': 'Usuario no encontrado',
        'KEY_MSG_COMMENT': 'Escriba un comentario',
        'KEY_MSG_NO_PERSON_HAVE_TO_PAY': 'Ninguna persona tienes que pagar.',

      });
    $translateProvider.preferredLanguage('es-MX');
  });
// HTML - {{ 'KEY_RETURN' | translate }}
// Controllers: $filter  - $filter('translate')('KEY_EXEMPLE')