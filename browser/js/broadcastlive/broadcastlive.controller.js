app.controller('BroadcastCtrl', function($scope,$state){
	$scope.startBroadcast = function(data){
		// console.log(data);
		$state.go('broadcastLive', {data: data})
	}

	$scope.joinBroadcast = function(data){
		$state.go('broadcastLive', {data: data})
	}


});