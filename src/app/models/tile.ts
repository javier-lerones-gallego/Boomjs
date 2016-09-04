
export interface Tile {
    x: number;
    y: number;
    count: number;
    mine: boolean;

    // Do we need this?
    state: string;
}