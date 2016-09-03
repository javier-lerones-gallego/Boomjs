declare function require(module: string): any;

export const DefeatComponent = {
    name: 'defeat',
    bindings: {
        game: '<',
    },
    template: require('./defeat.html'),
};
