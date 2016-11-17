app.config(function ($stateProvider) {

    // Register our *about* state.
    $stateProvider.state('rooms', {
        url: '/rooms',
        controller: 'RoomsCtrl',
        templateUrl: 'js/rooms/rooms.html'
    });

});

app.controller('RoomsCtrl', function($scope, RoomsService){
	RoomsService.findAll()
		.then(function(rooms){
            $scope.rooms = rooms;
		});

    $scope.create = function(room){
        RoomsService.create(room)
            .then(function(room){
                console.log(room);
            });
    };


});