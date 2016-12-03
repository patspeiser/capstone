app.config(function ($stateProvider) {

    $stateProvider.state('user', {
        url: '/user',
        templateUrl: 'js/user/user.html',
        controller: 'UserCtrl',
    });

});

app.controller('UserCtrl', function ($scope, AuthService, $state, $location) {
	AuthService.getLoggedInUser()
	.then(function(user){
		$scope.user = user; 
	});
	$scope.authDropbox = function(){
		var CLIENT_ID = '9bhq21rjmdjxyzo';
		var dbx = new Dropbox({ clientId: CLIENT_ID });
		var authUrl = dbx.getAuthenticationUrl('http://localhost:1337/auth/dropbox');
		document.getElementById('authlink').href = authUrl;
	  // }
	};
});
