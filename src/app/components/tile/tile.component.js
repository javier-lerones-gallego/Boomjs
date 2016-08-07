import template from './tile.html';

/* ngInject */
class TileController {
    constructor(GameService) {
        this.GameService = GameService;
    }

    get css() {
        if (this.game.debug) {
            if (this.tile.highlight) {
                return 'btn-debug btn-default';
            }
            return this.tile.isMine ? 'btn-debug btn-danger' : 'btn-debug btn-primary';
        }
        return 'btn-primary';
    }

    highlightNeighbours() {
        this.board.highlightNeighbours(this.tile);
    }
}

export const TileComponent = {
    name: 'tile',
    bindings: {
        board: '<',
        tile: '<',
        game: '<',
    },
    controller: TileController,
    template,
};
