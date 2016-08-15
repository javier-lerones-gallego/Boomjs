import template from './new-game.html';

class NewGameController {
    constructor(GameService, $state) {
        this.GameService = GameService;
        this.$state = $state;
    }

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
NewGameController.$inject = ['GameService', '$state'];

export const NewGameComponent = {
    name: 'newGame',
    controller: NewGameController,
    template,
};
