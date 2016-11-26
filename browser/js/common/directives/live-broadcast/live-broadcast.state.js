app.config(function ($stateProvider) {

    $stateProvider.state('broadcastLive', {
        url: '/broadcastLive',
        controller: 'BroadcastLiveCtrl',
        templateUrl: 'js/common/directives/live-broadcast/live-broadcast.html',
        params: {
        	data: null
        },
        resolve : {
        	broadcastStatus: function(){ return true}
        }
    });
});