import template from './app.html';

export default class AppController {
    constructor(GameService, $state) {
        this.GameService = GameService;
        this.$state = $state;
    }

    get game() { return this.GameService.query(this.$state.params.id); }
}
AppController.$inject = ['GameService', '$state'];

export const AppComponent = {
    name: 'boomjsApp',
    controller: AppController,
    template,
};
