import { Injectable } from '@angular/core';
import { GAME_BOARD, Board, Tile, TILE_STATE, Coordinates } from '../models';

export interface IBoardService {
    generate(width: number, height: number): Board;

    from(board: Board): Array<Tile>;
    to(tiles: Array<Tile>, width: number): Board;

    coordinatesFromIndex(index: number, width: number): Coordinates;
    indexFromCoordinates(x: number, y: number, width: number): number;
}

@Injectable()
export class BoardService implements IBoardService {

    /**
     * Generates an empty Board array of a certain width and height
     *
     * @param {number} width
     * @param {number} height
     * @returns {Board}
     *
     * @memberOf BoardService
     */
    generate(width: number, height: number): Board {
        return { tiles: JSON.stringify(Array(width * height).fill([0, 0])), width: width };
    }

    /**
     * Creates an usable Array of Tile objects from an stored copy of a Board, usually coming from firebase.
     *
     * @param {Board} board
     * @returns {Array<Tile>}
     *
     * @memberOf BoardService
     */
    from(board: Board): Array<Tile> {
        const gameTiles: Array<Tile> = [];
        const tiles = JSON.parse(board.tiles);

        tiles.forEach((tile, index) => {
            const coordinates = this.coordinatesFromIndex(index, board.width);
            if (Object.prototype.toString.call(tile) === '[object Array]') {
                // Array is a no bomb, count and state, calculate coordinates based on array index
                gameTiles.push({
                    x: coordinates.x,
                    y: coordinates.y,
                    mine: false,
                    count: tile[0],
                    state: this.numberToState(tile[1])
                });
            } else {
                // number is a bomb, it just indicates the state of the bomb
                gameTiles.push({
                    x: coordinates.x,
                    y: coordinates.y,
                    mine: true,
                    state: this.numberToState(tile)
                });
            }
        });

        return gameTiles;
    }

    /**
     * Creates a saveable copy of Board from an Array of Tile objects.
     *
     * @param {Array<Tile>} tiles, the array of tiles, should be ordered.
     * @returns {Board}
     *
     * @memberOf BoardService
     */
    to(tiles: Array<Tile>, width: number): Board {
        const gameBoard: Board = { tiles: '', width: width };
        const board: GAME_BOARD = [];

        tiles.forEach(tile => {
            if (tile.mine) {
                board.push(this.stateToNumber(tile.state));
            } else {
                board.push([tile.count, this.stateToNumber(tile.state)]);
            }
        });

        // Stringify before posting
        gameBoard.tiles = JSON.stringify(board);

        return gameBoard;
    }


    private stateToNumber(state: TILE_STATE): number {
        switch (state) {
            case 'ACTIVE':
                return 0;
            case 'FLAG':
                return 1;
            case 'UNKNOWN':
                return 2;
            case 'REVEALED':
                return 3;
            case 'DETONATED':
                return 4;
        }
    }

    private numberToState(state: number): TILE_STATE {
        switch (state) {
            case 0:
                return 'ACTIVE';
            case 1:
                return 'FLAG';
            case 2:
                return 'UNKNOWN';
            case 3:
                return 'REVEALED';
            case 4:
                return 'DETONATED';
        }
    }

    coordinatesFromIndex(index: number, width: number): Coordinates {
        const coordinates: Coordinates = { x: 0, y: 0 };

        coordinates.y = (index % width);
        coordinates.x = Math.floor(index / width);

        return coordinates;
    }

    indexFromCoordinates(x: number, y: number, width: number): number {
        return (y * width) + x;
    }
}
