app.controller('BroadcastCtrl', function($scope,$state){
	$scope.startBroadcast = function(data){
		// console.log(data);
		$state.go('broadcastLive', {data: data, type: 'broadcast'})
	}

	$scope.joinBroadcast = function(data){
		$state.go('broadcastLive', {data: data, type: 'viewer'})
	}

});