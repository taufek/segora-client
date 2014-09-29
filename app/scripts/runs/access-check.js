'use strict';

angular.module("segoraClientApp")
.run(function($rootScope, $location, UserSessionService, StatusService, FlashService) {
        var routesThatDoesNotRequireAuth = ['/home', '/login'];

        $rootScope.$on('$routeChangeStart', function(event, next, current) {

            var valid = false;

            routesThatDoesNotRequireAuth.some(function(path) {

                if ($location.absUrl().lastIndexOf(path) > 0) {
                    valid = true;
                    return true;
                }
                return false;
            });

            if (!valid && !UserSessionService.hasSession()) {
                $location.path('/login');
                StatusService.stop();
                FlashService.setMessage("Please log in to continue.", 'danger');
            }


        });

        $rootScope.hasAnyRoles = UserSessionService.hasAnyRoles;
    }
);