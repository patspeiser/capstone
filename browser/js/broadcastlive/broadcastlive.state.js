app.config(function ($stateProvider) {

    $stateProvider.state('broadcastHome', {
        url: '/broadcast',
        controller: 'BroadcastCtrl',
        templateUrl: 'js/broadcastlive/broadcastlive.html',
    });
});