import template from './game-state.html';
import moment from 'moment';

class GameStateController {
    constructor($state, $interval, GameService) {
        this.$state = $state;
        this.$interval = $interval;
        this.GameService = GameService;

        this._timer = null;
        this._value = null;
    }

    $onInit() {
        // Start a timer to refresh the value
        this._timer = this.$interval(() => {
            if (this.game) {
                if (this.game.isStarted) {
                    this._value = moment(moment().diff(this.game.started)).format('mm:ss');
                } else if (this.game.isOver || this.game.isFinished) {
                    this._value = this.game.ellapsed;
                } else if (this.game.isReady) {
                    this._value = null;
                }
            }
        }, 250);
    }

    $onDestroy() {
        if (this._timer) {
            this.$interval.cancel(this._timer);
        }
    }

    get value() { return this._value ? this._value : 'Click on a Tile to Start'; }

    home() {
        this.$state.go('root.home');
    }

    newGame() {
        if (this.game.isEasy) {
            this.goToGame(this.GameService.easy());
        } else if (this.game.isMedium) {
            this.goToGame(this.GameService.medium());
        } else {
            this.goToGame(this.GameService.expert());
        }
    }

    goToGame(game) {
        this.$state.go('root.game', { id: game.id });
    }
}
GameStateController.$inject = ['$state', '$interval', 'GameService'];

export const GameStateComponent = {
    name: 'gameState',
    bindings: {
        game: '<',
    },
    controller: GameStateController,
    template,
};
