import template from './game.html';

/* ngInject */
class GameController {
    constructor(GameService) {
        this.GameService = GameService;
    }

    get game() { return this.GameService.current; }
    get board() { return this.game.board; }
}

export const GameComponent = {
    name: 'game',
    controller: GameController,
    template,
};
