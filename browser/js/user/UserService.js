app.factory('UserService', function($http, $rootScope, $window){
	return {
		getRecordings: function(user){
			var dbx = new Dropbox({accessToken: user.dropbox_id});
			return dbx.filesListFolder({ path: '' })
			.then(function(recordings){
				return recordings.entries;
			});
		},
	};
});
