app.controller('HomeCtrl', function($scope){
	// to create manipulatable app obj
	var testApp = app; 
	console.log('_MAIN_APP_', testApp);

	$scope.run = function(){
		console.log(getApp());
		$scope.components = getApp();	
	};

	function getApp(){
		var obj = {};
		var keys = Object.keys(testApp);

		for (var i = 0; i < keys.length; i++){
			if (keys.indexOf(keys[i] < 0)){
				obj[keys[i]] = testApp[keys[i]];
			}
		}
		return obj;
	}
});