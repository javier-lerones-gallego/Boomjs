import template from './home.html';

class HomeController {
    constructor(GameService, $state) {
        this.GameService = GameService;
        this.$state = $state;
    }

    $onInit() {

    }

    get games() { return this.GameService.games; }
    get done() { return this.GameService.done; }
}
HomeController.$inject = ['GameService', '$state'];

export const HomeComponent = {
    name: 'boomjsHome',
    controller: HomeController,
    template,
};
