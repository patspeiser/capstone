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
		console.log(user);
		$scope.user = user; 
	});
	$scope.authDropbox = function(){
		var CLIENT_ID = '9bhq21rjmdjxyzo';

	    // Parses the url and gets the access token if it is in the urls hash
	    function getAccessTokenFromUrl() {
	    	console.log($location);
	     // return utils.parseQueryString(window.location.hash).access_token;
	 }
	    // If the user was just redirected from authenticating, the urls hash will
	    // contain the access token.
	    function isAuthenticated() {
	    	return !!getAccessTokenFromUrl();
	    }
	    // This example keeps both the authenticate and non-authenticated setions
	    // in the DOM and uses this function to show/hide the correct section.
	    if (isAuthenticated()) {
	    	console.log('authed!');
	    	var dbx = new Dropbox({ accessToken: getAccessTokenFromUrl() });
	    } else {
	    	console.log('in else?');
	      // Set the login anchors href using dbx.getAuthenticationUrl()
	      var dbx = new Dropbox({ clientId: CLIENT_ID });
	      var authUrl = dbx.getAuthenticationUrl('http://localhost:1337/auth/dropbox');
	      console.log(authUrl);
	      document.getElementById('authlink').href = authUrl;
	  }
	};
});
