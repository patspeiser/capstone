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
    		channel: '='
    	},
    	templateUrl: '/js/channels/channel-detail.html',
        controller: function ($scope, BroadcastService, ConnectionService, $rootScope, $state) {
            $scope.joinRoom  = function(room){
              console.log(room);
              BroadcastService.findByChannelId(room.channelID)
                .then(function(result){
                    $state.go('broadcastLive', {thetype:'viewer', id:room.channelID, session:result.session, data: result})  
                })              
            };
        }
    };
});

