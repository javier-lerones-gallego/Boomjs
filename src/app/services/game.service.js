
/* ngInject */
export default class GameService {
    constructor($state, $q, Game) {
        this.$q = $q;
        this.$state = $state;
        this.Game = Game;

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
        const newGame = new this.Game();
        if (difficulty === 'EASY') {
            newGame.easy();
        } else if (difficulty === 'MEDIUM') {
            newGame.medium();
        } else if (difficulty === 'HARD') {
            newGame.hard();
        } else {
            // TODO: Custom difficulty
            newGame.custom(9, 9, 10);
        }
        this._games[newGame.id] = newGame;
        return this.$q.when(newGame.generate());
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
