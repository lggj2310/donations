(function () {
    'use strict';

    angular
        .module('DonationsApp')
        .controller('DonationController', DonationController);

    DonationController.$inject = ['$location', '$cookies', 'AuthenticationService', 'DonorService'];
    function DonationController($location, $cookies, AuthenticationService, DonorService) {
        var dc = this;
        var paymentType = 2;

        dc.donation = DonorService.donation;

        dc.donation.status = 'pending';

        dc.authKey = $cookies.get('apiToken');
        dc.donorKey = $cookies.get('donorToken');
        if (dc.authKey == '' || dc.authKey == undefined) {
            dc.authKey = AuthenticationService.GetAppAuthToken();
        }

        if (dc.donorKey == '' || dc.donorKey == undefined) {
        	$location.path('/');
        }

        //Today Date
        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = today.getFullYear();

        today = mm + '/' + dd + '/' + yyyy;

		dc.currentDate = today;
		dc.currentYear = yyyy;


		//// Payment Section ////
		
		// Default Data //
		dc.frecuencyOptionLabels = ['One-time', 'Monthly', 'Quaternaly', 'Semi-annual'];
		dc.customAmountField = false;

		// API Data //
        DonorService.GetPaymentTypeConfiguration(dc.donorKey, paymentType, function (response) {
          if (response) {
              dc.paymentInfo = response;
          } 
		});

		// Functions //
		dc.customValue = customValue;

		function customValue(isCustom) {
			dc.customAmount = isCustom;
		}
		
		//// Credit Card Section ////

		//Credit Card Default Data
		dc.creditCardTypes = ['Visa', 'Master Card', 'American Express', 'Discover', 'Diners Club'];
		dc.cardMask = '9999 9999 9999 9999';
		dc.cardPattern = '';
		dc.verficiationNumberLength = 3;

		// Functions //
		dc.cardTypeValidation = cardTypeValidation;
		dc.getCardPattern = getCardPattern;

		function cardTypeValidation() {
			dc.cardMask = getCardMask();
		}

		function getCardMask(){
			var masks = {
				'Master Card': '9999 9999 9999 9999',
				'Visa': '9999 9999 9999 9999',
				'American Express': '9999 999999 99999',
				'Diners Club': '9999 9999 9999 99',
				'Discover': '9999 9999 9999 9999',
				'unknown': '9999 9999 9999 9999'
			};

			var cardType = dc.creditCardTypes[dc.donation.CustomField1];

			return masks[cardType];
		}

		function getCardPattern() {
			var pattern = {
				'Master Card': '^(5[1-5][0-9]{14}|2(22[1-9][0-9]{12}|2[3-9][0-9]{13}|[3-6][0-9]{14}|7[0-1][0-9]{13}|720[0-9]{12}))$',
				'Visa': '^4[0-9]{12}(?:[0-9]{3})?$',
				'American Express': '^3[47][0-9]{13}$',
				'Diners Club': '^3(?:0[0-5]|[68][0-9])[0-9]{11}$',
				'Discover': '^65[4-9][0-9]{13}|64[4-9][0-9]{13}|6011[0-9]{12}|(622(?:12[6-9]|1[3-9][0-9]|[2-8][0-9][0-9]|9[01][0-9]|92[0-5])[0-9]{10})$',
				'unknown': ''
			};

			var cardPatt = dc.creditCardTypes[dc.donation.CustomField1 -1];

			if (cardPatt == 'American Express') {
				dc.verficiationNumberLength = 4;
			} else {
				dc.verficiationNumberLength = 3;
			}
			return pattern[cardPatt];
		}


		//// Billing Information Section ////

		// API Data //
        DonorService.GetCountriesConfiguration(dc.donorKey, function (response) {
          if (response) {
              dc.countriesInfo = response;
          } 
        });

        DonorService.GetStatesConfiguration(dc.donorKey, function (response) {
          if (response) {
              dc.statesInfo = response;
          } 
		});
		
		


		//// Agency Section ////

		// Default Data //
		dc.selectedAgency = {};
		dc.agencyChange = agencyChange;
	
		// API Data //
        DonorService.GetAgencyConfiguration(dc.donorKey, function (response) {
          if (response) {
              dc.agencyInfo = response;
          } 
		});
		
		// Functions //
		function agencyChange(agency) {
			dc.donation.DesignationList[0].CFCAgencyId = agency.CFCAgencyId;
			dc.donation.DesignationList[0].DesignateableEntityType = agency.DesignationEntityType;
			dc.donation.DesignationList[0].DisplayName = agency.Name;
			dc.donation.DesignationList[0].EntityId = agency.EntityId;
			dc.donation.DesignationList[0].EntityIdentifier = agency.EntityIdentifier;
			dc.donation.DesignationList[0].MinimumDonation = agency.MinimumDonation;
			dc.donation.DesignationList[0].MinimumTotalDonationForDesignation = agency.MinimumTotalDonationForDesignation;
			dc.donation.DesignationList[0].Name = agency.Name;
			dc.donation.DesignationList[0].OrganizationNumber = agency.ProfileOrganizationNumber;
			dc.donation.DesignationList[0].DesignationAmount = dc.donation.PaymentAmount;
			dc.donation.DesignationList[0].StandardAccountCode = agency.StandardAccountCode;
		}


		//// Review Section ////
		dc.sendDonation = sendDonation;
		dc.donation.TotalValue = dc.donation.PaymentTotalValue;

		dc.isSuccess = true;
		dc.donationResponse = {};
		// Functions //
		function sendDonation() {
			DonorService.SendDonation(dc.donorKey, function name(response) {
				if (response.data.ValidationErrors == null) {
					dc.isSuccess = true;
				} else {
					dc.isSuccess = false;
				}

				dc.donationResponse = response.data;
			});
		}

		//// Verification Section ////

		//// Wizard Section ////
		
		// Default Data //
		dc.oneAtATime = true;
        dc.currentStep = 1;
        dc.steps = [
          {
            step: 1,
            name: "Select Payment",
            template: "js/donation/payment.html",
            forms: ['dc.paymentForm', 'dc.cardInformationForm', 'dc.billingForm']
          },
          {
            step: 2,
            name: "Select Charity",
            template: "js/donation/agency.html",
            forms: ['dc.agencyForm']
          },   
          {
            step: 3,
            name: "Confirm",
            template: "js/donation/details.html",
            forms: []
          },
          {
            step: 4,
            name: "Thank you",
            template: "js/donation/verification.html",
            forms: []
          }             
        ];
        
        // Functions //
		dc.goToStep = goToStep;
		dc.pendingForm = false;
        
        function goToStep(newStep) {
          	if (newStep == 3) {
				var selectedFrecuency = dc.donation.FrequencyType;

				if (dc.donation.PaymentType == 5) {
					dc.paymentTypeLabel = 'Credit Card';
				}
				if (selectedFrecuency == 1) {
					dc.donation.PaymentTotalValue = dc.donation.PaymentAmount;  
				} else if (selectedFrecuency == 2) {
					dc.donation.PaymentTotalValue = (dc.donation.PaymentAmount * 12);
				} else if (selectedFrecuency == 3) {
					dc.donation.PaymentTotalValue = (dc.donation.PaymentAmount * 4);
				} else if (selectedFrecuency == 4) {
					dc.donation.PaymentTotalValue = (dc.donation.PaymentAmount * 2);
				}
			} else if (newStep == 4) {
				dc.sendDonation();
			}

			var isValid = true;
          	if (dc.currentStep == 1) {
				if (!dc.paymentForm.$valid || !dc.cardInformationForm.$valid || !dc.billingForm.$valid) {
					isValid = false;
					dc.pendingForm = true;
			  	}
			} else if (dc.currentStep == 2) {
				if (!dc.agencyForm.$valid) {
					isValid = false;
					dc.pendingForm = true;
				}	
			}
          
			if (isValid) {

				dc.currentStep = newStep;  
			} else {
				return;
			}
          
        }
        
        dc.getStepTemplate = function(){
          for (var i = 0; i < dc.steps.length; i++) {
                if (dc.currentStep == dc.steps[i].step) {
                    return dc.steps[i].template;
                }
            }
        }

        

        function cardNumberValidation() {

        }
    }

})();
