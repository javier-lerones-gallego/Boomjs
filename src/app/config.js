
export default function Config($locationProvider,
    $stateProvider,
    $urlRouterProvider) {
    // Enable HTML5 mode
    $locationProvider.html5Mode(true);

    // For any unmatched url, redirect to /
    $urlRouterProvider.otherwise('/');

    // Define the app states
    $stateProvider
        .state('signin', {
            url: '^/signin',
            template: '<boomjs-signin />',
        })
        .state('root', {
            abstract: true,
            template: '<boomjs-app />',
            resolve: {
                // controller will not be loaded until $waitForSignIn resolves
                // Auth refers to our $firebaseAuth wrapper in the factory below
                // $waitForSignIn returns a promise so the resolve waits for it to complete
                currentAuth: ['$firebaseAuth', ($firebaseAuth) => $firebaseAuth().$requireSignIn()],
            },
        })
        .state('root.home', {
            url: '^/',
            template: '<boomjs-home />',

        })
        .state('root.game', {
            url: '^/games/:id',
            template: '<boomjs-game />',
        });
}
Config.$inject = ['$locationProvider', '$stateProvider', '$urlRouterProvider'];
