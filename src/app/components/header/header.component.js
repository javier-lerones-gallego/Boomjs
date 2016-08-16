import template from './header.html';

class HeaderController {
    constructor($state) {
        this.$state = $state;
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
        return this.game.isStarted || this.game.isFinished || this.game.isPaused;
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
}
HeaderController.$inject = ['$state'];

export const HeaderComponent = {
    name: 'boomjsHeader',
    bindings: {
        game: '<',
    },
    controller: HeaderController,
    template,
};
