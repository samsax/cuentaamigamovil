angular.module('starter')
.constant('USER_ROLES', {
  id: '',
  name: '',
  email: '',
  user_name: '',
  password: '',
  admin: 'admin_role',
  public: 'public_role',
  authorized: false
})
.constant('SETTINGS_SYSTEM', {
	//url: 'http://cuentaamiga-samsax.c9users.io:8080/api'
	url: 'https://cuentaamiga.herokuapp.com/api'
});