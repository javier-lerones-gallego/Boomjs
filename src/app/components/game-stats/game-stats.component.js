import template from './game-stats.html';

class GameStatsController {
    constructor(GameService, $state) {
        this.GameService = GameService;
        this.$state = $state;
    }

    get active() { return this.games.filter(g => g.isReady || g.isStarted); }
    get done() { return this.games.filter(g => g.isFinished || g.isOver); }
}
GameStatsController.$inject = ['GameService', '$state'];

export const GameStatsComponent = {
    name: 'gameStats',
    bindings: {
        games: '<',
    },
    controller: GameStatsController,
    template,
};
