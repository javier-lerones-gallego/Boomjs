import template from './fireworks.html';

export default class FireworksController {
    constructor($element) {
        this.$element = $element;
        this._visible = false;
    }

    $onInit() {
        // Subscribe to the WIN event.
        this.game.subscribe('WIN', () => this.animate());
    }

    get visible() { return this._visible; }

    animate() {
        this._visible = true;
    }
}
FireworksController.$inject = ['$element'];

export const FireworksComponent = {
    name: 'fireworks',
    bindings: {
        game: '<',
    },
    controller: FireworksController,
    template,
};
