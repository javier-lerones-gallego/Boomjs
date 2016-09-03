declare function require(module: string): any;

import { IGameService } from '../../services/igame.service';
import { ICustomStateService } from '../../icustomstateservice';

class MeController {
    constructor(
        private GameService: IGameService,
        private $state: ICustomStateService
    ) { }

    get games() { return this.GameService.games; }
}
MeController.$inject = ['GameService', '$state'];

export const MeComponent = {
    name: 'boomjsMe',
    controller: MeController,
    template: require('./me.html'),
};
