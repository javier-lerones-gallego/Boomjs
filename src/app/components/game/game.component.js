import template from './game.html';

class GameController {
    constructor(GameService) {
        this.GameService = GameService;
    }

    get game() { return this.GameService.current; }
    get board() { return this.game.board; }
}
GameController.$inject = ['GameService'];

export const GameComponent = {
    name: 'game',
    controller: GameController,
    template,
};
