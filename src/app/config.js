
export default function Config($locationProvider,
    $stateProvider,
    $urlRouterProvider,
    $mdThemingProvider) {
    // Enable HTML5 mode
    $locationProvider.html5Mode(true);

    // For any unmatched url, redirect to /
    $urlRouterProvider.otherwise('/');

    // Create a custom palette that extends the blue
    const customBluePalette = $mdThemingProvider.extendPalette('blue', {
        400: '2D72D9',
        contrastDefaultColor: 'light',
    });
    // An another one for the custom background color
    const customGreyPalette = $mdThemingProvider.extendPalette('grey', {
        400: 'ECEEF1',
    });

    // Register the new color palette map with the name <code>neonRed</code>
    $mdThemingProvider.definePalette('customBlue', customBluePalette);
    $mdThemingProvider.definePalette('customGrey', customGreyPalette);

    // Configure angular material theme
    $mdThemingProvider.theme('default')
        .primaryPalette('customBlue', {
            'hue-2': '400',
        })
        .accentPalette('red');

    $mdThemingProvider.theme('background')
        .backgroundPalette('customGrey', {
            default: '400',
        });

    // Set the default theme as default, the background is only used by the main container
    $mdThemingProvider.setDefaultTheme('default');

    // Define the app states
    $stateProvider
        .state('signin', {
            url: '^/signin',
            template: '<boomjs-signin />',
        })
        .state('root', {
            abstract: true,
            template: '<boomjs-app layout="column" flex />',
        })
        .state('root.home', {
            url: '/',
            template: `<boomjs-home layout-xs="column"
                layout-sm="column" layout-md="row" layout-lg="row"
                flex layout-align="start start" layout-fill />`,
        })
        .state('root.game', {
            url: '/games/:id',
            template: '<boomjs-game layout-align="center center" layout-fill flex  />',
        });
}
Config.$inject = ['$locationProvider',
    '$stateProvider',
    '$urlRouterProvider',
    '$mdThemingProvider'];
