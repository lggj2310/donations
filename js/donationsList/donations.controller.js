(function () {
    'use strict';

    angular
        .module('DonationsApp')
        .controller('DonationsController', DonationsController);

    DonationsController.$inject = ['$scope', '$state', '$cookies', 'DonorService', 'blockUI'];
    function DonationsController($scope, $state, $cookies, DonorService, blockUI) {
        var dsc = this;

        dsc.$onInit = onInit;

        function onInit() {
            dsc.donorToken = $cookies.get('donorToken');

            if (dsc.donorToken == '' || dsc.donorToken == undefined) {
                $state.go('login');
            }

            dsc.donationsBlockUI = blockUI.instances.get('donationsBlock');

            dsc.makeDonation = makeDonation;
            // dsc.DonationDetails = DonationDetails;
            dsc.GetDonations = GetDonations;
            dsc.GetDonation = GetDonation;
            
            $scope.status = {
                isopen: false
            };
    
            $scope.toggleDropdown = function($event) {
                $event.preventDefault();
                $event.stopPropagation();
                $scope.status.isopen = !$scope.status.isopen;
            };
    
            dsc.title = "Donations";

            GetDonations();
        }

        function makeDonation() {
            $state.go('donation');
        }

        function GetDonations() {

            blockUI.start();

            DonorService.GetDonations(dsc.donorToken, function(response) {
                dsc.donations = response.PledgeList;

                dsc.donations.forEach(element => {
                    if (element.PaymentType = 5) {
                        element.PaymentType = 'Cash';
                    }

                    if (element.PledgeStatusType == 3) {
                        element.PledgeStatusType = 'Submitted'
                    }
                });

                blockUI.stop();
            });
        }

        function GetDonation(e, id) {
            e.preventDefault();
            dsc.donation = dsc.donations.filter(donation => donation.Id === id);

            $state.go('donations.details', {
                donationId: id,
                TransactionNumber: dsc.donation[0].TransactionNumber,
                DateCreated: dsc.donation[0].DateCreated,
                PledgeStatusType: dsc.donation[0].PledgeStatusType,
                PaymentType: dsc.donation[0].PaymentType,
                PaymentAmount: dsc.donation[0].PaymentAmount,
                TotalValue: dsc.donation[0].TotalValue,
                AgencyName: dsc.donation[0].DesignationList[0].Name
                
            });
            /*
            , {
                donationId: id,
                DateCreated: dsc.donation[0].DateCreated,
                PledgeStatusType: dsc.donation[0].PledgeStatusType,
                PaymentType: dsc.donation[0].PaymentType,
                PaymentAmount: dsc.donation[0].PaymentAmount,
                TotalValue: dsc.donation[0].TotalValue,
                AgencyName: dsc.donation[0].DesignationList[0].Name
                
            }
            */
        }
    }

})();
