import template from './board.html';

/* ngInject */
class BoardController {
    constructor($element) {
        this.$element = $element;
        this._tiles = [];
    }

    $onInit() {
        // Create the tile collection
        for (let i = 0, l = this.game.width * this.game.height; i < l; i++) {
            this._tiles.push(i);
        }
    }

    get tiles() { return this._tiles; }
}

export const BoardComponent = {
    bindings: {
        game: '<',
    },
    name: 'board',
    controller: BoardController,
    template,
};
