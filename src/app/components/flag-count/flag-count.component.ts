declare function require(module: string): any;

export const FlagCountComponent = {
    name: 'flagCount',
    bindings: {
        game: '<',
    },
    template: require('./flag-count.html'),
};
