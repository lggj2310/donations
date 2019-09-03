(function () {
    "use strict";

    angular
    .module("DonationsApp")
    .factory("DonationModel", DonationModel);


    function DonationModel() {

        var model = function () {
            this.donation = {
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
                Payment: {
                    BillingAddress1: "",
                    BillingAddress2: "",
                    BillingCity: "",
                    BillingState: "",
                    BillingZipCode: "",
                    BillingZipCodeExt: "",
                    BillingCountryCode: ""
                },
                AddOnList: [],
                AddOnTotalList: [],
                DesignationAmountType: 1,
                DesignationWriteInList: [],
                NegativeDesignation: "",
                DesignationList: [{
                    CFCAgencyId: "",
                    DesignateableEntityType: "",
                    DesignationId: "",
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
                CustomField1 : "",
                CustomField2 : "",
                CustomField3 : "",
                CustomField4 : "",
                CustomField5 : "",
                CustomField6 : ""
              };

            this.getEditDonation = getEditDonation;
            this.setEditDonation = setEditDonation;
        }
        return model;


        function getEditDonation() {
            return model.donation;
        }

        function setEditDonation(data) {
            model.donation = data;
        }
    }
})();
