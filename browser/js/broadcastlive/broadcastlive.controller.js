app.controller('BroadcastCtrl', function($scope,$state, $rootScope, subscribers, Session, $timeout){
	var connection = $rootScope.connection;
	$scope.user = Session.user;
	$scope.broadcast = {};

	$scope.messageSent = false;

	$scope.isSpeakerReady = DetectRTC.hasSpeakers ? 'Yes':'No';
    $scope.isMicrophoneReady = DetectRTC.hasMicrophone ? 'Yes':'No';
    $scope.isWebcamReady = DetectRTC.hasWebcam ? 'Yes':'No'; 

    $scope.selectCategory = "Select a category (Required)";

	$scope.prepareBroadcast = function(data){
		//product a unique id for the broadcast
		data.channelId = connection.token();
		data.userId = Session.user ? Session.user.id : null;

		//check to see if they users wants to broadcast w or w/o screen
		if($scope.shareScreen){
			data.session = {
				screen: true,
		        video: true,
		        audio: true,
		        data: true,
		        oneway: true
			};
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

	$scope.checkScreen = function(){
		console.log($scope.shareScreen);
		
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

});