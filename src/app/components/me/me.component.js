import template from './me.html';

class MeController {
    constructor(GameService, $state) {
        this.GameService = GameService;
        this.$state = $state;
    }

    get games() { return this.GameService.games; }
    get done() { return this.GameService.done; }
}
MeController.$inject = ['GameService', '$state'];

export const MeComponent = {
    name: 'boomjsMe',
    controller: MeController,
    template,
};
