// Initialize Firebase
var config = {
    apiKey: "AIzaSyDSoWyhbjvYvDgXU4O3zFkU7F0ydTSC7Ng",
    authDomain: "rebeldottie-landing.firebaseapp.com",
    databaseURL: "https://rebeldottie-landing.firebaseio.com",
    storageBucket: "rebeldottie-landing.appspot.com",
    messagingSenderId: "978799287920"
};
firebase.initializeApp(config);

console.log('provisioning dataLayer object for GTM interaction..');
var dataLayer = window.dataLayer = window.dataLayer || [];

console.log('initializing angular app..');
var app = angular.module('rebeldottie', ['ngMaterial', 'ngRoute']);

console.log('initializing coreControls..');
app.controller('coreControls', ['$scope', '$rootScope', '$location', '$route', '$mdSidenav',
    function($scope, $rootScope, $location, $route, $mdSidenav) {
        console.log('coreControls init');

        /*
            Routing and view stuff
            viewTitle must be set in the view
            otherwise it seems to kick back an error
            not sure how to setup a test because
            even checking the undefined viewTitle
            causes a critical stop
        */
        
        $rootScope.$on('$routeChangeSuccess', function(event, current, previous) {
            $scope.currentNavItem = $('.md-nav-item[md-nav-href|="' + window.location.pathname + '"]').attr('name');
            console.log($('.md-nav-item[md-nav-href|="' + window.location.pathname + '"]').attr('name'));
            $scope.title = $scope.currentNavItem;
            dataLayer.push({
                event: 'ngRouteChange',
                attributes: {
                    route: $location.path()
                }
            });
        });

        /*
            Code to toggle sideNav
            Also triggers a GTM dataLayer event to track views
        */
        $scope.toggleSideNav = function() {
            $mdSidenav('sideNav').toggle();
            dataLayer.push({
                event: 'sideNavToggled',
                attributes: {
                    open: $mdSidenav('sideNav').isOpen()
                }
            });
        };
    }
]);

/**
 * 
 * Here you should be able to define any view template
 * Note: it must contain a viewTitle
 *       no idea yet how to make it stop kicking errors
 *       whenever I test if viewTitle is set already
 * 
 **/
app.config(function($routeProvider, $locationProvider, $mdThemingProvider) {
    $mdThemingProvider.enableBrowserColor();
    $routeProvider
        .when('/about', {
            templateUrl: 'views/about.html',
            viewTitle: 'About'
        })
        .when('/contact', {
            templateUrl: 'views/contact.html',
            viewTitle: 'Contact'
        })
        .when('/', {
            templateUrl: 'views/home.html',
            viewTitle: 'Home'
        })
        .otherwise({
            redirectTo: '/'
        });

    // use the HTML5 History API
    $locationProvider.html5Mode(true);
});