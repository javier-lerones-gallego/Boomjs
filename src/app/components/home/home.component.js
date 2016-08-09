import template from './home.html';

/* ngInject */
class HomeController {
    constructor(GameService, $state) {
        this.GameService = GameService;
        this.$state = $state;
    }

    get games() { return this.GameService.games; }
    get paused() { return this.GameService.paused; }
    get count() { return Object.keys(this.GameService.games).length; }


    newGame(difficulty) {
        this.GameService.create(difficulty)
            .then((game) => {
                // redirect to the game
                this.$state.go('root.game', { id: game.id });
            });
    }
}

export const HomeComponent = {
    name: 'home',
    controller: HomeController,
    template,
};
