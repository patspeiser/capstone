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
                var connection = new ConnectionService();
                connection.joinRoom(room.name);
                $state.go('channelDetail', { id: room.id });
            };
        }
    };
});


// var connection = new RTCMultiConnection(); //khan stuff to create a connection object, NOT REUSABLE

//         // by default, socket.io server is assumed to be deployed on your own URL
//         // connection.socketURL = '/';

//         // comment-out below line if you do not have your own socket.io server
//         connection.socketURL = 'https://rtcmulticonnection.herokuapp.com:443/'; // khan stuff, NOT REUSABLE

//         connection.socketMessageEvent = 'video-broadcast-demo'; // khan stuff, NOT REUSABLE

//         connection.session = { //khan stuff to define some details of a connection, NOT REUSABLE
//             audio: true,
//             video: true,
//             oneway: true
//         };