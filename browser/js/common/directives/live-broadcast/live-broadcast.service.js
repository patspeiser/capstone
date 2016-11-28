app.factory('BroadcastLiveService', function($http, $rootScope, $window){


	return {
		addChannel: function (data){
			return $http.post('/api/channels', data)
			.then(function(result){
				return result.data
			})
		}
	};
});