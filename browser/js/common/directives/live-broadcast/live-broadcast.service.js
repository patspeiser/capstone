app.factory('BroadcastLiveService', function($http, $rootScope, $window){


	return {
		addChannel: function (data){
			return $http.post('/api/channels', data)
			.then(function(result){
				console.log(result.data);
				return result.data;
			})
		},
		subscribe: function(channelId, subscriberId){
			return $http.post('/api/channels/subscription/' + channelId + '/' + subscriberId)
				.then(function(result){
					return result.data;
				})
		},
		getSubscriptionForViewer: function(viewerId, channelId){
			return $http.get('/api/channels/subscription/' + viewerId + '/' + channelId)
				.then(function(result){
					return result.data;
				})
		}
	};
});