app.config(function ($stateProvider) {

    $stateProvider.state('broadcastLive', {
        url: '/broadcastLive',
        controller: 'BroadcastLiveCtrl',
        templateUrl: 'js/common/directives/live-broadcast/live-broadcast.html',
        params: {
        	data: null,
        	type: null
        },
        resolve : {
        	broadcastStatus: function(){ return true},
            user: function(AuthService){
                return AuthService.getLoggedInUser();
            }
        }
    });
});