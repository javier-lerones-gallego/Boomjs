
/* ngInject */
export default function Run($rootScope, $state) {
    $rootScope.$on('$stateChangeError', (evt, to, toParams, from, fromParams, error) => {
        if (error && error.error === 'game_not_found') {
            $state.go('root.home');
        }
    });
}
