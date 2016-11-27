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
              console.log('in controller', room);
              $state.go('broadcastLive', {data: room, type: 'viewer'})


                // var connection = new ConnectionService();
                // connection.joinRoom(room.name);
                // $state.go('channelDetail', { id: room.id });
            };
        }
    };
});



       // $scope.joinRoom = function(roomname) { //join a room button
       //      $scope.disableJoinRoom = true; // disables join room button after already joined
       //      connection.sdpConstraints.mandatory = { //purely khan video stuff, NOT REUSABLE
       //          OfferToReceiveAudio: true,
       //          OfferToReceiveVideo: true
       //      };
       //      $rootScope.watching = true; //tells our app the user is watching something, REUSABLE
       //      $rootScope.unwatching = roomname; //remembers the name the user is watching, so that we can reduce the view count when the user simply leaves the page, REUSABLE
       //      BroadCastFactory.increaseView(roomname); //increase the view count of the channel by 1, REUSABLE
       //      connection.join(roomname); //purely khan video stuff to join a room, NOT REUSABLE
       //  };


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