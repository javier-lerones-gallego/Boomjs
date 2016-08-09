
/* ngInject */
export default function Config($locationProvider, $stateProvider, $urlRouterProvider) {
    // Enable HTML5 mode
    $locationProvider.html5Mode(true);

    // For any unmatched url, redirect to /
    $urlRouterProvider.otherwise('/');

    // Define the app states
    $stateProvider
        .state('root', {
            abstract: true,
            template: '<app></app>',
        })
        .state('root.home', {
            url: '/',
            template: '<home></home>',
        })
        .state('root.game', {
            url: '/games/:id',
            template: '<game></game>',
        });
}
