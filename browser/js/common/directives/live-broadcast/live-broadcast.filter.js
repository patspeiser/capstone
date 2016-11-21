//Handling video resources with angular
//Need to tell angular this is a trusted source so it won't block it

app.filter('trustResource', ['$sce', function($sce) {
    return function(url) {
        return $sce.trustAsResourceUrl(url);
    }
}]);