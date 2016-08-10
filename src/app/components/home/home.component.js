import template from './home.html';

class HomeController {
    constructor(GameService, $state) {
        this.GameService = GameService;
        this.$state = $state;
    }

    get games() { return this.GameService.games; }

    get active() { return this.GameService.active; }
    get done() { return this.GameService.done; }

    newGame(difficulty) {
        this.GameService.create(difficulty)
            .then((game) => {
                // redirect to the game
                this.$state.go('root.game', { id: game.id });
            });
    }
}
HomeController.$inject = ['GameService', '$state'];

export const HomeComponent = {
    name: 'home',
    controller: HomeController,
    template,
};
