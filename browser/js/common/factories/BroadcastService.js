app.factory('BroadcastService', function($http, $rootScope, $window){
	var channels = []; 

	var BroadcastService = function(){};

		BroadcastService.prototype.reduceView = function(channelName){ //reduce view count by 1
			return $http.put('/api/channels/reduce/'+ channelName)
			.then(function(result){
				return result;
			});
		};

		BroadcastService.prototype.increaseView = function(channelName){ //increase view count by 1
			return $http.put('/api/channels/increase/'+ channelName)
			.then(function(result){
				return result;
			});
		};

		BroadcastService.prototype.createChannel = function(channelId, extra){ //add a new channel to database after someone opens a room
			return $http.post('/api/channels/'+channelId, extra)
			.then(function(result){
					channels.push(result.data); // this code is probably not needed 
				});
		};

		BroadcastService.prototype.findAllChannels = function(){ // get all channels from our database
			return $http.get('/api/channels')
			.then(function(result){
				angular.copy(result.data, channels);
				return channels;
			});
		};

		BroadcastService.prototype.findById = function(id){ // get all channels from our database
			return $http.get('/api/channels/' + id)
			.then(function(result){
				return result.data;
			});
		};


		BroadcastService.prototype.closeRoom = function(channelId){ // remove a room from our database
			var that = this;
			return $http.delete('/api/channels/' + roomId)
			.then(function(result){
					that.findAllChannels(); //this code is probably not needed
				})
			.then(function(){
				console.log(channels);
			});
		};
	    console.log(BroadcastService);
	    return BroadcastService;		
	})
.run(function(BroadcastService){
});

