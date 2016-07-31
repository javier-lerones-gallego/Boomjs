import Guid from './guid.model';
import Mine from './mine.model';

// GAMESTATE = ('NEW', 'RANDOMIZING', 'READY', 'STARTED', 'PAUSED', 'FINISHED');

export default class Game {
    constructor() {
        this._id = Guid.newGuid().value;
        this._width = 9;
        this._height = 9;
        this._mineCount = 10;
        this._state = 'NEW';
        this._difficulty = 'EASY';

        this._start = null;
        this._ellapsed = null;

        // The collection of Mine objects
        this._mines = [];
    }

    static newGame(options) {
        const newGame = new Game();

        newGame.id = Guid.newGuid().value;
        newGame.width = options.width || 9;
        newGame.height = options.height || 9;
        newGame.mineCount = options.mineCount || 10;
        newGame.difficulty = options.difficulty || 'EASY';
        newGame.state = 'NEW';

        return newGame;
    }

    get id() { return this._id.value; }
    set id(value) {
        const guid = new Guid();
        guid.value = value;
        this._id = guid;
    }

    get width() { return this._width; }
    set width(value) { this._width = value; }

    get height() { return this._height; }
    set height(value) { this._height = value; }

    get mineCount() { return this._mineCount; }
    set mineCount(value) { this._mineCount = value; }

    get state() { return this._state; }
    set state(value) { this._state = value; }

    get difficulty() { return this._difficulty; }
    set difficulty(value) { this._difficulty = value; }

    get isReady() { return this._state === 'READY'; }
    get isCreating() { return this._state === 'RANDOMIZING'; }
    get isStarted() { return this._state === 'STARTED'; }
    get isPaused() { return this._state === 'PAUSED'; }
    get isFinished() { return this._state === 'FINISHED'; }

    get css() { return this._difficulty.toLowerCase(); }

    randomNumber(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    randomX() {
        return this.randomNumber(0, this._width - 1);
    }

    randomY() {
        return this.randomNumber(0, this._height - 1);
    }

    hasMine(x, y) {
        return this._mines.some(mine => mine.x === x && mine.y === y);
    }

    generate() {
        // Set the state
        this._state = 'RANDOMIZING';

        // TODO: Randomize the mine locations
        for (let mines = 0; mines <= this._mineCount; mines++) {
            const mine = new Mine();

            let foundEmptySpot = false;
            while (!foundEmptySpot) {
                const x = this.randomX();
                const y = this.randomY();

                if (!this.hasMine(x, y)) {
                    mine.x = x;
                    mine.y = y;
                    foundEmptySpot = true;
                }
            }

            this._mines.push(mine);
        }

        // Set the state to ready after creating the game.
        this._state = 'READY';

        // REturn the game itself for the methods that invoke generate()
        return this;
    }

    reset() {
        // Set the state
        this._state = 'NEW';

        // Regenerate
        this.generate();
    }

    start() {
        // Set the state
        this._state = 'STARTED';
    }

    pause() {
        // Set the state
        this._state = 'PAUSED';
    }
}
