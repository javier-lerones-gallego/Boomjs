import template from './game.html';

class GameController {
    constructor(GameService, $state) {
        this.GameService = GameService;
        this.$state = $state;
    }

    get game() { return this.GameService.query(this.$state.params.id); }
}
GameController.$inject = ['GameService', '$state'];

export const GameComponent = {
    name: 'game',
    controller: GameController,
    template,
};
