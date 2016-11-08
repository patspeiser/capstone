app.controller('HomeCtrl', function($scope, HomeService, $state){
	var testApp = app; 
	console.log('_MAIN_APP_', testApp);
	$scope.show = false; 
	var componentList = {};	

	$scope.run = function(){
		$scope.components = testApp._invokeQueue;
		$scope.states = $state.get();
		var componentKeys = Object.keys(testApp._invokeQueue);
		
		//this reducer works by collapsings all components in the main app into an object groups by service type
		// note that "register" seems to be synonomous to "controller"
		/* example 
			{
				factory: [factory1, factory2, factory3],
				register: [controller1, controller2, controller3],
				directive: [directive1, directive2, directive2]
			}
		*/
		componentKeys.reduce(function(previous, current, index, array){
			if (Object.keys(componentList).indexOf(testApp._invokeQueue[current][1]) < 0){
				return componentList[testApp._invokeQueue[current][1]] = [testApp._invokeQueue[current]];
			} else {
				return componentList[testApp._invokeQueue[current][1]].push(testApp._invokeQueue[current]);
			}
		}, {});	
		$scope.show = !$scope.show; 
		console.log('collection', componentList);
	};

	$scope.groupedComponents = componentList;  
});