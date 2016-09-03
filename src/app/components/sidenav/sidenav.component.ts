declare function require(module: string): any;

import { ICustomStateService } from '../../icustomstateservice';

class SidenavController {
    constructor(private $state: ICustomStateService,
        private GameService,
        private $mdSidenav) {
    }

    home() {
        this.$mdSidenav('left').close();
        this.$state.go('root.home');
    }

    menu() {
        this.$mdSidenav('left').close();
    }

    me() {
        this.$mdSidenav('left').close();
        this.$state.go('root.me');
    }

    easy() {
        this.goToGame(this.GameService.easy());
    }

    medium() {
        this.goToGame(this.GameService.medium());
    }

    expert() {
        this.goToGame(this.GameService.expert());
    }

    goToGame(game) {
        this.$mdSidenav('left').close();
        this.$state.go('root.game', { id: game.id });
    }
}
SidenavController.$inject = ['$state', 'GameService', '$mdSidenav'];

export const SidenavComponent = {
    name: 'boomjsSidenav',
    controller: SidenavController,
    template: require('./sidenav.html'),
};
