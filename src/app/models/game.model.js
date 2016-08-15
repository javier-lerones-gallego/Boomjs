import moment from 'moment';

export default function Game(Board, UtilsService) {
    class GameModel {
        constructor() {
            this._id = UtilsService.newId();
            this._rows = null;
            this._columns = null;
            this._mineCount = null;
            this._difficulty = 'EASY';

            // Assign the New state
            this._state = 'NEW';

            // Timestamps
            this._created = moment();
            this._start = null;
            this._end = null;

            // The Board model is instantiated in the create methods
            this._board = null;

            // The stats for when the game is over
            this._stats = {};
        }

        get id() { return this._id; }

        get rows() { return this._rows; }
        get columns() { return this._columns; }
        get mineCount() { return this._mineCount; }
        get difficulty() { return this._difficulty; }
        get displayDifficulty() { return UtilsService.toTitleCase(this._difficulty); }

        get isEasy() { return this._difficulty === 'EASY'; }
        get isMedium() { return this._difficulty === 'MEDIUM'; }
        get isExpert() { return this._difficulty === 'EXPERT'; }

        get state() { return this._state; }
        set state(value) { this._state = value; }

        get board() { return this._board; } // Readonly, generated

        get isReady() { return this._state === 'READY'; }
        get isStarted() { return this._state === 'STARTED'; }
        get isFinished() { return this._state === 'FINISHED'; }
        get isOver() { return this._state === 'GAMEOVER'; }

        get isActive() { return this.isReady || this.isStarted; }
        get isDone() { return this.isOver || this.isFinished; }

        get created() { return this._created.valueOf(); }
        get started() { return this._start; }
        get end() { return this._end; }

        get ellapsed() { return moment(this._end.diff(this._start)).format('mm:ss'); }

        get css() { return this._difficulty.toLowerCase(); }

        get stats() { return this._stats; }

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
            this._difficulty = 'EXPERT';
            // Instantiate the Board
            this._board = new Board(16, 30, 99);
        }

        generate() {
            // First populate the board with all its tiles
            this._board.populate();

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

            // Save the stats to this object
            this._stats = {
                flags_set: this._board.flags,
                percentage_revealed: this._board.percentage,
                time_elapsed: moment(this._end.diff(this._start)).format('mm:ss'),
            };

            // Delete the board object to save memory
            this._board.gameOver();
        }

        gameOver() {
            this._state = 'GAMEOVER';

            // Set the end time
            this._end = moment();
        }

    }

    return GameModel;
}
Game.$inject = ['Board', 'UtilsService'];
