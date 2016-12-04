app.config(function ($stateProvider) {

	$stateProvider.state('user-dbx-auth', {
		url: '/user-dbx-auth',
		templateUrl: 'js/user/user-dbx-auth.html',
		controller: 'UserDbxCtrl',
	});
});

app.controller('UserDbxCtrl', function ($scope, AuthService, $state, $location, UserService) {
	function getAccessToken(url){
		var splitUrl = url.split('=');
		var token = splitUrl[1].slice(0, -11);
		return token;
	}

	AuthService.getLoggedInUser()
	.then(function(user){
		user.dropbox_id = getAccessToken($location.hash());
		UserService.saveDbxToken(user)
			.then(function(user){
				$state.go('user');
			});
	});
});