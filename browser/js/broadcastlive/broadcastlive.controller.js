app.controller('BroadcastCtrl', function($scope,$state, $rootScope, subscribers, Session){
	var connection = $rootScope.connection;
	$scope.user = Session.user;
	$scope.broadcast = {};

	$scope.isSpeakerReady = DetectRTC.hasSpeakers ? 'Yes':'No';
    $scope.isMicrophoneReady = DetectRTC.hasMicrophone ? 'Yes':'No';
    $scope.isWebcamReady = DetectRTC.hasWebcam ? 'Yes':'No'; 

    $scope.selectCategory = "Select a category (Required)";

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
		// if (Session.user){
		// 	for (let i=0; i<subscribers.length; i++){
		// 		emailjs.send('gmail', 'broadcasting',{
		// 			email: subscribers[i].subscriber.email, 
		// 			subscriber: subscribers[i].subscriber.name,
		// 			broadcaster: subscribers[i].broadcaster.name,
		// 			channelId: data.channelId,
		// 			coverimage: 'http://factoflife.net/upload/images/20160603/funny-cat-facts.jpg', //need more work, will be variable
		// 			link: 'www.google.com',
		// 			link2: 'www.yahoo.com', 
		// 		});
		// 	}
		// }

		$state.go('broadcastLive', {data: data, type: 'broadcast', thetype:'broadcast'})
	}

	$scope.checkScreen = function(){
		console.log($scope.shareScreen);
		
	}

	$scope.changeCategory = function(category){
		$scope.broadcast.category = category;
		$scope.selectCategory = "Change category";
	}

	$scope.joinBroadcast = function(data){
		$state.go('broadcastLive', {data: data, type: 'viewer', thetype:'viewer', id:data.channelId})
	}

	$scope.sendMessage = function(){
		for (let i=0; i<subscribers.length; i++){
			emailjs.send('gmail', 'notice',{
				email: subscribers[i].subscriber.email, 
				subscriber: subscribers[i].subscriber.name,
				broadcaster: subscribers[i].broadcaster.name,
				message: $scope.message,
			});
		}
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