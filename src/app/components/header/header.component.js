import template from './header.html';

class HeaderController {
    constructor($state, $mdSidenav) {
        this.$state = $state;
        this.$mdSidenav = $mdSidenav;
    }

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

    signout() {
        this.$firebaseAuth().$signOut();
        this.$state.go('signin');
    }
}
HeaderController.$inject = ['$state', '$mdSidenav'];

export const HeaderComponent = {
    name: 'boomjsHeader',
    bindings: {
        game: '<',
    },
    controller: HeaderController,
    template,
};
