/* ngInject */
export default function Board(Tile) {
    class BoardModel {
        constructor(width, height, mineCount) {
            this._width = width;
            this._height = height;
            this._mineCount = mineCount;

            // The collection of TileModel objects
            this._tiles = [];
        }

        get width() { return this._width; }
        set width(value) { this._width = value; }

        get height() { return this._height; }
        set height(value) { this._height = value; }

        get mineCount() { return this._mineCount; }
        set mineCount(value) { this._mineCount = value; }

        get tiles() { return this._tiles; } // Read only, add and remove using the methods

        populate() {
            // Reset the array every time we invoke
            this.reset();

            // Now add all the tiles
            for (let x = 0; x < this._width; x++) {
                for (let y = 0; y < this._height; y++) {
                    this.addTile(x, y);
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

        addTile(x, y) {
            const newTile = new Tile();
            newTile.x = x;
            newTile.y = y;

            this._tiles.push(newTile);
        }

        addMine(x, y) {
            const newTile = new Tile();
            newTile.x = x;
            newTile.y = y;
            newTile.isMine = true;

            // Switch the tile to be a mine
            if (this.hasTile(x, y)) {
                const tile = this.getTile(x, y);
                tile.isMine = true;
            }

            // Increase the count of each neighbour by 1
            this.getNeighbours(x, y)
                .forEach(neighbour => { neighbour.count++; });
        }

        getNeighbours(x, y) {


            // TODO
            return [];
        }
    }

    return BoardModel;
}
