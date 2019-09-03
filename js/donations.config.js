angular.module('DonationsApp').config(config);

angular.module('DonationsApp').constant('apiUrl', 'http://192.168.7.51:3000/api');
angular.module('DonationsApp').constant('apiKey', 'RTJ4+E4067P+mqIEizOkGu7nHAxRBfZzkE+/+r1/SbQ=');

function config($stateProvider,$urlRouterProvider, growlProvider) {

    $urlRouterProvider.otherwise("/login");

    $stateProvider
        .state('home', {
            url: "/home",
            templateUrl: "/index.html"
        })

        .state('login', {
            url: "/login",
            templateUrl: "/js/login/login.page.html",
            controller: "LoginController",
            controllerAs: 'lc'
        })

        .state('donations', {
            url: "/donations",
            templateUrl: "/js/donations/donations.page.html",
            controller: "DonationsController",
            controllerAs: 'dsc'
        })
          
        .state('donation', {
            url: "/donation",
            templateUrl: "/js/donation/donation.page.html",
            controller: "DonationController",
            controllerAs: 'dc'
        });
    growlProvider.globalTimeToLive(3000);
    //growlProvider.globalDisableCountDown(true);

    
    function registerStatefulModal(url, stateName, component, params, size, resolves) {
        params = params || {};
        resolves = resolves || angular.extend({},
            resolves,
            {
                stateParams: ['$stateParams', function ($stateParams) {
                    return $stateParams;
                }]
            });
        size = size;        
        var modal;
        $stateProvider.state(stateName, {
            url: url,
            modal: true,
            params: params,
            onEnter: [ '$stateParams', '$uibModal', function ($stateParams, $uibModal) {

                modal = $uibModal.open({
                    animation: true,
                    backdrop: true,
                    keyboard: true,
                    size: size,
                    component: component,
                    resolve: resolves
                });
                modal.result.catch(function (reason) {
                    if (reason) {
                        
                    }
                });
                modal.result.then(function (result) {
                    
                });
                modal.result.finally(function () {
                    modal.dismiss();
                });
            }],
            onExit: function () {
                if (modal) {
                    modal.close();
                }
            }
        });
    };

    registerStatefulModal(
        '/details',
        'donations.details',
        'donationDetails',
        {
            donationId: '',
            TransactionNumber: '',
            DateCreated: '',
            PledgeStatusType: '',
            PaymentType: '',
            PaymentAmount: '',
            TotalValue: '',
            AgencyName: ''
        },
        'lg'
    );

    // registerStatefulModal(
    //     'donation-details',
    //     'donationDetails', 
    //     'DonationDetailsController', 
    //     '/js/donationsDetails/donationDetails.page.html', 
    //     null,
    //     {
    //         donationId: '',
    //         DateCreated: '',
    //         PledgeStatusType: '',
    //         PaymentType: '',
    //         PaymentAmount: '',
    //         TotalValue: '',
    //         agencyName: ''
    //     }
    // );

}