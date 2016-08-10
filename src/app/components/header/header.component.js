import template from './header.html';

class HeaderController {
    constructor(GameService, $state, $element) {
        this.GameService = GameService;
        this.$state = $state;
        this.$element = $element;
    }

    get game() { return this.GameService.current; }
    get board() { return this.game.board; }

    home() {
        this.$state.go('root.home');
    }
}
HeaderController.$inject = ['GameService', '$state', '$element'];

export const HeaderComponent = {
    name: 'sweeperHeader',
    bindings: {
        fixed: '<',
    },
    controller: HeaderController,
    template,
};
