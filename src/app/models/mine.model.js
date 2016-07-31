
export default class Mine {
    constructor() {
        this._x = -1;
        this._y = -1;
    }

    get x() { return this._x; }
    set x(value) { this._x = value; }

    get y() { return this._y; }
    set y(value) { this._y = value; }
}
