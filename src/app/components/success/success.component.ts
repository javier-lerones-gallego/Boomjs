declare function require(module: string): any;

export const SuccessComponent = {
    name: 'success',
    bindings: {
        game: '<',
    },
    template: require('./success.html'),
};
