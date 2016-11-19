app.directive('channelList', function () {

    return {
    	restrict: 'E',
    	scope: {
    		channels: '='
    	},
    	templateUrl: '/js/channels/channel-list.html',
        controller: function ($scope, BroadcastService) {
        	console.log('channellist directive loaded');
        }
    };
});

app.directive('channelDetail', function () {

    return {
    	restrict: 'E',
    	scope: {
    		channels: '='
    	},
    	templateUrl: '/js/channels/channel-detail.html',
        controller: function ($scope, BroadcastService) {
        	console.log('single room directive loaded');
        }
    };
});