import template from './game.html';

class GameController {
    get game() { return this.parent.game; }
}

export const GameComponent = {
    name: 'boomjsGame',
    controller: GameController,
    require: {
        parent: '^boomjsApp',
    },
    template,
};
