export type TILE_STATE = 'ACTIVE' | 'FLAG' | 'UNKNOWN' | 'REVEALED' | 'DETONATED';

export interface Tile {
    x: number;
    y: number;
    count?: number; // IF it is a mine this field makes no sense.
    mine: boolean;
    state: TILE_STATE;
}
