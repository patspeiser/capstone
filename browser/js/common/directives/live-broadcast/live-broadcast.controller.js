app.controller('BroadcastLiveCtrl', function($scope,$interval,BroadcastService,BroadcastLiveService,$state,$timeout,$rootScope,dataUrl,user,isSubscribing,$stateParams){
    
    //if viewer is following a link, set $state.params.data to the dataUrl in state resolve
    if(dataUrl !== undefined){
        $state.params.data = dataUrl;
    }    

    $scope.successfullySubscribed = false;
    $scope.user = user;

    if ($stateParams){
        $scope.watching = $stateParams.thetype == "viewer" ? true : false;
    }
    if ($stateParams){
        $scope.broadcasting = $stateParams.thetype == "broadcast" ? true : false;
    }
    if($stateParams){
        if ($stateParams.thetype =="broadcast" && $stateParams.data){
            $rootScope.unwantedChannelId = $stateParams.data.channelId;
        }
    }
    if($stateParams){
        if ($stateParams.thetype =="viewer"){
            $rootScope.isWatching = true;
        }
    }

    $scope.isSubscribing = isSubscribing ? true : false;

    $scope.broadcastingEnded = false;

    // ......................................................
    // .......................UI Code........................
    // ......................................................


    // fix the state change problems for viewers and broadcasters
    $rootScope.$on('$stateChangeStart', function(event){
        if ($stateParams.thetype == 'viewer'){
            connection.close();
        }
        else if ($stateParams.thetype == 'broadcast') {
            connection.attachStreams.forEach(function(stream) {
               stream.stop();
            });
            connection.getAllParticipants().forEach(function(p) {
                connection.disconnectWith(p);
            });
            connection.closeSocket();
            if ($stateParams.data){
                BroadcastService.closeChannel($stateParams.data.channelId);       
            }
        }

    })

    $scope.stopBroadcasting = function(){
        connection.attachStreams.forEach(function(stream) {
           stream.stop();
        });
        connection.getAllParticipants().forEach(function(p) {
            connection.disconnectWith(p);
        });
        connection.closeSocket();
        BroadcastService.closeChannel($stateParams.data.channelId);
        $scope.broadcastingEnded = true;
    };

    $scope.goHome = function(){
        $state.go('channels',{'tag':null, 'category':null, 'channelname':null});
    };

    $scope.subscribe = function(){
        BroadcastLiveService.subscribe($stateParams.id, user.id);
        $scope.successfullySubscribed = true;
        $scope.isSubscribing = true;
        $timeout(function(){
            $scope.successfullySubscribed = false;
        }, 3000);
    };

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
        // if ($stateParams.id){
            connection.join($stateParams.id);
        // }
        // else{
        //     connection.join(data.channelID);
        // }
    };

    $scope.startBroadcast = function(){
        $scope.channelName = $state.params.data.channelName;
        BroadcastLiveService.addChannel($state.params.data)
        .then(function(result){
            updateView();
            $scope.ifLive = true;
        })
    }

   //   
   //RECORDING FUNCTIONALITY
   // 
    $scope.startRecordingStream = function(){
        BroadcastLiveService.getRecorder(connection).startRecording();        
    };

    $scope.stopRecordingStream = function(){
        BroadcastLiveService.getRecorder(connection).stopRecording();
    };

    $scope.saveToDropbox = function(){
        BroadcastLiveService.saveToDropbox(user, connection);
    };

    // ......................................................
    // ..................RTCMultiConnection Code.............
    // ......................................................

    var connection = $rootScope.connection;
    connection.socketMessageEvent = 'video-broadcast';

    if ($state.params.data){
        connection.session = $state.params.data.session;
    }

    //adding video source to stream broadcast
    connection.onstream = function(event) {
        connection.mainContainer = document.getElementById('main-broadcast');
        connection.sideContainer = document.getElementById('side-broadcast');

        //take snapshot and depending on what is selected, show screen and/or video
        if($state.params.data.session.screen === undefined){
            //if connection has only video
            connection.mainContainer.src = event.blobURL;
            connection.sideContainer.className += 'hidden'

            if(connection.isInitiator === true ){
                //soft fix for echo
                connection.mainContainer.muted = true;

                //setting preview image, wait 1 seonds then take pic
                screenshotPreview(connection.mainContainer); 
             }   
        } else {
            //if connection has stream and video
            //select the video tag with "video" id and load source for broadcast
            if(event.stream.isScreen === true){
                connection.mainContainer.src = event.blobURL;
            } else {
                connection.sideContainer.src = event.blobURL;
            }

            if(connection.isInitiator === true){
                //Put video tag on muted to fix echo and capture preview image
                connection.sideContainer.muted = true;
                screenshotPreview(connection.mainContainer);  
                                                 
            }
        }      

    };

    function screenshotPreview(vidObj){
        //setting preview image, wait 1 seonds then take pic
        $timeout(function() {
            var imgSrc = document.getElementById('canvas');

            //dynamically capture the full video screen
            imgSrc.width = vidObj.videoWidth;
            imgSrc.height = vidObj.videoHeight;

            //copy video screen to img
            imgSrc.getContext('2d').drawImage(vidObj,0,0,vidObj.videoWidth,vidObj.videoHeight);
            
            //send final data to save in the backend
            $state.params.data.coverImage = imgSrc.toDataURL();
        }, 1000);            
    }

    function updateView(){
        //add viewcount to the back end
        var view = $scope.viewcount;
        var currentView = connection.getAllParticipants().length;


        $scope.viewCount = currentView;
        //update view count on the backend to show in the channel view
        if(view !== currentView){
            BroadcastService.updateView($scope.uniqueID,currentView);
        }        
    }



    // Using getScreenId.js to capture screen from any domain
    // Code is used for screen broadcast to check if extension/add-on is included
    connection.getScreenConstraints = function(callback) {
        getScreenConstraints(function(error, screen_constraints) {
            if (!error) {
                screen_constraints = connection.modifyScreenConstraints(screen_constraints);
                callback(error, screen_constraints);
                return;
            }
            console.log(error);
            throw error;
        });
    };        

    // ......................................................
    // ..............Starting Broadcast......................
    // ......................................................

    if($stateParams.thetype === 'broadcast' && $state.params.data){
        $scope.uniqueID = $state.params.data.channelId;
        $timeout($scope.openRoom($state.params.data),0);
    } else if ($stateParams.thetype === 'viewer' && $stateParams.id){
        

        connection.checkPresence($stateParams.id, function(isRoomExist, roomId){ // this is purely khan stuff, it check if there is already a room with the same name on the signaling server
            if (isRoomExist){ // if the room name already exist on the signaling server, a new room will NOT be created. we get a error message. NOT REUSABLE
                $scope.uniqueID = $stateParams.id;
                $scope.ifLive = true;
                $timeout($scope.joinRoom($stateParams.id),0);
            }
            else{
                $scope.broadcastingEnded = true;
                $rootScope.$digest();
            }
        });      
        // $scope.uniqueID = $stateParams.id;
        // $timeout($scope.joinRoom($stateParams.id),0);
    } else {        
        $state.go('broadcastHome');
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
        chatContainer.scrollTop = chatContainer.scrollHeight;
    };

    //upon receiving message, update chat box with remote text
    connection.onmessage = function(event){
        appendDIV(event.data);
        chatContainer.scrollTop = chatContainer.scrollHeight;
    };

    //need to use angular way instad of jquery.
    var chatContainer = document.getElementById('chat-output');
    function appendDIV(event) {
        var div = document.createElement('div');
        div.innerHTML = event.data || event;
        chatContainer.insertBefore(div, chatContainer.lastChild);
        div.tabIndex = 0;
        // div.focus();

        // document.getElementById('input-text-chat').focus();
    }

    // ......................................................
    // ..................Viewer Count........................
    // ......................................................


    $interval(function(){
        updateView();       
    },2000);

    // if the broadcaster stops, viewers will have a message
    connection.onleave = function(user){
        console.log(user.userid, " left us!");
        if (user.userid == connection.sessionid){
            if($stateParams.thetype === "viewer"){
                $scope.broadcastingEnded = true;
            }
        }
    };

    $scope.$on('onBeforeUnload', function (e, confirmation, $scope) { //for the before unload stuff
        //confirmation.message = "All data willl be lost.";
        //e.preventDefault();
    });

    $scope.$on('onUnload', function (e, $scope) { //for the unload stuff, leaving page will only appear for 0.00000001 sec.
        //console.log('leaving page'); // Use 'Preserve Log' option in Console
    });

   
   

});


