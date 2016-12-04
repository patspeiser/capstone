app.directive('sidebar', function () {


    return {
    	restrict: 'E',
    	templateUrl: '/js/common/directives/sidebar/sidebar.html',
        controller: function ($scope, BroadcastService) {
            $scope.findAllCategories = function(){
                return BroadcastService.findAllCategories()
                .then(function(categories){
                    $scope.categories = categories;
                    console.log($scope.categories);
                })
                .catch(function(err){
                    console.log(err);
                });
            }; 
            var init = function(){
                $scope.findAllCategories(); 
            };
            init(); 
        }
    };
});