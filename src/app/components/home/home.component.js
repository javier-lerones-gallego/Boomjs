import template from './home.html';

class HomeController {
    constructor(GameService, $state) {
        this.GameService = GameService;
        this.$state = $state;
    }

    get games() { return this.GameService.games; }
    get done() { return this.GameService.done; }

    easy() {
        this.goToGame(this.GameService.easy());
    }

    medium() {
        this.goToGame(this.GameService.medium());
    }

    expert() {
        this.goToGame(this.GameService.expert());
    }

    goToGame(game) {
        this.$state.go('root.game', { id: game.id });
    }
}
HomeController.$inject = ['GameService', '$state'];

export const HomeComponent = {
    name: 'boomjsHome',
    controller: HomeController,
    template,
};
