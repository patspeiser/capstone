app.factory('RoomsService', function($http){
	var _rooms = {};

	return {
		findAll: function(){
			return $http.get('/api/rooms')
				.then(function(result){
					_rooms = result.data;
					return _rooms;
				});
		},

		create: function(name){
			return $http.post('/api/rooms', name)
				.then(function(result){
					return result.data;
				});
		}



	}
})