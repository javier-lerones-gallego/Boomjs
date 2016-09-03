
export default class StartFromFilter {
    constructor() {
        return (games, start) => games.slice(start);
    }

    static get name() { return 'startFrom'; }

    static filter() {
        return new StartFromFilter();
    }
}
