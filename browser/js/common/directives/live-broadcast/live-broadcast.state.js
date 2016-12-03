app.config(function ($stateProvider) {

    $stateProvider.state('broadcastLive', {
        url: '/broadcastLive?id&thetype',
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
            },
            isSubscribing: function(AuthService, $stateParams, BroadcastLiveService){
                if ($stateParams.thetype === "broadcast"){
                    return null;
                }
                else if ($stateParams.thetype === "viewer"){
                    return AuthService.getLoggedInUser()
                        .then(function(result){
                            if (result){
                              return BroadcastLiveService.getSubscriptionForViewer(result.id, $stateParams.id);
                            }
                            else{
                                return null;
                            }
                        })
                }         
            }
        }
    });
});