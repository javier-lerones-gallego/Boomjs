import Subscriber from './subscriber';

// TileState type
export type TileState = 'ACTIVE' | 'FLAGGED' | 'QUESTION' | 'REVEALED' | 'DETONATED';

export default function Tile() {
    class TileModel extends Subscriber {
        private _x: number;
        private _y: number;
        private _isMine: boolean;
        private _count: number;

        private _state: TileState;

        constructor() {
            // Subscriber
            super();

            this._x = -1;
            this._y = -1;
            this._isMine = false;
            this._count = 0;

            this._state = 'ACTIVE';
        }

        get x(): number { return this._x; }
        set x(value: number) { this._x = value; }

        get y(): number { return this._y; }
        set y(value: number) { this._y = value; }

        get isMine(): boolean { return this._isMine; }
        set isMine(value: boolean) { this._isMine = value; }

        get count(): number { return this._count; }
        set count(value: number) { this._count = value; }

        get active(): boolean { return this._state === 'ACTIVE'; }
        get question(): boolean { return this._state === 'QUESTION'; }
        get flagged(): boolean { return this._state === 'FLAGGED'; }
        get revealed(): boolean { return this._state === 'REVEALED'; }
        get detonated(): boolean { return this._state === 'DETONATED'; }

        get state(): TileState { return this._state; }
        set state(value: TileState) { this._state = value; }

        toggle(): void {
            switch (this.state) {
                case 'ACTIVE':
                    this.state = 'FLAGGED';
                    break;
                case 'FLAGGED':
                    this.state = 'QUESTION';
                    break;
                case 'QUESTION':
                    this.state = 'ACTIVE';
                    break;
                default:
                    this.state = 'ACTIVE';
            }
        }

        reveal(): void {
            this.state = 'REVEALED';
        }

        detonate(): void {
            this.state = 'DETONATED';
            this.broadcast('DETONATE');
        }
    }

    return TileModel;
}
