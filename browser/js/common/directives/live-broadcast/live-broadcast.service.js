app.factory('BroadcastLiveService', function($http, $rootScope, $window){
	var recorder; 

	var BroadcastLiveService = {};
	
		BroadcastLiveService.addChannel = function (data){
			return $http.post('/api/channels', data)
			.then(function(result){
				return result.data;
			});
		};
		
		BroadcastLiveService.subscribe = function(channelId, subscriberId){
			return $http.post('/api/channels/subscription/' + channelId + '/' + subscriberId)
				.then(function(result){
					return result.data;
				});
		};
		
		BroadcastLiveService.getSubscriptionForViewer = function(viewerId, channelId){
			return $http.get('/api/channels/subscription/' + viewerId + '/' + channelId)
				.then(function(result){
					return result.data;
				});
		};

		

		BroadcastLiveService.getStream = function(connection){
        	var streamId = Object.keys(connection.streamEvents)[2];
        	return connection.streamEvents[streamId].stream;
    	};

    	BroadcastLiveService.getRecorder = function(connection){
    		if (recorder) return recorder;
    		recorder = RecordRTC(this.getStream(connection), {
    			type: 'video',
    			recorderType: RecordRTC.WhammyRecorder
    		}) ;
    		return recorder;
    	};

    	BroadcastLiveService.saveToDropbox = function(user, connection){
    		var dbx = new Dropbox({accessToken: user.dropbox_id});
            dbx.filesUpload({
                path: '/whats_on_' + Date.now() + '.webm',
                contents: this.getRecorder(connection).getBlob()
            });
    	};
    	
	return BroadcastLiveService;
});