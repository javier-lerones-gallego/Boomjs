
/* ngInject */
export default class GameService {
    constructor($state, $q, Game) {
        this.$q = $q;
        this.$state = $state;
        this.Game = Game;

        // The collection of games.
        this._games = [];
    }

    /**
     * Gets the public name of the Service.
     */
    static get name() { return 'GameService'; }

    /**
     * Gets the collection of games. ReadOnly.
     */
    get games() { return this._games; }

    get active() { return this._games.filter(g => g.isReady || g.isStarted || g.isPaused); }
    get done() { return this._games.filter(g => g.isFinished || g.isOver); }
    /**
     * Returns true of there is an active game
     */
    get isPlaying() { return this._games.some(g => g.isStarted); }

    get current() { return this._games.filter(g => g.id === this.$state.params.id)[0]; }

    get paused() { return this._games.filter(g => g.isPaused); }

    get exists() { return this._games.some(g => g.id === this.$state.params.id); }

    create(difficulty) {
        const newGame = new this.Game();

        if (difficulty === 'EASY') {
            newGame.easy();
        } else if (difficulty === 'MEDIUM') {
            newGame.medium();
        } else if (difficulty === 'HARD') {
            newGame.hard();
        }

        this._games.push(newGame);
        return this.$q.when(newGame.generate());
    }

    wrap(data) {
        const deferred = this.$q.defer();
        deferred.resolve(data);
        return deferred.promise;
    }
}
