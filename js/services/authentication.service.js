(function () {
    'use strict';

    angular
        .module('DonationsApp')
        .factory('AuthenticationService', AuthenticationService);

    AuthenticationService.$inject = ['$http', '$cookies'];
    function AuthenticationService($http, $cookies) {
        var service = {};
        var apiUrl = 'http://192.168.7.51:3000/api';
        var apiKey = "RTJ4+E4067P+mqIEizOkGu7nHAxRBfZzkE+/+r1/SbQ=";
        var apiHeader = "Basic dmlhcm86cEBzc3dvcmQ=";

        service.GetAppAuthToken = GetAppAuthToken;
        service.Login = Login;
        service.ValidateAppKey = ValidateAppKey;

        return service;

        function GetAppAuthToken() {
            var now = new Date();

            var exp = new Date(now.getFullYear(), now.getMonth(), now.getDay(), now.getHours(), now.getMinutes() + 1, now.getSeconds());

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
            /* Use this for real authentication
             ----------------------------------------------*/
            $http({
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
            .then(function (response) {
                $cookies.put('donorToken', response.data.Data.DonorToken);
                callback(response);
            })
            .catch(function (err) {
                console.log(err);
                
                return err;
            });

        }

        function ValidateAppKey(token) {

        }
    }

})();