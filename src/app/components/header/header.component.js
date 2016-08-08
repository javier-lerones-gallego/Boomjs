import template from './header.html';

/* ngInject */
class HeaderController {
    constructor(GameService, $state, $element) {
        this.GameService = GameService;
        this.$state = $state;
        this.$element = $element;

        this._game = this.GameService.active;
    }

    get game() { return this._game; }
    get board() { return this._game.board; }

    home() {
        this.$state.go('root.home');
    }

}

export const HeaderComponent = {
    name: 'sweeperHeader',
    bindings: {
        fixed: '<',
    },
    controller: HeaderController,
    template,
};
