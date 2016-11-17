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

		findById: function(id){
			return $http.get('/api/' + id)
				.then(function(result){
					return result.data;
				});
		},

		create: function(name){
			return $http.post('/api/rooms', { name: name })
				.then(function(result){
					return result.data;
				});
		},

		delete: function(name){
			return $Http.delete('/api/rooms' + id)
				.then(function(result){
					return result.data;
				});
		}
	};
});