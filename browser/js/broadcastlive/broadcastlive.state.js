app.config(function ($stateProvider) {

    $stateProvider.state('broadcastHome', {
        url: '/broadcast',
        controller: 'broadcastCtrl',
        templateUrl: 'js/broadcastlive/broadcastlive.html',
    });
});