(function () {
    'use strict';

    angular
        .module('DonationsApp')
        .controller('DonationsController', DonationsController);

    DonationsController.$inject = ['$location', '$cookies', 'DonorService', '$uibModal'];
    function DonationsController($location, $cookies, DonorService, $uibModal) {
        var dsc = this;

        var donorToken = $cookies.get('donorToken');

        dsc.makeDonation = makeDonation;
        // dsc.DonationDetails = DonationDetails;
        dsc.GetDonations = GetDonations();
        dsc.GetDonation = GetDonation;

        if (donorToken == '' || donorToken == undefined) {
            $location.path('/');
        }

        dsc.title = "Donations";
        // (function initController() {
        //     // reset login status
        //     // AuthenticationService.ClearCredentials();
        // })();

        function makeDonation() {
            $location.path('/donation');
        }

        function GetDonations() {
            DonorService.GetDonations(donorToken, function(response) {
                dsc.donations = response.PledgeList;

                dsc.donations.forEach(element => {
                    if (element.PaymentType = 5) {
                        element.PaymentType = 'Cash';
                    }

                    if (element.PledgeStatusType == 3) {
                        element.PledgeStatusType = 'Submitted'
                    }
                });
            });
        }

        function GetDonation(id) {
            dsc.donation = dsc.donations.filter(donation => donation.Id === id);
        }
    }

})();
