import Game from '../models/game.model';

/* ngInject */
export default class GameService {
    constructor($state, $q) {
        this.$q = $q;
        this.$state = $state;

        // The collection of games, not an array bc they suck.
        this._games = {};
    }

    /**
     * Gets the public name of the Service.
     */
    static get name() { return 'GameService'; }

    /**
     * Gets the collection of games. ReadOnly.
     */
    get games() { return this._games; }

    /**
     * Returns true of there is an active game
     */
    get isPlaying() {
        return Object.keys(this._games)
            .some(gameKey => this._games[gameKey].isStarted);
    }

    get active() {
        return this._games[Object.keys(this._games)
            .filter(gameKey => gameKey === this.$state.params.id)];
    }

    get paused() {
        return this._games[Object.keys(this._games)
            .filter(gameKey => this._games[gameKey].isPaused)];
    }

    get exists() {
        return Object.keys(this._games)
            .some(gameKey => gameKey === this.$state.params.id);
    }

    create(difficulty) {
        if (difficulty === 'EASY') {
            return this.newEasyGame();
        } else if (difficulty === 'MEDIUM') {
            return this.newMediumGame();
        } else if (difficulty === 'HARD') {
            return this.newHardGame();
        }
        // TODO: Custom difficulty
        return this.newEasyGame();
    }

    newGame(options) {
        const newGame = Game.newGame(options);
        this._games[newGame.id] = newGame;
        return this.$q.when(newGame.generate());
    }

    newEasyGame() {
        return this.newGame({ width: 9, height: 9, mineCount: 10, difficulty: 'EASY' });
    }

    newMediumGame() {
        return this.newGame({ width: 16, height: 16, mineCount: 40, difficulty: 'MEDIUM' });
    }

    newHardGame() {
        return this.newGame({ width: 30, height: 16, mineCount: 99, difficulty: 'HARD' });
    }

    activate(id) {
        Object.keys(this._games).forEach(gameKey => {
            if (this._games[gameKey].isStarted) {
                this._games[gameKey].pause();
            }
        });

        this._games[id].start();
    }

    wrap(data) {
        const deferred = this.$q.defer();
        deferred.resolve(data);
        return deferred.promise;
    }
}
