angular.module('starter')
.constant('USER_ROLES', {
  id: '',
  name: '',
  email: '',
  user_name: '',
  password: '',
  photo: '',
  token: '',
  admin: 'admin_role',
  public: 'public_role',
  authorized: false
})
.constant('SETTINGS_SYSTEM', {
	//url: 'http://cuentaamiga-samsax.c9users.io:8080/api'

  // https://cuentaamiga.herokuapp.com/explorer/#/
	url: 'https://cuentaamiga.herokuapp.com/api'
})
.constant('SETTINGS_FIREBASE', {
  // Cuenta google (victorcmggg@gmail.com)
  apiKey: "AIzaSyCAnfI0fNk03qtq0LBWqirF0coa0pQp8no",
  authDomain: "cuentaamigapushnotificacion.firebaseapp.com",
  databaseURL: "https://cuentaamigapushnotificacion.firebaseio.com",
  storageBucket: "cuentaamigapushnotificacion.appspot.com",
  messagingSenderId: "655033536605"
});