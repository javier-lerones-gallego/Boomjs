/* ngInject */
export default function Tile() {
    class TileModel {
        constructor() {
            this._x = -1;
            this._y = -1;
            this._isMine = false;
            this._count = 0;

            this._state = 0;

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

        get active() { return this._state === 0; }
        get question() { return this._state === 2; }
        get flagged() { return this._state === 1; }
        get revealed() { return this._state === 3; }
        get detonated() { return this._state === 4; }

        get highlight() { return this._highlight; }
        set highlight(value) { this._highlight = value; }

        get state() { return this._state; }
        set state(value) {
            switch (value) {
                case 'ACTIVE':
                    this._state = 0;
                    break;
                case 'FLAGGED':
                    this._state = 1;
                    break;
                case 'QUESTION':
                    this._state = 2;
                    break;
                case 'REVEALED':
                    this._state = 3;
                    break;
                case 'DETONATED':
                    this._state = 4;
                    break;
                default:
                    this._state = 0;
                    break;
            }
        }

        flag() {
            this.state = 'FLAGGED';
        }

        unknown() {
            this.state = 'QUESTION';
        }

        activate() {
            this.state = 'ACTIVE';
        }

        reveal() {
            this.state = 'REVEALED';
        }

        detonate() {
            this.state = 'DETONATED';
        }
    }

    return TileModel;
}
