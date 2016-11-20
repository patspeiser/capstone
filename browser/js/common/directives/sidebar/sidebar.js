app.directive('sidebar', function () {


    return {
    	restrict: 'E',
    	// scope: {
     //        channels: '='
     //    },
    	templateUrl: '/js/common/directives/sidebar/sidebar.html',
        controller: function ($scope, BroadcastService) {
        	console.log('sidebar directive loaded');
            $scope.findAllChannels = function(){
                return BroadcastService.findAllChannels()
                .then(function(channels){
                    $scope.channels = channels
                })
                .catch(function(err){
                    console.log(err)
                })
            }; 
            var init = function(){
                $scope.findAllChannels(); 
            }
            init(); 
            console.log($scope.channels); 
        }
    };
});