import * as moment from 'moment';

import Subscriber from './subscriber';
import { GameDifficulty } from '../services/game.service';

export interface IGame {
    id: string;
    rows: number;
    columns: number;
    mineCount: number;

    difficulty: GameDifficulty;
    displayDifficulty: string;

    isEasy: boolean;
    isMedium: boolean;
    isExpert: boolean;

    state: GameState;

    isReady: boolean;
    isStarted: boolean;
    isFinished: boolean;
    isOver: boolean;
    isPaused: boolean;

    isActive: boolean;
    isDone: boolean;

    created: number;
    started: moment.Moment;
    end: moment.Moment;

    elapsed: moment.Moment;
    css: string;

    stats: any; // TODO
    board: any; // TODO

    easy(): void;
    medium(): void;
    expert(): void;

    generate(): void;
    reset(): void;
    start(): void;
    pause(): void;
    resume(): void;
    finish(): void;

    gameOver(): void;
    saveStats(): void;
}

// GameState type
export type GameState = 'NEW' | 'READY' | 'STARTED' | 'FINISHED' | 'GAMEOVER' | 'PAUSED';

Game.$inject = ['Board', 'UtilsService'];
export default function Game(Board, UtilsService) {
    class GameModel extends Subscriber implements IGame {
        private _id: string;
        private _rows: number;
        private _columns: number;
        private _mineCount: number;

        private _difficulty: GameDifficulty;
        private _state: GameState;

        private _created: moment.Moment;
        private _start: moment.Moment;
        private _end: moment.Moment;
        private _elapsed: number;
        private _pause: moment.Moment;

        private _board: any; // TODO
        private _stats: any; // TODO

        constructor() {
            // Subscriber
            super();

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
            this._elapsed = 0;
            this._pause = null;

            // The Board model is instantiated in the create methods
            this._board = null;

            // The stats for when the game is over
            this._stats = {};
        }

        get id() { return this._id; }

        get rows() { return this._rows; }
        get columns() { return this._columns; }
        get mineCount() { return this._mineCount; }
        get difficulty(): GameDifficulty { return this._difficulty; }
        get displayDifficulty(): string { return UtilsService.toTitleCase(this._difficulty); }

        get isEasy() { return this._difficulty === 'EASY'; }
        get isMedium() { return this._difficulty === 'MEDIUM'; }
        get isExpert() { return this._difficulty === 'EXPERT'; }

        get state(): GameState { return this._state; }
        set state(value: GameState) { this._state = value; }

        get board() { return this._board; } // Readonly, generated

        get isReady() { return this._state === 'READY'; }
        get isStarted() { return this._state === 'STARTED'; }
        get isFinished() { return this._state === 'FINISHED'; }
        get isOver() { return this._state === 'GAMEOVER'; }
        get isPaused() { return this._state === 'PAUSED'; }

        get isActive() { return this.isReady || this.isStarted || this.isPaused; }
        get isDone() { return this.isOver || this.isFinished; }

        get created() { return this._created.valueOf(); }
        get started() { return this._start; }
        get end() { return this._end; }

        get elapsed() { return this._elapsed; }

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
            this._rows = 15;
            this._columns = 16;
            this._mineCount = 40;
            this._difficulty = 'MEDIUM';
            // Instantiate the Board
            this._board = new Board(15, 16, 40);
        }

        expert() {
            this._rows = 15;
            this._columns = 30;
            this._mineCount = 99;
            this._difficulty = 'EXPERT';
            // Instantiate the Board
            this._board = new Board(15, 30, 99);
        }

        generate() {
            // First populate the board with all its tiles
            this._board.populate();

            // Set the state to ready after creating the game.
            this._state = 'READY';
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
            // Set the initial paused time to avoid checking for null
            this._pause = this._start;
        }

        pause() {
            // Add the amount of miliseconds to the elapsed total.
            this._elapsed += moment().diff(this._pause);
            // Set the state
            this._state = 'PAUSED';
        }

        resume() {
            // Reset pause to now
            this._pause = moment();
            // Set the state
            this._state = 'STARTED';
        }

        finish() {
            // Set the state
            this._state = 'FINISHED';

            // Set the end time
            this._end = moment();

            // Add the amount of miliseconds to the elapsed total.
            this._elapsed += moment().diff(this._pause);

            // Save stats
            this.saveStats();

            // TODO: Delete the board to save memory

            // Trigger success event
            this.broadcast('WIN');
        }

        gameOver() {
            this._state = 'GAMEOVER';

            // Set the end time
            this._end = moment();

            // Add the amount of miliseconds to the elapsed total.
            this._elapsed += moment().diff(this._pause);

            // Save stats
            this.saveStats();
        }

        saveStats() {
            // Save the stats to this object
            this._stats = {
                flags_set: this._board.flags,
                percentage_revealed: this._board.percentage,
                time_elapsed: moment(this._elapsed),
            };
        }
    }

    return GameModel;
}
