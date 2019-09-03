(function () {
    'use strict';

    angular
        .module('DonationsApp')
        .controller('LoginController', LoginController);

    LoginController.$inject = ['$state', '$cookies', '$interval','AuthenticationService'];
    function LoginController($state, $cookies, $interval, AuthenticationService) {
        var lc = this;

        lc.authKey = $cookies.get('apiToken');
        lc.donorKey = $cookies.get('donorToken');
        
        lc.login = login;

        // (function initController() {
        //     // reset login status
        //     // AuthenticationService.ClearCredentials();
        // })();

        function login() {
            lc.dataLoading = true;
            AuthenticationService.Login(lc.campaignCode, lc.username, lc.password, function (response) {
                if (response) {
                    $state.go('donations');
                } else {
                    //console.log(err);
                    lc.dataLoading = false;
                }
            });
        };
    }

})();
