(function () {
    'use strict';

    angular
        .module('DonationsApp')
        .controller('MainController', MainController);

    MainController.$inject = ['$location', '$cookies', '$interval', 'AuthenticationService'];
    function MainController($location, $cookies, $interval, AuthenticationService) {
        var mc = this;

        AuthenticationService.GetAppAuthToken();
        mc.authKey = $cookies.get('apiToken');
        mc.donorKey = $cookies.get('donorToken');
        $interval(function () {
            AuthenticationService.GetAppAuthToken();
        }, 60000);

        if (mc.donorKey == '' || mc.donorKey == undefined) {
            $location.path('/');
        }



        
    }

})();
