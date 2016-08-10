import template from './header.html';

class HeaderController {
    constructor($state) {
        this.$state = $state;
    }

    get board() { return this.game.board; }

    home() {
        this.$state.go('root.home');
    }
}
HeaderController.$inject = ['$state'];

export const HeaderComponent = {
    name: 'sweeperHeader',
    bindings: {
        fixed: '<',
        game: '<',
    },
    controller: HeaderController,
    template,
};
