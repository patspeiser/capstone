app.config(function ($stateProvider) {

	$stateProvider.state('user-dbx-auth', {
		url: '/user-dbx-auth',
		templateUrl: 'js/user/user-dbx-auth.html',
		controller: 'UserCtrl',
	});
});

app.controller('UserCtrl', function ($scope, AuthService, $state, $location, UserService) {
	console.log('does this work now');
});