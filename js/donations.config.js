angular.module('DonationsApp').config(config);

function config($stateProvider,$urlRouterProvider) {

    $urlRouterProvider.otherwise("/login");

    $stateProvider
        .state('home', {
            url: "/home",
            templateUrl: "/index.html"
        })

        .state('login', {
            url: "/login",
            templateUrl: "/js/login/login.page.html",
            controller: "LoginController"
        })

        .state('donations', {
            url: "/donations",
            templateUrl: "/js/donations/donations.page.html",
            controller: "DonationsController"
        })
          
        .state('donation', {
            url: "/donation",
            templateUrl: "/js/donation/donation.page.html",
            controller: "DonationController"
        });
  
}