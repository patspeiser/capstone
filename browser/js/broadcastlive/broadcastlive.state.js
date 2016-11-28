app.config(function ($stateProvider) {

    $stateProvider.state('broadcastHome', {
        url: '/broadcast',
        controller: 'BroadcastCtrl',
        resolve : {
        	// user: function(AuthService){ 
        	// 	return AuthService.getLoggedInUser(); //need just id, more work later
        	// },
        	subscribers: function(AuthService, BroadcastService, Session){
        		return AuthService.getLoggedInUser()
        			.then(function(result){
        				if (result){
        					Session.user = result;
        					return BroadcastService.getSubscribers(result.id);
        				}
        				else{
        					return null;
        				}

        			})
        	}
        },
        templateUrl: 'js/broadcastlive/broadcastlive.html',
    });
});