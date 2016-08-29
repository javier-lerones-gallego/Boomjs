import template from './header.html';

class HeaderController {
    constructor($mdSidenav) {
        this.$mdSidenav = $mdSidenav;
    }

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

    signout() {
        this.$firebaseAuth().$signOut();
        this.$state.go('signin');
    }
}
HeaderController.$inject = ['$mdSidenav'];

export const HeaderComponent = {
    name: 'boomjsHeader',
    bindings: {
        game: '<',
    },
    controller: HeaderController,
    template,
};
