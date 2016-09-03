declare function require(module: string): any;

import { IGameService } from '../../services/igame.service';

class HomeController {
    constructor(private GameService: IGameService) { }

    get games() { return this.GameService.games; }
}
HomeController.$inject = ['GameService'];

export const HomeComponent = {
    name: 'boomjsHome',
    controller: HomeController,
    template: require('./home.html'),
};
