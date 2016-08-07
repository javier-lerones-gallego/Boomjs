/* ngInject */
export default function Tile() {
    class TileModel {
        constructor() {
            this._x = -1;
            this._y = -1;
            this._isMine = false;
            this._count = 0;

            this._highlight = false;
        }

        get x() { return this._x; }
        set x(value) { this._x = value; }

        get y() { return this._y; }
        set y(value) { this._y = value; }

        get isMine() { return this._isMine; }
        set isMine(value) { this._isMine = value; }

        get count() { return this._count; }
        set count(value) { this._count = value; }

        get highlight() { return this._highlight; }
        set highlight(value) { this._highlight = value; }
    }

    return TileModel;
}
