import template from './game-list.html';

export const GameListComponent = {
    name: 'gameList',
    bindings: {
        filter: '<',
        games: '<',
    },
    template,
};
