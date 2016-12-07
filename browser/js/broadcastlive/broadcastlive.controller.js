app.controller('BroadcastCtrl', function($scope,$state, $rootScope, subscribers, Session, $timeout){
	var connection = $rootScope.connection;
	$scope.user = Session.user;
	$scope.broadcast = {};

	$scope.messageSent = false;

	$scope.isSpeakerReady = DetectRTC.hasSpeakers ? 'Yes':'No';
    $scope.isMicrophoneReady = DetectRTC.hasMicrophone ? 'Yes':'No';
    $scope.isWebcamReady = DetectRTC.hasWebcam ? 'Yes':'No'; 

    $scope.selectCategory = "Select a category (Required)";

    $scope.broadcast.tags = [];

    $scope.screenCheck = "Off";
    $scope.checkScreen = function(check){
    	if(check){
    		$scope.screenCheck = "On";
    	} else {
    		$scope.screenCheck = "Off";
    	}
    }

	$scope.prepareBroadcast = function(data){
		//product a unique id for the broadcast
		data.channelId = connection.token();
		data.userId = Session.user ? Session.user.id : null;

		if($scope.shareScreen){
			data.session = {
		        screen: true,
		        video: true,
		        audio: true,
		        data: true,
		        oneway: true				
			}
		} else {
			data.session = {
		        video: true,
		        audio: true,
		        data: true,
		        oneway: true				
			}			
		}

		// email notification system, uncomment the if stuff below to reactive email notification system
		if (Session.user){
			for (let i=0; i<subscribers.length; i++){
				emailjs.send('gmail', 'broadcasting',{
					email: subscribers[i].subscriber.email, 
					subscriber: subscribers[i].subscriber.name,
					broadcaster: subscribers[i].broadcaster.name,
					channelId: data.channelId,
					coverimage: 'https://cdn3.iconfinder.com/data/icons/internet-3-4/128/103-128.png',
					link: 'https://capstone-test-ps.herokuapp.com/broadcastLive?id=' + data.channelId + '&thetype=viewer',
				});
			}
		}

		$state.go('broadcastLive', {data: data, type: 'broadcast', thetype:'broadcast'})
	}

	$scope.addTag = function(){
		if($scope.broadcast.tags.indexOf($scope.tag) == -1){
			$scope.broadcast.tags.push($scope.tag);
			$scope.tag = null;
		}
		else{
			$scope.tag = null;
		}
	}

	$scope.removeTag=function(tag){
		var idx = $scope.broadcast.tags.indexOf(tag);
		$scope.broadcast.tags.splice(idx,1);
	}

	// select a category for your broadcast
	$scope.changeCategory = function(category){
		$scope.broadcast.category = category;
		$scope.selectCategory = "Change category";
	}



	$scope.joinBroadcast = function(data){
		$state.go('broadcastLive', {data: data, type: 'viewer', thetype:'viewer', id:data.channelId})
	}

	// sends a email message to all your subscribers
	$scope.sendMessage = function(message){
		console.log(message);
		for (let i=0; i<subscribers.length; i++){
			emailjs.send('gmail', 'notice',{
				email: subscribers[i].subscriber.email, 
				subscriber: subscribers[i].subscriber.name,
				broadcaster: subscribers[i].broadcaster.name,
				message: message,
			});
		}
		$scope.message = null;
		$scope.messageSent = true;
		$timeout(function(){
			$scope.messageSent = false;
		}, 3000);
	}

	$scope.joinRoom = function(id){
		var connection = new RTCMultiConnection();

	    // comment-out below line if you do not have your own socket.io server
	    connection.socketURL = 'https://rtcmulticonnection.herokuapp.com:443/';

	    connection.session = {
	        screen: true,
	        video: true,
	        audio: true,
	        data: true,
	        oneway: true
	    };

        connection.sdpConstraints.mandatory = {
            OfferToReceiveAudio: true,
            OfferToReceiveVideo: true
        };

    	connection.socketMessageEvent = 'video-broadcast';
    	$state.go('broadcastLive',{thetype:'viewer' , id: id, connection: connect})
    	.then(function(result){
	    	connection.join(id);	
    	})
	}

});