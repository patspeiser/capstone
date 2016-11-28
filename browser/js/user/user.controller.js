app.config(function ($stateProvider) {

    $stateProvider.state('user', {
        url: '/user',
        templateUrl: 'js/user/user.html',
        controller: 'UserCtrl',
    });

});

app.controller('UserCtrl', function ($scope, AuthService, $state) {
	AuthService.getLoggedInUser()
		.then(function(user){
			$scope.user = user; 
		});

	$scope.authDropbox = function(){
		console.log('dropbox functions');
	}
});
