app.directive('roomList', function () {

    return {
    	restrict: 'E',
    	scope: {
    		rooms: '='
    	},
    	templateUrl: '/js/rooms/room-list.html',
        controller: function ($scope, RoomsService) {
        	console.log('roomlist directive loaded');
        }
    };
});

app.directive('roomDetail', function () {

    return {
    	restrict: 'E',
    	scope: {
    		room: '='
    	},
    	templateUrl: '/js/rooms/room-detail.html',
        controller: function ($scope, RoomsService) {
        	console.log('single room directive loaded');
        }
    };
});