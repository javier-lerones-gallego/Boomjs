
export type GAME_DIFFICULTY = 'EASY' | 'MEDIUM' | 'EXPERT';
export type GAME_STATE = 'READY' | 'STARTED' | 'PAUSED' | 'WON' | 'LOSS';

export interface Game {
    rows: number;
    columns: number;
    mines: number;
    created: number;
    difficulty: GAME_DIFFICULTY;
    state: GAME_STATE;
}
