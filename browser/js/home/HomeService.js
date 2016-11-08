app.factory('HomeService', function($http){
	return {
		getRepo: function(repo){
			return $http.get(repo)
				.then(function(result){
					return result.data;
				});
		}

	};
});