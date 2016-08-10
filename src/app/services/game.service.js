
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

    /**
     * Returns a list of games that are either ready or started.
     *
     * @readonly
     */
    get active() { return this._games.filter(g => g.isReady || g.isStarted); }

    /**
     * Returns a list of games that are either finished or over.
     *
     * @readonly
     */
    get done() { return this._games.filter(g => g.isFinished || g.isOver); }

    /**
     * Returns true of there is an active game
     */
    get isPlaying() { return this._games.some(g => g.isStarted); }

    /**
     * Returns true if the current URL id param matches an existing game.
     *
     * @readonly
     */
    get exists() { return this._games.some(g => g.id === this.$state.params.id); }

    /**
     * Creates a game with the specified difficulty.
     *
     * @param {any} difficulty: Possible values are EASY, MEDIUM, and EXPERT.
     * @returns
     */
    create(difficulty) {
        const newGame = new this.Game();

        if (difficulty === 'EASY') {
            newGame.easy();
        } else if (difficulty === 'MEDIUM') {
            newGame.medium();
        } else if (difficulty === 'EXPERT') {
            newGame.hard();
        }

        this._games.push(newGame);
        return this.$q.when(newGame.generate());
    }

    /**
     * Returns a game by id.
     *
     * @param {any} id
     * @returns
     */
    query(id) {
        return this._games.filter(g => g.id === id)[0];
    }
}
GameService.$inject = ['$state', '$q', 'Game'];
