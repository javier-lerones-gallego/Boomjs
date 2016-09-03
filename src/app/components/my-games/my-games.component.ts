declare function require(module: string): any;

import { ICustomStateService } from '../../icustomstateservice';

class MyGamesController {
    private _pageSize: number;
    private _currentPage: number;

    private games: any;
    private pageSize: number;

    constructor(private GameService, private $state: ICustomStateService) {
        this._pageSize = this.pageSize || 10;
        this._currentPage = 0;
    }

    get activeCount() { return this.games.filter(g => g.isActive).length; }

    get showPrevious() { return this._currentPage > 0; }
    get showNext() { return this.page < this.pageCount; }

    get pagerStart() { return this._currentPage * this._pageSize; }
    get pagerSize() { return this._pageSize; }
    get pageCount() { return Math.ceil(this.activeCount / this._pageSize); }
    get page() { return this._currentPage + 1; }

    next() {
        this._currentPage++;
    }

    previous() {
        this._currentPage--;
    }

    goTo(game) {
        this.$state.go('root.game', { id: game.id });
    }
}
MyGamesController.$inject = ['GameService', '$state'];

export const MyGamesComponent = {
    name: 'myGames',
    bindings: {
        games: '<',
        pageSize: '<',
    },
    controller: MyGamesController,
    template: require('./my-games.html'),
};
