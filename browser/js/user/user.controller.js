app.config(function ($stateProvider) {

	$stateProvider.state('user', {
		url: '/user',
		templateUrl: 'js/user/user.html',
		controller: 'UserCtrl',
	});

});

app.controller('UserCtrl', function ($scope, AuthService, $state, $location, UserService) {
	function getAuthUrlBase(){
		var url = $location.absUrl();
		url = url.slice(0, url.length - 5);
		return url;
	}

	var dbxAuthUrl = getAuthUrlBase() + '/auth/dropbox';
	console.log('outside', dbxAuthUrl);	
	AuthService.getLoggedInUser()
	.then(function(user){
		$scope.user = user;

		if (user.dropbox_id){
			UserService.getRecordings(user)
			.then(function(recordings){
				$scope.recordings = recordings;
				$scope.$digest();
			});
		} else {
			$scope.recordings = [];
		}
		$scope.authDropbox = function(){
			var CLIENT_ID = '9bhq21rjmdjxyzo';
			var dbx = new Dropbox({ clientId: CLIENT_ID });
			var authUrl = dbx.getAuthenticationUrl(dbxAuthUrl);
			console.log('after', authUrl);
			document.getElementById('authlink').href = authUrl;
		};
	});
});
