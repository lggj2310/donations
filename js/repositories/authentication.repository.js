(function () {
    'use strict';

    angular
        .module('DonationsApp')
        .factory('AuthenticationRepository', AuthenticationRepository);

    AuthenticationRepository.$inject = ['$http'];
    function AuthenticationRepository($http) {
        var repository = {};

        repository.GetAppAuthToken = GetAppAuthToken;
        repository.Login = Login;

        return repository;

        function GetAppAuthToken(apiUrl, apiKey, apiHeader) {

            return $http(
                {
                    method: "GET",
                    url: apiUrl + '/Application/Authenticate',
                    params: {
                        "apiKey": apiKey
                    },
                    headers: {
                        "Authorization": apiHeader
                    }
                }
            )
            .then(function (data) {
                return data;
            })
            .catch(function (err) {
                return err;
            });         
        };

        function Login(apiUrl, apiToken, campaignCode, username, password, apiKey) {
            
            return $http({
                method: 'GET',
                url: apiUrl + '/Donor/Authenticate', 
                params: { 
                    campaignCode: campaignCode,
                    username: username, 
                    password: password,
                    apiKey: apiKey
                },
                headers: {
                    Authorization: 'Bearer ' + apiToken
                }
            })
            .then(function (data) {
                return data;
            })
            .catch(function (err) {
                return err;
            });

        }
    }

})();