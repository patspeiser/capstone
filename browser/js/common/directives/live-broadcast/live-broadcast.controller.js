app.controller('BroadcastLiveCtrl', function($scope,BroadcastLiveService,$state,$timeout,$rootScope, user){
    console.log('#_STATE_PARAMS_#', $state.params.data);

    $scope.successfullySubscribed = false;
    $scope.user = user;
    if ($state.params.data){
        $scope.watching = $state.params.type == "viewer" ? true : false;
    }

    // console.log("is it watching?");
    // console.log($scope.watching);
    // console.log("data is");
    // console.log($state.params.data);

    // ......................................................
    // .......................UI Code........................
    // ......................................................


    $scope.subscribe = function(){
        BroadcastLiveService.subscribe($state.params.data.channelID, user.id);
        $scope.successfullySubscribed = true;
        $timeout(function(){
            $scope.successfullySubscribed = false;
        }, 10000);
    }

    $scope.openRoom = function(data) {
        console.log('###DATA', data);
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

    // ......................................................
    // ....................Basic Chat........................
    // ......................................................


    document.getElementById('input-text-chat').onkeyup = function(e) {
        if (e.keyCode != 13) return;

        // removing trailing/leading whitespace
        this.value = this.value.replace(/^\s+|\s+$/g, '');
        if (!this.value.length) return;

        //update user's chat
        appendDIV(this.value);
        
        //broadcast chat text
        connection.send(this.value);
        this.value = '';
    };

    //upon receiving message, update chat box with remote text
    connection.onmessage = function(event){
        appendDIV(event.data);
    }

    //need to use angular way instad of jquery.
    var chatContainer = document.getElementById('chat-output');
    function appendDIV(event) {
        var div = document.createElement('div');
        div.innerHTML = event.data || event;
        chatContainer.insertBefore(div, chatContainer.firstChild);
        div.tabIndex = 0;
        div.focus();

        document.getElementById('input-text-chat').focus();
    }


});