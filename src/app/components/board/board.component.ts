declare function require(module: string): any;

class BoardController {
    private game: any;

    constructor(private $element: any) {}

    get board() { return this.game.board; }
    get tiles() { return this.game.board.tiles; }
}
BoardController.$inject = ['$element'];

export const BoardComponent = {
    bindings: {
        game: '<',
    },
    name: 'board',
    controller: BoardController,
    template: require('./board.html'),
};
