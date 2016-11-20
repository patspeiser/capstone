app.controller('BroadcastLiveCtrl', function($scope){
    //initiate connection
    var socket = io();

    // ......................................................
    // .......................UI Code........................
    // ......................................................

    $scope.openRoom = function() {
        disableInputButtons();
        console.log(connection.token());
        connection.sdpConstraints.mandatory = {
            OfferToReceiveAudio: false,
            OfferToReceiveVideo: false
        };
        var roomId = $scope.roomId;
        connection.open(roomId, function(connect) {
            socket.emit('createRoom', { roomId: roomId, connectId: connect.id})
            console.log(roomId);
            showRoomURL(connection.sessionid);
        });
    };

    document.getElementById('join-room').onclick = function() {
        disableInputButtons();
        connection.sdpConstraints.mandatory = {
            OfferToReceiveAudio: true,
            OfferToReceiveVideo: true
        };
        connection.join($scope.roomId);
    };

    // document.getElementById('open-or-join-room').onclick = function() {
    //     disableInputButtons();
    //     connection.openOrJoin(document.getElementById('room-id').value, function(isRoomExists, roomid) {
    //         if(!isRoomExists) {
    //             showRoomURL(roomid);
    //         }
    //     });
    // };


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
        connection.videosContainer.appendChild(event.mediaElement);
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

    // console.log('window', $window.location);
    // (function() {
    //     var params = {},
    //         r = /([^&=]+)=?([^&]*)/g;

    //     function d(s) {
    //         return decodeURIComponent(s.replace(/\+/g, ' '));
    //     }
    //     var match, search = $window.location.search;
    //     while ((match = r.exec(search.substring(1))))
    //         params[d(match[1])] = d(match[2]);
    //     $window.params = params;
    // })();

    var roomid = '';
    console.log(connection.socketMessageEvent, 'socket event');

    if (localStorage.getItem(connection.socketMessageEvent)) {
        roomid = localStorage.getItem(connection.socketMessageEvent);
    } else {
        roomid = connection.token();
    }
    // document.getElementById('room-id').value = roomid;
    // document.getElementById('room-id').onkeyup = function() {
    //     localStorage.setItem(connection.socketMessageEvent, this.value);
    // };

    var hashString = location.hash.replace('#', '');
    if(hashString.length && hashString.indexOf('comment-') === 0) {
      hashString = '';
    }

    // roomid = params.roomid;
    if(!roomid && hashString.length) {
        roomid = hashString;
    }

    // if(roomid && roomid.length) {
    //     document.getElementById('room-id').value = roomid;
    //     localStorage.setItem(connection.socketMessageEvent, roomid);

    //     // auto-join-room
    //     (function reCheckRoomPresence() {
    //         connection.checkPresence(roomid, function(isRoomExists) {
    //             if(isRoomExists) {
    //                 connection.join(roomid);
    //                 return;
    //             }

    //             setTimeout(reCheckRoomPresence, 5000);
    //         });
    //     })();

    //     disableInputButtons();
    // }    




});