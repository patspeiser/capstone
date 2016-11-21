app.controller('BroadcastLiveCtrl', function($scope,$sce){
    //initiate connection
    var socket = io();

    // ......................................................
    // .......................UI Code........................
    // ......................................................

    $scope.openRoom = function() {
        disableInputButtons();
        console.log(connection.token());
        //broadcasting so you only want to send out audio and video
        connection.sdpConstraints.mandatory = {
            OfferToReceiveAudio: false,
            OfferToReceiveVideo: false
        };
        var roomId = $scope.roomId;
        connection.open(roomId, function(connect) {
            socket.emit('createRoom', { roomId: roomId, connectId: connect.id})
            showRoomURL(connection.sessionid);
        });
    };

    $scope.joinRoom = function() {
        disableInputButtons();
        connection.sdpConstraints.mandatory = {
            OfferToReceiveAudio: true,
            OfferToReceiveVideo: true
        };
        connection.join($scope.roomId);
    };

    // ......................................................
    // ..................RTCMultiConnection Code.............
    // ......................................................

    var connection = new RTCMultiConnection();

    // by default, socket.io server is assumed to be deployed on your own URL
    // connection.socketURL = '/';

    // comment-out below line if you do not have your own socket.io server
    connection.socketURL = 'https://rtcmulticonnection.herokuapp.com:443/';

    connection.socketMessageEvent = 'video-broadcast-demo';

    connection.session = {
        audio: true,
        video: true,
        oneway: true
    };

    connection.videosContainer = document.getElementById('videos-container');
    connection.onstream = function(event) {
        console.log(event.streamid);
        connection.videosContainer.appendChild(event.mediaElement);

        //add bootstrap classes to the video
        var vidElement = "#" + event.streamid;
        console.log(vidElement);
        var currentVid = angular.element( document.querySelector(vidElement));
        currentVid.addClass("embed-responsive-item");
 
        event.mediaElement.play();
        setTimeout(function() {
            event.mediaElement.play();
        }, 5000);
    };

    function disableInputButtons() {
        $scope.broadcastStatus = function(){
            return false;
        }
    }

    // ......................................................
    // ......................Handling Room-ID................
    // ......................................................

    function showRoomURL(roomid) {
        var roomHashURL = '#' + roomid;
        var roomQueryStringURL = '?roomid=' + roomid;

        var html = '<h2>Unique URL for your room:</h2><br>';

        html += 'Hash URL: <a href="' + roomHashURL + '" target="_blank">' + roomHashURL + '</a>';
        html += '<br>';
        html += 'QueryString URL: <a href="' + roomQueryStringURL + '" target="_blank">' + roomQueryStringURL + '</a>';

        var roomURLsDiv = document.getElementById('room-urls');
        roomURLsDiv.innerHTML = html;

        roomURLsDiv.style.display = 'block';
    }

 
});