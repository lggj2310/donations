(function () {
    'use strict';

    angular
        .module('DonationsApp').component('donationDetails', { 
            controller: 'DonationDetailsController', 
            templateUrl: '/js/donationDetails/donationDetails.page.html',
            controllerAs: 'ddc'
        })
        .controller('DonationDetailsController', DonatioDetailsController);

    DonatioDetailsController.$inject = ['$cookies', '$stateParams', '$uibModalStack'];
    function DonatioDetailsController($cookies, $stateParams, $uibModalStack) {
        var ddc = this;

        ddc.$onInit = onInit;

        function onInit() {
            ddc.donorToken = $cookies.get('donorToken');

            ddc.close = close;

            ddc.TransactionNumber = $stateParams.TransactionNumber;
            ddc.donationId = $stateParams.donationId;
            ddc.DateCreated = $stateParams.DateCreated;
            ddc.PledgeStatusType = $stateParams.PledgeStatusType;
            ddc.PaymentType = $stateParams.PaymentType;
            ddc.PaymentAmount = $stateParams.PaymentAmount;
            ddc.TotalValue = $stateParams.TotalValue;
            ddc.AgencyName = $stateParams.AgencyName;
    
            ddc.title = "Donation Details";
        }

        function close() {
            $uibModalStack.dismissAll(false);
        }
    }

})();
