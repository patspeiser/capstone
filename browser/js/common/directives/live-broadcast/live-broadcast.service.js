app.factory('BroadcastLiveService', function($http, $rootScope, $window){


	return {
		addChannel: function (data){
			return $http.post('/api/channels', data)
			.then(function(result){
				console.log(result.data);
				return result.data;
			})
		},
		subscribe: function(broadcasterId, subscriberId){
			return $http.post('/api/channels/subscription/' + broadcasterId + '/' + subscriberId)
				.then(function(result){
					return result.data;
				})
		}
	};
});