app.controller('BroadcastLiveCtrl', function($scope,$interval,BroadcastLiveService,$state,$timeout,$rootScope, user){

    $scope.successfullySubscribed = false;
    $scope.user = user;
    if ($state.params.data){
        $scope.watching = $state.params.type == "viewer" ? true : false;
    }

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
        //broadcasting so you only want to send out audio and video
        connection.sdpConstraints.mandatory = {
            OfferToReceiveAudio: false,
            OfferToReceiveVideo: false
        };
        connection.open(data.channelId);    
    };

    $scope.joinRoom = function(data) {
        connection.sdpConstraints.mandatory = {
            OfferToReceiveAudio: true,
            OfferToReceiveVideo: true
        };
        connection.join(data.channelID);
    };

    // ......................................................
    // ..................RTCMultiConnection Code.............
    // ......................................................

    var connection = $rootScope.connection;

    connection.socketMessageEvent = 'video-broadcast-demo';

    connection.session = {
        //Original broadcaster does not need
        audio: true,
        video: true,
        oneway: true,
        data: true
    };


    //adding video source to stream broadcast
    connection.onstream = function(event) {

        connection.videosContainer = document.getElementById('video-broadcast');
        
        //select the video tag with "video" id and load source * replace getElementById with Angular method
        connection.videosContainer.src = event.blobURL

        //Put video tag on muted to fix echo and capture preview image
        if(connection.isInitiator === true){
            connection.videosContainer.muted = true;

            //setting preview image, wait 3 seonds then take pic
            $timeout(function() {
                var vidSrc = connection.videosContainer
                var imgSrc = document.getElementById('canvas');

                //dynamically capture the full video screen
                imgSrc.width = vidSrc.videoWidth;
                imgSrc.height = vidSrc.videoHeight;

                //copy video screen to img
                imgSrc.getContext('2d').drawImage(vidSrc,0,0,vidSrc.videoWidth,vidSrc.videoHeight);
                
                //send final data to save in the backend
                $state.params.data.coverImage = imgSrc.toDataURL();
                BroadcastLiveService.addChannel($state.params.data);
                
            }, 3000);                    
        }

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

    // ......................................................
    // ..................Viewer Count........................
    // ......................................................

    $interval(function(){
        $scope.viewCount= connection.getAllParticipants().length;
        //add viewcount to the back end
    },1000);

});