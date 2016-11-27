app.controller('BroadcastCtrl', function($scope,$state, $rootScope){
	var connection = $rootScope.connection;

	$scope.startBroadcast = function(data){
		//product a unique id for the broadcast
		data.channelId = connection.token();
		$state.go('broadcastLive', {data: data, type: 'broadcast'})
	}

	$scope.joinBroadcast = function(data){
		$state.go('broadcastLive', {data: data, type: 'viewer'})
	}

});