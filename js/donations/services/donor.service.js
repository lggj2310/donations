(function () {
    'use strict';

    angular
        .module('DonationsApp')
        .factory('DonorService', DonorService);

    DonorService.$inject = ['DonorRepository', '$cookies', 'apiUrl', 'apiKey'];
    function DonorService(DonorRepository, $cookies, apiUrl, apiKey) {
        var service = {};

        service.GetPaymentTypeConfiguration = GetPaymentTypeConfiguration;
        service.GetCountriesConfiguration = GetCountriesConfiguration;
        service.GetStatesConfiguration = GetStatesConfiguration;
        service.GetAgencyConfiguration = GetAgencyConfiguration;

        service.SendDonation = SendDonation;

        service.GetDonations = GetDonations;

        service.pledge = {};
        service.donation = {
            CampaignId: "ac58aac5-2baa-41a0-9395-898bcb939cda",
            PledgeStatusType: 0,
            DonationSourceType: 9,
            PaymentType: 5,
            FrequencyType: 0,
            PaymentAmountType: 1,
            PaymentTotalValue: 0,
            AddOnTotalValue: 0,
            PaymentAmount: 0,
            TotalValue: 0,
            Payment: { /* Este diccionario va vacio porque el PaymentType = 5 no acepta datos de billing */
                BillingAddress1: "",
                BillingAddress2: "",
                BillingCity: "",
                BillingState: "",
                BillingZipCode: "",
                BillingZipCodeExt: "",
                BillingCountryCode: ""
                /*Esta información es la ingresada en el paso 1*/
            },
            AddOnList: [],
            AddOnTotalList: [],
            DesignationAmountType: 1,
            DesignationWriteInList: [],
            NegativeDesignation: "",
            DesignationList: [{
                /*Acá debe estar la agencia seleccionada en el paso 2*/
                /*Debe estar completo con las configuraciones d ela agencia*/
                CFCAgencyId: "",
                DesignateableEntityType: "",
                /* DesignateableEntityTypeCode.Code debe ser usado o  DesignateableEntityType, en caso que uno sea nulo, usar el otro*/ "DesignationId": "",
                DisplayName: "",
                DistributionDesignationId: "",
                EIN: "",
                EntityId: "",
                IsDefaultPanelItem: false,
                IsRejected: false,
                MinimumDonation: "",
                MinimumTotalDonationForDesignation: "",
                Name: "",
                OrganizationNumber: "",
                DesignationAmount: "",
                StandardAccountCode: ""
            }],
            PaymentIncreaseAmountType : 1,
            PaymentIncreaseAmount : 0,
            IsImpersonated : false,
            ImpersonatedUser : "",
            IsConfirmed : true,
            /* configuración obtenida en paso 1
            Estos campos no son requeridos porque el PaymentType = 5 no guarda información de la tarjeta
            */
            CustomField1 : "",
            CustomField2 : "",
            CustomField3 : "",
            CustomField4 : "",
            CustomField5 : "",
            CustomField6 : ""
          };

        return service;

        //Functions
        function GetDonations(donorToken, callback) {
            var apiToken = $cookies.get('apiToken');
            
            DonorRepository.GetDonations(apiUrl, apiToken, donorToken, apiKey).then(
                function(response) {
                    callback(response);
                }
            );

        }


        function GetPaymentTypeConfiguration(donorToken, paymentType, callback) {

            var apiToken = $cookies.get('apiToken');

            DonorRepository.GetPaymentTypeConfiguration(apiUrl, apiToken, donorToken, paymentType, apiKey).then(function (response) {
                callback(response);
            })
            .catch(function (err) {
                console.log(err);
                return err;
            });

        }

        function GetCountriesConfiguration(donorToken, callback) {

            var apiToken = $cookies.get('apiToken');

            DonorRepository.GetCountriesConfiguration(apiUrl, apiToken, donorToken, apiKey).then(function (response) {
                callback(response);
            })
            .catch(function (err) {
                console.log(err);
                return err;
            });

        }

        function GetStatesConfiguration(donorToken, callback) {

            var apiToken = $cookies.get('apiToken');

            DonorRepository.GetStatesConfiguration(apiUrl, apiToken, donorToken, apiKey).then(function (response) {
                callback(response);
            })
            .catch(function (err) {
                console.log(err);
                return err;
            });

        }

        function GetAgencyConfiguration(donorToken, callback) {

            var apiToken = $cookies.get('apiToken');

            DonorRepository.GetAgencyConfiguration(apiUrl, apiToken, donorToken, apiKey).then(function (response) {
                callback(response);
            })
            .catch(function (err) {
                console.log(err);
                return err;
            });

        }

        function SendDonation(donorToken, callback) {
            var apiToken = $cookies.get('apiToken');
            var ipAddress = "0.0.0.0";
            
            service.pledge = [{
                CampaignId: 'ac58aac5-2baa-41a0-9395-898bcb939cda',
                PledgeStatusType: 0,
                DonationSourceType: 9,
                PaymentType: 5,
                FrequencyType: 1,
                PaymentAmountType: 1,
                PaymentTotalValue: service.donation.PaymentAmount,
                AddOnTotalValue: 0,
                PaymentAmount: service.donation.PaymentAmount,
                TotalValue: service.donation.PaymentAmount,
                Payment: {},
                AddOnList: [],
                DesignationAmountType: 1,
                DesignationList: [
                    {
                    DesignateableEntityType: service.donation.DesignationList[0].DesignateableEntityType,
                    DisplayName: service.donation.DesignationList[0].DisplayName,
                    EIN: '',
                    EntityId: service.donation.DesignationList[0].EntityId,
                    EntityIdentifier: service.donation.DesignationList[0].EntityIdentifier,
                    IsDefaultPanelItem: false,
                    IsRejected: false,
                    MinimumDonation: service.donation.DesignationList[0].MinimumDonation,
                    MinimumTotalDonationForDesignation: service.donation.DesignationList[0].MinimumTotalDonationForDesignation,
                    Name: service.donation.DesignationList[0].Name,
                    DesignationAmount: service.donation.DesignationList[0].DesignationAmount,
                    OrganizationNumber: service.donation.DesignationList[0].OrganizationNumber,
                    StandardAccountCode: service.donation.DesignationList[0].StandardAccountCode
                    }
                ],
                DeclinedMatch: true,
                DesignationWriteInList: [],
                NegativeDesignation: '',
                SignatureRequiredQuestionAnswer: '',
                PaymentIncreaseAmountType: 1,
                PaymentIncreaseAmount: 0,
                IsImpersonated: true,
                ImpersonationUser: 'Administrator',
                IsConfirmed: true
            }];

            DonorRepository.SendDonation(apiUrl, apiToken, donorToken, ipAddress, service.pledge, apiKey)
            .then(function (response) {
                callback(response);
            })
            .catch(function (err) {
                console.log(err);
                return err;
            });
        }
    }

})();