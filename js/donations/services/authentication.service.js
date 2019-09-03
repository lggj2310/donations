(function () {
    'use strict';

    angular
        .module('DonationsApp')
        .factory('AuthenticationService', AuthenticationService);

    AuthenticationService.$inject = ['AuthenticationRepository', '$cookies', 'apiUrl', 'apiKey'];
    function AuthenticationService(AuthenticationRepository, $cookies, apiUrl, apiKey) {
        var service = {};
        var apiHeader = "Basic dmlhcm86cEBzc3dvcmQ=";

        service.GetAppAuthToken = GetAppAuthToken;
        service.Login = Login;

        return service;

        function GetAppAuthToken() {
            var now = new Date();

            var exp = new Date(now.getFullYear(), now.getMonth(), now.getDay(), now.getHours(), now.getMinutes() + 1, now.getSeconds());

            AuthenticationRepository.GetAppAuthToken(apiUrl, apiKey, apiHeader)
            .then(function (data) {
                $cookies.remove('apiToken');
                $cookies.put('apiToken', data.data, [{ expires: exp}]);
                return data;
            })
            .catch(function (err) {
                console.log(err);
                return err;
            });         
        };

        function Login(campaignCode, username, password, callback) {

            var apiToken = $cookies.get('apiToken');

            AuthenticationRepository.Login(apiUrl, apiToken, campaignCode, username, password, apiKey)
            .then(function (response) {
                $cookies.put('donorToken', response.data.Data.DonorToken);
                callback(response);
            })
            .catch(function (err) {
                console.log(err);
                
                return err;
            });

        }
    }

})();