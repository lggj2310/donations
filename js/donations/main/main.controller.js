(function () {
    'use strict';

    angular
        .module('DonationsApp')
        .controller('MainController', MainController);

    MainController.$inject = ['$state', '$cookies', '$interval', 'AuthenticationService'];
    function MainController($state, $cookies, $interval, AuthenticationService) {
        var mc = this;

        

        AuthenticationService.GetAppAuthToken();
        mc.authKey = $cookies.get('apiToken');
        mc.donorKey = $cookies.get('donorToken');
        $interval(function () {
            AuthenticationService.GetAppAuthToken();
        }, 60000);

        if (mc.donorKey == '' || mc.donorKey == undefined) {
            $state.go('login');
        }


        
    }

})();
