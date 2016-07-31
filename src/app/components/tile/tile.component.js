import template from './tile.html';

/* ngInject */
class TileController {
    constructor(GameService) {
        this.GameService = GameService;
    }

}

export const TileComponent = {
    name: 'tile',
    controller: TileController,
    template,
};
