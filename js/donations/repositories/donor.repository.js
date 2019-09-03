(function () {
    'use strict';

    angular
        .module('DonationsApp')
        .factory('DonorRepository', DonorRepository);

    DonorRepository.$inject = ['$http'];
    function DonorRepository($http) {
        var repository = {};

        repository.GetDonations = GetDonations;
        repository.GetPaymentTypeConfiguration = GetPaymentTypeConfiguration;
        repository.GetCountriesConfiguration = GetCountriesConfiguration;
        repository.GetStatesConfiguration = GetStatesConfiguration;
        repository.GetAgencyConfiguration = GetAgencyConfiguration;
        repository.SendDonation = SendDonation;

        return repository;

        function GetDonations(apiUrl, apiToken, donorToken, apiKey) {
           
            return $http({
                method: 'GET',
                url: apiUrl + '/Donor/GivingHistory', 
                params: { 
                    donorToken: donorToken,
                    apiKey: apiKey
                },
                headers: {
                    Authorization: 'Bearer ' + apiToken
                }
            })
            .then(function(response) {
                return response.data.Data;
            })
            .catch(function(err) {
                return err;
            });
        }

        function GetPaymentTypeConfiguration(apiUrl, apiToken, donorToken, paymentType, apiKey) {

            return $http({
                method: 'GET',
                url: apiUrl + '/Configuration/PaymentTypeConfiguration', 
                params: { 
                    donorToken: donorToken,
                    paymentType: paymentType,
                    apiKey: apiKey
                },
                headers: {
                    Authorization: 'Bearer ' + apiToken
                }
            })
            .then(function (response) {
                return response.data.Data;
            })
            .catch(function (err) {
                return err;
            });

        }

        function GetCountriesConfiguration(apiUrl, apiToken, donorToken, apiKey) {

            return $http({
                method: 'GET',
                url: apiUrl + '/Configuration/Countries', 
                params: { 
                    donorToken: donorToken,
                    apiKey: apiKey
                },
                headers: {
                    Authorization: 'Bearer ' + apiToken
                }
            })
            .then(function (response) {
                return response.data.Data;
            })
            .catch(function (err) {
                console.log(err);
                return err;
            });

        }

        function GetStatesConfiguration(apiUrl, apiToken, donorToken, apiKey) {

            return $http({
                method: 'GET',
                url: apiUrl + '/Configuration/USStates', 
                params: { 
                    donorToken: donorToken,
                    apiKey: apiKey
                },
                headers: {
                    Authorization: 'Bearer ' + apiToken
                }
            })
            .then(function (response) {
                return response.data.Data;
            })
            .catch(function (err) {
                return err;
            });

        }

        function GetAgencyConfiguration(apiUrl, apiToken, donorToken, apiKey) {

            return $http({
                method: 'GET',
                url: apiUrl + '/Configuration/IntroductoryPanel', 
                params: { 
                    donorToken: donorToken,
                    apiKey: apiKey
                },
                headers: {
                    Authorization: 'Bearer ' + apiToken
                }
            })
            .then(function (response) {
                return response.data.Data;
            })
            .catch(function (err) {
                console.log(err);
                return err;
            });

        }

        function SendDonation(apiUrl, apiToken, donorToken, ipAddress, pledge, apiKey) {

            return $http({
                method: 'POST',
                url: apiUrl + '/Donation/Save', 
                params: { 
                    apiKey: apiKey,
                    donorToken: donorToken,
                    ipAddress: ipAddress
                },
                data: pledge,
                headers: {
                    Authorization: 'Bearer ' + apiToken,
                    Accept: 'application/json'
                }
            })
            .then(function (response) {
                return response;
            })
            .catch(function (err) {
                return err;
            });
        }
    }

})();