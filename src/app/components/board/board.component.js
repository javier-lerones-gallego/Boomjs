import template from './board.html';

/* ngInject */
class BoardController {
    constructor($element) {
        this.$element = $element;
    }

    get board() { return this.game.board; }
    get tiles() { return this.game.board.tiles; }
}

export const BoardComponent = {
    bindings: {
        game: '<',
    },
    name: 'board',
    controller: BoardController,
    template,
};