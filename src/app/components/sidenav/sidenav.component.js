import template from './sidenav.html';

class SidenavController {
    constructor($state, GameService, $mdSidenav) {
        this.$state = $state;
        this.GameService = GameService;
        this.$mdSidenav = $mdSidenav;
    }

    home() {
        this.$mdSidenav('left').close();
        this.$state.go('root.home');
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
    bindings: {
        game: '<',
    },
    controller: SidenavController,
    template,
};
