import template from './explosion.html';

export default class ExplosionController {
    constructor($element) {
        this.$element = $element;
        this._visible = false;
    }

    $onInit() {
        // Subscribe to the DETONATE event.
        this.tile.subscribe('DETONATE', () => this.animate());
    }

    get visible() { return this._visible; }

    animate() {
        this._visible = true;

        // TODO: refactor this to animate the bomb instead of
        // just showing.. add css3 scale animations
    }
}
ExplosionController.$inject = ['$element'];

export const ExplosionComponent = {
    name: 'explosion',
    bindings: {
        tile: '<',
    },
    controller: ExplosionController,
    template,
};
