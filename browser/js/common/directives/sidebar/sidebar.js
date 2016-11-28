app.directive('sidebar', function () {


    return {
    	restrict: 'E',
    	// scope: {
     //        channels: '='
     //    },
    	templateUrl: '/js/common/directives/sidebar/sidebar.html',
        controller: function ($scope, BroadcastService) {
        	// console.log('sidebar directive loaded');
            $scope.findAllCategories = function(){
                return BroadcastService.findAllCategories()
                .then(function(categories){
                    $scope.categories = categories;
                    console.log($scope.categories)
                })
                .catch(function(err){
                    console.log(err)
                })
            }; 
            var init = function(){
                $scope.findAllCategories(); 
            }
            init(); 
            // $scope.filterByCategory


        }
    };
});