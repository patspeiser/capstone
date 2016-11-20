app.config(function ($stateProvider) {

    // Register our *about* state.
    $stateProvider.state('channelDetail', {
        url: '/channels/:id',
        controller: 'ChannelCtrl',
        templateUrl: 'js/channels/channel-detail.html',
        resolve:{ //resolve all the channels
            channel: function(BroadcastService, $stateParams){
                //var channel = new BroadcastService();
                console.log($stateParams);
                return BroadcastService.findById($stateParams.id);
            }
        },
    });
});

app.controller('ChannelCtrl', function($scope, channel){
    console.log('channel', channel);
    $scope.channel = channel;
});