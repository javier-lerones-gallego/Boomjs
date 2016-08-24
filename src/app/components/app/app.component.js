import template from './app.html';

export default class AppController {
    constructor(GameService, $state, LogService) {
        this.GameService = GameService;
        this.$state = $state;
        this.LogService = LogService;
    }

    $onInit() {

    }

    get game() { return this.GameService.query(this.$state.params.id); }
}
AppController.$inject = ['GameService', '$state', 'LogService'];

export const AppComponent = {
    name: 'boomjsApp',
    controller: AppController,
    template,
};
