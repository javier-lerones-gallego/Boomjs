import template from './header.html';

class HeaderController {
    constructor($state, $firebaseAuth) {
        this.$state = $state;
        this.$firebaseAuth = $firebaseAuth;
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

    home() {
        this.$state.go('root.home');
    }

    signout() {
        this.$firebaseAuth().$signOut();
        this.$state.go('signin');
    }
}
HeaderController.$inject = ['$state', '$firebaseAuth'];

export const HeaderComponent = {
    name: 'boomjsHeader',
    bindings: {
        game: '<',
    },
    controller: HeaderController,
    template,
};
