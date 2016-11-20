app.factory('ConnectionService', function($rootScope){
	var ConnectionService = function(){};
		ConnectionService.prototype.getConnection = function(){
			if ($rootScope.connection){
					return $rootScope.connection;
			}

			console.log("doo");

			$rootScope.connection = new RTCMultiConnection(); //khan stuff to create a connection object, not reusable

	        // by default, socket.io server is assumed to be deployed on your own url
	        // connection.socketurl = '/';

	        // comment-out below line if you do not have your own socket.io server
	        $rootScope.connection.socketURL = 'https://rtcmulticonnection.herokuapp.com:443/'; // khan stuff, not reusable
	        $rootScope.connection.socketMessageEvent = 'video-broadcast-demo'; // khan stuff, not reusable

	        // connection.session = { //khan stuff to define some details of a connection, not reusable
	        // 	audio: true,
	        // 	video: true,
	        // 	oneway: true
	        // };
	        return $rootScope.connection;
		};

		ConnectionService.prototype.joinRoom = function(room){
			return this.getConnection().join(room.name);
		};

	return ConnectionService; 
})
.run(function(ConnectionService){

});