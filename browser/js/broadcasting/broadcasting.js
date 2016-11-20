app.config(function ($stateProvider) {

    // Register our *about* state.
    $stateProvider.state('broadcasting', {
        url: '/broadcasting/:userId',
        controller: 'BroadcastingCtrl',
        templateUrl: 'js/broadcasting/broadcasting.html',
        resolve:{ //resolve all the channels
            connection: function(ConnectionService ){
                // var channel = new BroadcastService();
                return new ConnectionService();
                // var channel = new BroadcastService();
                // return channel.findAllChannels();
            }
        },
    });

});

app.controller('BroadcastingCtrl', function($scope, BroadcastService, $rootScope, $state, connection){
    console.log('BroadcastingCtrl loaded');
    //var localBroadcastService = new BroadcastService();


    var socket = io(); //this is for khan broadcasting

    console.log("connection is ");
    //console.log($rootScope.connection);
    console.log(connection.getConnection());

    $rootScope.broadcasting = false; //the user is not broadcasting
    $rootScope.watching = false; //the user is not watching


    $scope.disableOpenRoom = false; //disables the open room button if something happens. like the user already opened a room
    $scope.disableJoinRoom = false; // disables the join room button if something happens. like the user already joined a room
    $scope.disableOpenJoinRoom = false; //dont think we need this.
    $scope.extra = {}; //this variable contains all the extra info related to the channel, like image link, tags, category
    $scope.extra.tags = []; //this array contains all the tags for the channel

        // ......................................................
        // .......................UI Code........................
        // ......................................................

    $scope.dRoom = function(){ //delete a channel from database
        BroadcastService.closeRoom($scope.deleteRoomId);
    };


    $scope.addCategory = function(){//add category to the channel
        $scope.extra.category = $scope.category;
    };

    $scope.addCoverImage = function(){//add a link to the cover image for the channel
        $scope.extra.coverImage = $scope.coverImage;
    };

    $scope.addTag = function(){ //add a tag to the tags of the channel
        $scope.extra.tags.push($scope.tag);
        $scope.tag = null;
    };

    $scope.openRoom = function() { //open room button, create a new channel in our database
        var roomId = $scope.extra.name; //the room name given by the user, we will probably need a "if ($scope.roomname != null)" here

        $rootScope.connection.checkPresence($scope.extra.name, function(isRoomExist, roomid){ // this is purely khan stuff, it check if there is already a room with the same name on the signaling server
            if (isRoomExist){ // if the room name already exist on the signaling server, a new room will NOT be created. we get a error message. NOT REUSABLE
                console.log("room name already exist, please input a new room name");
                console.log($scope.extra.name);
                $scope.extra.name = null;
            }
            else{
                console.log("scope room name is");
                console.log($scope.roomname);
                console.log($scope.extra.name);
                $rootScope.broadcasting = true; //it tells our app that this user starts broadcasting, reusable with other APIs, REUSABLE
                BroadcastService.createChannel($scope.extra);//create a new channel in our database with the room name and the extra info related to the channel, REUSABLE
                $rootScope.unwanted = $scope.extra.name; //remembers the room name in $rootScope. so that we can remove it from our database when the broadcaster simply exits the page, REUSABLE

                $scope.disableOpenRoom = true; //disables the open room button when the room is already open. REUSABLE 
                $rootScope.connection.sdpConstraints.mandatory = { //purely khan video stuff, NOT REUSABLE
                    OfferToReceiveAudio: false,
                    OfferToReceiveVideo: false
                };
                $rootScope.connection.open(roomId, function(connect) {// purely khan video stuff, NOT REUSABLE
                    //console.log(roomId);
                    //socket.emit('createRoom', { roomId: roomId, connectId: connect.id})
                    //showRoomURL($rootScope.connection.sessionid);
                });

            }
        });
    };




    //     // ......................................................
    //     // ..................RTCMultiConnection Code.............
    //     // ......................................................

        
        // need these soon
        $rootScope.connection.videosContainer = document.getElementById('videos-container'); // khan stuff to load video to an html element, NOT REUSABLE
        $rootScope.connection.onstream = function(event) { //khan stuff to actually play the video, NOT REUSABLE
            $rootScope.connection.videosContainer.appendChild(event.mediaElement);
            event.mediaElement.play();
            setTimeout(function() {
                event.mediaElement.play();
            }, 5000);
        };


        $scope.$on('onBeforeUnload', function (e, confirmation, $scope) { //for the before unload stuff
            confirmation.message = "All data willl be lost.";
            e.preventDefault();
        });

        $scope.$on('onUnload', function (e, $scope) { //for the unload stuff, leaving page will only appear for 0.00000001 sec.
            console.log('leaving page'); // Use 'Preserve Log' option in Console
        });





    //     // connection.onclose = function(e){
    //     //     BroadcastService.createRoom('999');
    //     // }

    //     // window.onbeforeunload = function()
    //     // {
    //     //     connection.onclose = function(e){
    //     //         BroadcastService.createRoom('999');
    //     //     };
    //     //     connection.close();

    //     // }

    //     // console.log(window);


    //     // connection.oniceconnectionstatechange = function(){
    //     //     if(connection.iceConnectionState == 'disconnected'){
    //     //         console.log("deadead");
    //     //     }
    //     // }
    //     // function disableInputButtons() {
    //     //     document.getElementById('open-or-join-room').disabled = true;
    //     //     document.getElementById('open-room').disabled = true;
    //     //     document.getElementById('join-room').disabled = true;
    //     //     document.getElementById('room-id').disabled = true;
    //     // }

    //     // ......................................................
    //     // ......................Handling Room-ID................
    //     // ......................................................

    //     function showRoomURL(roomid) { // khan stuff to show more details for a room, NOT REUSABLE
    //         var roomHashURL = '#' + roomid;
    //         var roomQueryStringURL = '?roomid=' + roomid;

    //         var html = '<h2>Unique URL for your room:</h2><br>';

    //         html += 'Hash URL: <a href="' + roomHashURL + '" target="_blank">' + roomHashURL + '</a>';
    //         html += '<br>';
    //         html += 'QueryString URL: <a href="' + roomQueryStringURL + '" target="_blank">' + roomQueryStringURL + '</a>';

    //         var roomURLsDiv = document.getElementById('room-urls');
    //         roomURLsDiv.innerHTML = html;

    //         roomURLsDiv.style.display = 'block';
    //     }

    //     // (function() {
    //     //     var params = {},
    //     //         r = /([^&=]+)=?([^&]*)/g;

    //     //     function d(s) {
    //     //         return decodeURIComponent(s.replace(/\+/g, ' '));
    //     //     }
    //     //     var match, search = window.location.search;
    //     //     while ((match = r.exec(search.substring(1))))
    //     //         params[d(match[1])] = d(match[2]);
    //     //     window.params = params;
    //     // })();

    //     // var roomid = '';
    //     // if (localStorage.getItem(connection.socketMessageEvent)) {
    //     //     roomid = localStorage.getItem(connection.socketMessageEvent);
    //     // } else {
    //     //     roomid = connection.token();
    //     // }
    //     // document.getElementById('room-id').value = roomid;
    //     // document.getElementById('room-id').onkeyup = function() {
    //     //     localStorage.setItem(connection.socketMessageEvent, this.value);
    //     // };

    //     // var hashString = location.hash.replace('#', '');
    //     // if(hashString.length && hashString.indexOf('comment-') === 0) {
    //     //   hashString = '';
    //     // }

    //     // roomid = params.roomid;
    //     // if(!roomid && hashString.length) {
    //     //     roomid = hashString;
    //     // }

    //     // if(roomid && roomid.length) {
    //     //     document.getElementById('room-id').value = roomid;
    //     //     localStorage.setItem(connection.socketMessageEvent, roomid);

    //     //     // auto-join-room
    //     //     (function reCheckRoomPresence() {
    //     //         connection.checkPresence(roomid, function(isRoomExists) {
    //     //             if(isRoomExists) {
    //     //                 connection.join(roomid);
    //     //                 return;
    //     //             }

    //     //             setTimeout(reCheckRoomPresence, 5000);
    //     //         });
    //     //     })();

    //     //     disableInputButtons();
    //     // }
        });