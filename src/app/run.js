

export default function Run($state, $transitions, GameService, LogService) {
    $transitions.onError({ to: 'root.*' }, transition => {
        if (transition.promise.$$state.value === 'AUTH_REQUIRED') {
            LogService.error('Unauthenticated, redirecting to Signin page.');
            $state.go('signin');
        }
    });

    // If game is started and we go anywhere, pause the game.
    $transitions.onStart({ from: 'root.game' }, () => {
        const game = GameService.query($state.params.id);
        if (game.isStarted) {
            game.pause();
            LogService.debug('game paused.');
        }
    });

    // Log state changes on dev mode only
    // BUG: For some reason only the first one is triggered, probably the * in the from.
    $transitions.onSuccess({ from: '*' }, transition => {
        const toLastIndex = transition.treeChanges().to.length - 1;
        const toName = transition.treeChanges().to[toLastIndex].state.name;
        LogService.debug(`transition to '${toName}'.`, 'extra 1', 'extra 2');
    });
}
Run.$inject = ['$state', '$transitions', 'GameService', 'LogService'];
