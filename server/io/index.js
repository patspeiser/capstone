'use strict';
var socketio = require('socket.io');
var io = null;

module.exports = function (server) {

    if (io) return io;

    io = socketio(server);

    io.on('connection', function (socket) {
    	// socket.on('blam', function(){
    	// 	var end = Date.now() + (3 * 1000);
    	// 	while( Date.now() < end){
    	// 		console.log(Date.now(), end);
    	// 	}
    	// 	console.log('dunnnnnn');
    	// });
        // Now have access to socket, wowzers!
    });

    return io;

};
