/* ngInject */
export default function Board(Tile) {
    class BoardModel {
        constructor(rows, columns, mineCount) {
            this._rows = rows;
            this._columns = columns;
            this._mineCount = mineCount;

            // The collection of TileModel objects
            this._tiles = [];
        }

        get rows() { return this._rows; }
        set rows(value) { this._rows = value; }

        get columns() { return this._columns; }
        set columns(value) { this._columns = value; }

        get mineCount() { return this._mineCount; }
        set mineCount(value) { this._mineCount = value; }

        get flagCount() { return this._tiles.filter(t => t.flagged).length; }

        get tiles() { return this._tiles; } // Read only, add and remove using the methods

        populate() {
            // Reset the array every time we invoke
            this.reset();

            // Now add all the tiles
            for (let x = 0; x < this._rows; x++) {
                for (let y = 0; y < this._columns; y++) {
                    const newTile = new Tile();
                    newTile.x = x;
                    newTile.y = y;

                    this._tiles.push(newTile);
                }
            }
        }

        reset() {
            this._tiles = [];
        }

        hasTile(x, y) {
            return this._tiles.some(tile => tile.x === x && tile.y === y);
        }

        hasMine(x, y) {
            return this._tiles.some(tile => tile.x === x && tile.y === y && tile.isMine);
        }

        getTile(x, y) {
            return this._tiles.filter(tile => tile.x === x && tile.y === y)[0];
        }

        addMine(x, y) {
            // Switch the tile to be a mine
            const tile = this.getTile(x, y);
            tile.isMine = true;
            tile.count = 0;

            // Increase the count of each neighbour by 1
            this.getNeighbours(x, y)
                .forEach(n => {
                    // Pure functions
                    const neighbour = n;
                    if (!neighbour.isMine) {
                        neighbour.count++;
                    }
                });
        }

        getNeighbours(i, j) {
            const neighbours = [];

            for (let x = Math.max(0, i - 1); x <= Math.min(i + 1, this._rows - 1); x++) {
                for (let y = Math.max(0, j - 1); y <= Math.min(j + 1, this._columns - 1); y++) {
                    if (x !== i || y !== j) {
                        neighbours.push(this.getTile(x, y));
                    }
                }
            }

            return neighbours;
        }

        dehighlight() {
            this._tiles.forEach(t => {
                const tile = t;
                tile.highlight = false;
            });
        }

        highlightNeighbours(tile) {
            // turn off all others first
            this.dehighlight();

            const neighbours = this.getNeighbours(tile.x, tile.y);

            neighbours.forEach(n => {
                const neighbour = n;
                neighbour.highlight = true;
            });
        }
    }

    return BoardModel;
}
