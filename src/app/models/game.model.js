import moment from 'moment';

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
            this._end = null;

            // The Board model is instantiated in the create methods
            this._board = null;


            // Observers
            this._observers = [];
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
        get isFinished() { return this._state === 'FINISHED'; }
        get isOver() { return this._state === 'GAMEOVER'; }

        get started() { return this._start; }
        get end() { return this._end; }

        get ellapsed() { return moment(this._end.diff(this._start)).format('mm:ss'); }

        get css() { return this._difficulty.toLowerCase(); }

        get observers() { return this._observers; }

        subscribe(event, callback) {
            this._observers.push({ event, callback });
        }

        notify(event) {
            this._observers.forEach(o => {
                if (o.event === event) {
                    o.callback();
                }
            });
        }

        unsubscribe(event, callback) {
            this._observers =
                this._observers.filter(o => o.event !== event && o.callback === callback);
        }

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

            // Reset the time
            this._start = null;
            this._end = null;

            // Regenerate
            this.generate();
        }

        start() {
            // Set the state
            this._state = 'STARTED';
            // Set the start time
            this._start = moment();
        }

        finish() {
            // Set the state
            this._state = 'FINISHED';

            // Set the end time
            this._end = moment();

            // TODO: Delete all child collections and store only the stats to free up memory

            // Notify subscribers
            this.notify('WIN');
        }

        gameOver() {
            this._state = 'GAMEOVER';

            // Set the end time
            this._end = moment();

            // Notify subscribers
            this.notify('BOOM');
        }
    }

    return GameModel;
}
Game.$inject = ['Guid', 'Board'];
