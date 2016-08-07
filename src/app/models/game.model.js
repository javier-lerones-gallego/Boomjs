/* ngInject */
export default function Game(Guid, Board) {
    class GameModel {
        constructor() {
            this._id = new Guid();
            this._rows = null;
            this._columns = null;
            this._mineCount = null;
            this._difficulty = 'EASY';

            // Assign the New state
            this._state = 'NEW';

            // Timestamps
            this._start = null;
            this._ellapsed = null;

            // The Board model is instantiated in the create methods
            this._board = null;

            // Debug flag
            this._debug = false;
        }

        get id() { return this._id.value; }
        set id(value) {
            const guid = new this.Guid();
            guid.value = value;
            this._id = guid;
        }

        get rows() { return this._rows; }
        get columns() { return this._columns; }
        get mineCount() { return this._mineCount; }
        get difficulty() { return this._difficulty; }

        get state() { return this._state; }
        set state(value) { this._state = value; }

        get board() { return this._board; } // Readonly, generated

        get isReady() { return this._state === 'READY'; }
        get isCreating() { return this._state === 'RANDOMIZING'; }
        get isStarted() { return this._state === 'STARTED'; }
        get isPaused() { return this._state === 'PAUSED'; }
        get isFinished() { return this._state === 'FINISHED'; }

        get debug() { return this._debug; }
        set debug(value) { this._debug = value; }

        get css() { return this._difficulty.toLowerCase(); }

        easy() {
            this._rows = 9;
            this._columns = 9;
            this._mineCount = 10;
            this._difficulty = 'EASY';
            // Instantiate the Board
            this._board = new Board(9, 9, 10);
        }

        medium() {
            this._rows = 16;
            this._columns = 16;
            this._mineCount = 40;
            this._difficulty = 'MEDIUM';
            // Instantiate the Board
            this._board = new Board(16, 16, 40);
        }

        hard() {
            this._rows = 16;
            this._columns = 30;
            this._mineCount = 99;
            this._difficulty = 'HARD';
            // Instantiate the Board
            this._board = new Board(16, 30, 99);
        }

        custom(/* width, height, mineCount*/) {
            // TODO
        }

        randomNumber(min, max) {
            return Math.floor(Math.random() * (max - min + 1) + min);
        }

        randomX() {
            return this.randomNumber(0, this._rows - 1);
        }

        randomY() {
            return this.randomNumber(0, this._columns - 1);
        }

        hasMine(x, y) {
            return this._mines.some(mine => mine.x === x && mine.y === y);
        }

        generate() {
            // Set the state
            this._state = 'RANDOMIZING';

            // First populate the board with all its tiles
            this._board.populate();

            // Randomize the mine locations
            for (let mines = 0; mines < this._mineCount; mines++) {
                let foundEmptySpot = false;
                while (!foundEmptySpot) {
                    const x = this.randomX();
                    const y = this.randomY();

                    if (!this._board.hasMine(x, y)) {
                        // Add the mine to the board
                        this._board.addMine(x, y);
                        foundEmptySpot = true;
                    }
                }
            }

            // Set the state to ready after creating the game.
            this._state = 'READY';

            // Return the game itself for the methods that invoke generate()
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

    return GameModel;
}
