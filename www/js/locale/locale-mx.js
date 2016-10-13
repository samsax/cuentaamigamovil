angular.module('starter')
  .config(function($translateProvider) {

    $translateProvider
      .translations('es-MX', {

        'KEY_SYMBOL_MONEY': '$',

        'KEY_EXEMPLE': 'Ejemplo',
        'KEY_NAME_APLICACION': 'CUENTA AMIGA',
        'KEY_NAME_APLICACION_NORMAL': 'Cuenta Amiga',
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
        'KEY_GROUP': 'Grupo',
        'KEY_MY_GROUP': 'Mis Grupos',
        'KEY_REGISTER_GROUP': 'Nuevo Grupo',
        'KEY_LINK_URL': 'Enlace url',
        'KEY_WELCOME': 'Bienvenido',
        'KEY_START': 'Inicio',
        'KEY_ACCOUNT': 'Cuenta',
        'KEY_REGISTER': 'Registro',
        'KEY_CONTACT': 'Contacto',
        'KEY_HISTORY': 'Historico',
        'KEY_COMMENT': 'Comentario',
        'KEY_TO': ' para ',
        'KEY_PAY_OWE': 'Pago / Debe',
        'KEY_PAY': 'Pago',
        'KEY_OWE': ' debe ',
        'KEY_BILLS_TO_PAY': 'Cuentas a Pagar',
        'KEY_TOTAL_TO_PAY': 'Total a Pagar',
        'KEY_QUANTITY': 'Cantidad',
        'KEY_UPDATE': 'Actualizar',
        'KEY_DATE': 'Fecha',
        'KEY_DETAILS': 'Detalles',
        'KEY_SUCESS':'Éxito',
        'KEY_ERROR':'Atención',
        'KEY_NAME': 'Nombre',
        'KEY_USER_NAME': 'Nickname',
        'KEY_EMAIL': 'Correo electrónico',
        'KEY_PASSWORD': 'Contraseña',
        'KEY_CHECK_PASSWORD': 'Confirme contraseña',
        'KEY_REGISTER': 'Registrar',
        'KEY_RECORD': 'Guardar',
        'KEY_OBJECT_PLACE': 'Objeto / Lugar',
        'KEY_CHOOSE_OPTION' : 'Elija una opción',
        'KEY_ADD_USER' : 'Agregar Usuario',
        'KEY_CHANGE_USER' : 'Cambiar de Grupo',
        'KEY_ENTER_GROUP' : 'Ingresse en un grupo',

        'KEY_MSG_USER_NOT_FOUND': 'Usuario no encontrado',
        'KEY_MSG_COMMENT': 'Escriba un comentario',
        'KEY_MSG_NO_PERSON_HAVE_TO_PAY': 'Ninguna persona tiene que pagar.',
        'KEY_MSG_UPDATE_SUCESS' : 'Actualizado con éxito.',
        'KEY_MSG_INCORRECT_PASSWORD' : 'Las contraseña son diferente.',
        'KEY_MSG_ERROR_RECORD' : 'Error al intentar guardar. ',
        'KEY_MSG_ERROR_SERVER' : 'Error en el servidor.',
        'KEY_MSG_ERROR_RECORD_TABLE_USER_GROUP' : 'Error al intentar guardar. Tabla usuario y grupo.',
        'KEY_MSG_RECORD_SUCCESS' : 'Guardado con éxito.',
        'KEY_CHANGE_USER_GROUP' : 'Cambiado para el grupo ',
        'KEY_ERROR_CHANGE_USER_GROUP' : 'No fue posible cambiar para grupo ',
        'KEY_MSG_RECORD_GROUP_CHANGE_USER_GROUP' : 'Grupo guardado y Usuario cambiado para el grupo ',
        'KEY_MSG_ERROR_CHANGE_USER_GROUP' :'No fue posible cambiar para grupo ',
        'KEY_MSG_LOGIN_NOT_POSSIBLE' : 'No fue possible ingressar. ',
        'KEY_MSG_ERROR_FIRST_LOGIN' :'Ocurrio un error al ingressar por primeira vez. Verificar con administrador.',
        'KEY_MSG_ERROR_CONEXTION' : 'No tienes conexión con la internet.',
        'KEY_MSG_LOGOUT_USER' : 'Usuario deslogueado.',
        'KEY_MSG_ERROR_LOGOUT_USER' : 'Error al desloguear.',
        'KEY_MSG_ERROR_SELECT_USER' : 'Selecione los usuarios que van a pagar.',
        'KEY_MSG_VALUE_MUST_BE_PAY' : 'Ingresse el valor',
        'KEY_MSG_PLEASE_INSERT_USER_NAME' : 'Por favor utilize nickname',
        'KEY_MSG_DO_YOU_WANT_TO_CHANGE_GROUP' : 'Quieres cambiar para el grupo',
        'KEY_MSG_SUCESS_RECORD_USER' : 'Usuario guardado con exitó.',
        'KEY_MSG_INVALID_FIELD' : 'Campo esta vazio',

        'KEY_BUTTON_FACEBOOK': '//connect.facebook.net/es_LA/sdk.js#xfbml=1&version=v2.8&appId=1753441278256643',

      });
    $translateProvider.preferredLanguage('es-MX');
  });
// HTML - {{ 'KEY_RETURN' | translate }}
// Controllers: $filter  - $filter('translate')('KEY_EXEMPLE')


//PT_BR  'KEY_BUTTON_FACEBOOK' : "//connect.facebook.net/pt_BR/sdk.js#xfbml=1&version=v2.8&appId=1753441278256643",
//EN_US  'KEY_BUTTON_FACEBOOK' : "//connect.facebook.net/en_US/sdk.js#xfbml=1&version=v2.8&appId=1753441278256643",