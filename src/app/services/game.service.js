
export default class GameService {
    constructor(Game) {
        // The Game model factory
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
     * Returns true of there is an active game
     */
    get isPlaying() { return this._games.some(g => g.isStarted); }

    /**
     * Creates a game with the specified difficulty.
     *
     * @param {any} difficulty: Possible values are EASY, MEDIUM, and EXPERT.
     * @returns The new Game object.
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
        newGame.generate();

        return newGame;
    }

    /**
     * Create an easy game.
     *
     * @returns
     */
    easy() {
        return this.create('EASY');
    }

    /**
     * Create a medium game.
     *
     * @returns
     */
    medium() {
        return this.create('MEDIUM');
    }

    /**
     * Create an expert game.
     *
     * @returns
     */
    expert() {
        return this.create('EXPERT');
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

    /**
     * Returns true if the current URL id param matches an existing game.
     *
     * @param {any} id
     * @returns
     */
    exists(id) {
        return this._games.some(g => g.id === id);
    }
}
GameService.$inject = ['Game'];
