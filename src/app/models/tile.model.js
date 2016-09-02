import Subscriber from './subscriber';

export default function Tile() {
    class TileModel extends Subscriber {
        constructor() {
            // Subscriber
            super();

            this._x = -1;
            this._y = -1;
            this._isMine = false;
            this._count = 0;

            this._state = 0;
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

        toggle() {
            switch (this.state) {
                case 0:
                    this.state = 'FLAGGED';
                    break;
                case 1:
                    this.state = 'QUESTION';
                    break;
                case 2:
                    this.state = 'ACTIVE';
                    break;
                default:
                    this.state = 'ACTIVE';
            }
        }

        reveal() {
            this.state = 'REVEALED';
        }

        detonate() {
            this.state = 'DETONATED';
            this.broadcast('DETONATE');
        }
    }

    return TileModel;
}
