export type TILE_STATE = 'ACTIVE' | 'FLAG' | 'UNKNOWN' | 'REVEALED' | 'DETONATED';

export interface Tile {
    x: number;
    y: number;
    count: number;
    mine: boolean;
    state: TILE_STATE;
}