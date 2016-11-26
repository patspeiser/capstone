app.config(function ($stateProvider) {
    $stateProvider.state('home', {
        url: '/',
        templateUrl: '/js/channels/channels.html',
        controller: 'ChannelsCtrl', 
        resolve: {
        	channels: function(BroadcastService){
        		return BroadcastService.findAllChannels();
        	}
        }
    });
});

app.controller('HomeCtrl', function($scope, HomeService, $state){
});