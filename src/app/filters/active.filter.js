
export default class ActiveFilter {
    constructor() {
        // The filtering function
        return (games) => games.filter((game) => game.isReady || game.isStarted);
    }

    static get name() { return 'active'; }

    static filter() {
        return new ActiveFilter();
    }
}
