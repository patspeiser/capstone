app.directive('navbar', function ($rootScope, AuthService, AUTH_EVENTS, $state) {

    return {
        restrict: 'E',
        scope: {},
        templateUrl: 'js/common/directives/navbar/navbar.html',

        link: function (scope) {

            scope.items = [
                // { label: 'Home', state: 'home' },
                { label: 'Start Broadcasting', state: 'broadcastHome'},
                { label: 'Explore Channels', state: 'channels({tag:null, category:null, channelname:null})'},
                { label: 'Join a Channel', state: 'join({tag:null, category:null, channelname:null})'},
                // { label: 'CREATE BROADCAST', state:'broadcasting({id:user.id})'},//need to get this user
                // { label: 'MEMBERS ONLY', state: 'membersOnly', auth: true }
            ];

            scope.user = null;

            scope.isLoggedIn = function () {
                return AuthService.isAuthenticated();
            };

            scope.logout = function () {
                AuthService.logout().then(function () {
                   $state.go('home');
                });
            };

            var setUser = function () {
                AuthService.getLoggedInUser().then(function (user) {
                    scope.user = user;
                    console.log('user',user);
                });
            };

            var removeUser = function () {
                scope.user = null;
            };

            setUser();

            $rootScope.$on(AUTH_EVENTS.loginSuccess, setUser);
            $rootScope.$on(AUTH_EVENTS.logoutSuccess, removeUser);
            $rootScope.$on(AUTH_EVENTS.sessionTimeout, removeUser);

        }

    };

});

/* Toggle between adding and removing the "responsive" class to topnav when the user clicks on the icon */
function navToggle() {
    var x = document.getElementById("myTopnav");
    if (x.className === "topnav") {
        x.className += " responsive";
    } else {
        x.className = "topnav";
    }
}
