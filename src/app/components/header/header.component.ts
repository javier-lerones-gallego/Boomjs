declare function require(module: string): any;

import { ICustomStateService } from '../../icustomstateservice';

class HeaderController {
    private game: any;

    constructor(private $state: ICustomStateService, private $mdSidenav) {}

    get title() { return this.$state.current.data.title; }

    get showGameStats() {
        if (this.game === undefined) {
            return false;
        }
        return !this.game.isFinished && !this.game.isOver;
    }

    get showGameTimer() {
        if (this.game === undefined) {
            return false;
        }
        return !this.game.isOver;
    }

    get showButtons() {
        if (this.game === undefined) {
            return false;
        }
        return this.game.isFinished || this.game.isOver;
    }

    menu() {
        this.$mdSidenav('left').toggle();
    }
}
HeaderController.$inject = ['$state', '$mdSidenav'];

export const HeaderComponent = {
    name: 'boomjsHeader',
    bindings: {
        game: '<',
    },
    controller: HeaderController,
    template: require('./header.html'),
};
