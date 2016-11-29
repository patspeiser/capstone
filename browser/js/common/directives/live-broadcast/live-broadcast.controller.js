app.controller('BroadcastLiveCtrl', function($scope,BroadcastLiveService,$state,$timeout,$rootScope){


    // ......................................................
    // .......................UI Code........................
    // ......................................................

    $scope.openRoom = function(data) {
        BroadcastLiveService.addChannel(data)
        .then(function(newChannel){
            //broadcasting so you only want to send out audio and video
            connection.sdpConstraints.mandatory = {
                OfferToReceiveAudio: false,
                OfferToReceiveVideo: false
            };
            connection.open(newChannel.channelID);
        })       
    };

    $scope.joinRoom = function(data) {
        connection.sdpConstraints.mandatory = {
            OfferToReceiveAudio: true,
            OfferToReceiveVideo: true
        };
        console.log('in join room',data.channelID);
        connection.join(data.channelID);
    };

    // ......................................................
    // ..................RTCMultiConnection Code.............
    // ......................................................

    var connection = $rootScope.connection;

    connection.socketMessageEvent = 'video-broadcast-demo';

    connection.session = {
        audio: true,
        video: true,
        oneway: true,
        data: true
    };

    connection.onstream = function(event) {
        //select the video tag with "video" id and load source * replace getElementById with Angular method
        connection.videosContainer = document.getElementById('video-broadcast');
        connection.videosContainer.src = event.blobURL
    };


    // ......................................................
    // ..............Starting Broadcast......................
    // ......................................................

    if($state.params.type === 'broadcast'){
        $scope.uniqueID = $state.params.data.channelId;
        $timeout($scope.openRoom($state.params.data),0);
    } else if ($state.params.type === 'viewer'){
        $scope.uniqueID = $state.params.data.channelID;
        $timeout($scope.joinRoom($state.params.data),0);
    } else {
        $state.go('broadcastHome')
    }



});