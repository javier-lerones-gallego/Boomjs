declare function require(module: string): any;

import { IGameService } from '../../services/igame.service';
import { ICustomStateService } from '../../icustomstateservice';

export class AppController {
    constructor(
        private GameService: IGameService,
        private $state: ICustomStateService
    ) { }

    get game() { return this.GameService.query(this.$state.params.id); }
}
AppController.$inject = ['GameService', '$state'];

export const AppComponent = {
    name: 'boomjsApp',
    controller: AppController,
    template: require('./app.html')
};
