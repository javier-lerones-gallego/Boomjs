import template from './game-state.html';
import moment from 'moment';

/* ngInject */
class GameStateController {
    constructor($state, $interval) {
        this.$state = $state;
        this.$interval = $interval;

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

    continue() {
        this.$state.go('root.home');
    }
}

export const GameStateComponent = {
    name: 'gameState',
    bindings: {
        game: '<',
    },
    controller: GameStateController,
    template,
};
