app.factory('BroadcastLiveService', function($http, $rootScope, $window, BroadcastService){
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







		$window.onbeforeunload = function (e,confimration,scope) { //this block is about doing something right before the page is unloaded by the browser
	        //var confirmation = {}; //does not affect our app, it's just for the pop up when you try to refresh the page and stuff
	        //var event = $rootScope.$broadcast('onBeforeUnload', confirmation);//same as above, just for the pop up
	        //console.log(scope); // this scope is useless, so you can remove both scope variable in this block of code
	        if ($rootScope.unwantedChannelId){ //if the user using this page is a broadcaster, then do the following
	        	BroadcastService.closeChannel($rootScope.unwantedChannelId); //remove the channel from our database, $rootScope.unwanted is actually the room name for this broadcaster
	        	$rootScope.unwantedChannelId = null; //this tells our app that this guy is no longer broadcasting, it's useful when we have a button to stop broadcasting
	        }

	        // if ($rootScope.isWatching){
	        // 	$rootScope.connectionCopy.close();
	        // }

	        // if (event.defaultPrevented) { //this is for the pop up
	        // 	console.log(e);
	        // 	console.log("wtf");
	        // 	console.log($rootScope.unwanted);
	        // 	console.log(scope);
	        //     return confirmation.message;
	        // }
	    };
	    
	    $window.onunload = function (e, scope) { //this is probably not needed as well, since we have handled everything before unload
	    	//console.log(scope);
	    	//if ($rootScope.unwantedChannelId){
	    		BroadcastService.closeChannel($rootScope.unwantedChannelId);
	    		$rootScope.unwantedChannelId = null;
	    	//}

	    	// if ($rootScope.isWatching){
	     //    	$rootScope.connectionCopy.close();
	     //    }


	        //$rootScope.$broadcast('onUnload');
	    };










    	
	return BroadcastLiveService;
});