app.controller('BroadcastCtrl', function($scope,$state, $rootScope, subscribers, Session){
	var connection = $rootScope.connection;


	console.log(subscribers);




	$scope.startBroadcast = function(data){
		//product a unique id for the broadcast
		data.channelId = connection.token();
		data.broadcasterId = Session.user.id;
		$state.go('broadcastLive', {data: data, type: 'broadcast'})
	}

	$scope.joinBroadcast = function(data){
		$state.go('broadcastLive', {data: data, type: 'viewer'})
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

});