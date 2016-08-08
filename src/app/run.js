
/* ngInject */
export default function Run($rootScope, $state) {
    $rootScope.$on('$stateChangeError', (evt, to, toParams, from, fromParams, error) => {
        if (error && error.error === 'game_not_found') {
            $state.go('root.home');
        }
    });

    // Initially redirect to the home to avoid errors on game states
    $state.go('root.home');
}
