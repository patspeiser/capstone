app.factory('BroadcastLiveService', function($http, $rootScope, $window){
	var recorder; 

	return {
		addChannel: function (data){
			return $http.post('/api/channels', data)
			.then(function(result){
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
		},
		getStream: function(connection){
        	var streamId = Object.keys(connection.streamEvents)[2];
        	return connection.streamEvents[streamId].stream;
    	},
    	getRecorder: function(connection){
    		if (recorder) return recorder;
    		recorder = RecordRTC(this.getStream(connection), {
    			type: 'video',
    			recorderType: RecordRTC.WhammyRecorder
    		}) ;
    		return recorder;
    	},
    	saveToDropbox: function(user, connection){
    		var dbx = new Dropbox({accessToken: user.dropbox_id});
            dbx.filesUpload({
                path: '/whats_on_' + Date.now() + '.webm',
                contents: this.getRecorder(connection).getBlob()
            });
    	}

    }
});