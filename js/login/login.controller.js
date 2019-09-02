(function () {
    'use strict';

    angular
        .module('DonationsApp')
        .controller('LoginController', LoginController);

    LoginController.$inject = ['$location', '$cookies', '$interval','AuthenticationService'];
    function LoginController($location, $cookies, $interval, AuthenticationService) {
        var lc = this;

        lc.authKey = $cookies.get('apiToken');
        lc.donorKey = $cookies.get('donorToken');
        
        lc.login = login;

        // (function initController() {
        //     // reset login status
        //     // AuthenticationService.ClearCredentials();
        // })();

        function getAuthKey() {
            AuthenticationService.GetAppAuthToken()
        }

        function login() {
            lc.dataLoading = true;
            AuthenticationService.Login(lc.campaignCode, lc.username, lc.password, function (response) {
                if (response) {
                    $location.path('/donations');
                } else {
                    //console.log(err);
                    lc.dataLoading = false;
                }
            });
        };
    }

})();
