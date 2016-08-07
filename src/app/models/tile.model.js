/* ngInject */
export default function Tile() {
    class TileModel {
        constructor() {
            this._x = -1;
            this._y = -1;
            this._isMine = false;
            this._count = 0;

            this._active = true;
            this._flagged = false;
            this._question = false;

            this._revealed = false;

            this._detonated = false;

            // Debug
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

        get active() { return this._active; }
        get question() { return this._question; }
        get flagged() { return this._flagged; }
        get revealed() { return this._revealed; }
        get detonated() { return this._detonated; }

        get highlight() { return this._highlight; }
        set highlight(value) { this._highlight = value; }

        flag() {
            this._active = false;
            this._question = false;
            this._revealed = false;
            this._flagged = true;
        }

        unknown() {
            this._active = false;
            this._question = true;
            this._revealed = false;
            this._flagged = false;
        }

        activate() {
            this._active = true;
            this._question = false;
            this._revealed = false;
            this._flagged = false;
        }

        reveal() {
            this._active = false;
            this._question = false;
            this._revealed = true;
            this._flagged = false;
        }

        detonate() {
            this._active = false;
            this._question = false;
            this._revealed = false;
            this._flagged = false;
            this._detonated = true;
        }
    }

    return TileModel;
}
