
export type GAME_STATE = 'READY' | 'STARTED' | 'PAUSED' | 'WON' | 'LOSS';

export interface Game {
    rows: number;       // The number of rows for the game
    columns: number;    // The number of columns
    count: number;      // The number of bombs on the board
    created: number;    // The unix timestamp of the creation of the game
    started?: number;   // The unix timestamp of when the game was started
    ended?: number;     // The unix timestamp of when the game ended
}
