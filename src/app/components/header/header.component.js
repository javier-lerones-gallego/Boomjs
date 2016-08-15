import template from './header.html';

class HeaderController {
    constructor($state, GameService) {
        this.$state = $state;
        this.GameService = GameService;
    }

    get showGameStats() {
        return this.game !== undefined && !this.game.isFinished && !this.game.isOver;
    }

    home() {
        this.$state.go('root.home');
    }

    newGame() {
        if (this.game.isEasy) {
            this.goToGame(this.GameService.easy());
        } else if (this.game.isMedium) {
            this.goToGame(this.GameService.medium());
        } else {
            this.goToGame(this.GameService.expert());
        }
    }

    goToGame(game) {
        this.$state.go('root.game', { id: game.id });
    }
}
HeaderController.$inject = ['$state', 'GameService'];

export const HeaderComponent = {
    name: 'boomjsHeader',
    bindings: {
        game: '<',
    },
    controller: HeaderController,
    template,
};
