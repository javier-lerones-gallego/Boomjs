/* ngInject */
export default class StatsService {
    constructor($state) {
        this.$state = $state;
    }

    /**
     * Gets the public name of the Service.
     */
    static get name() { return 'StatsService'; }
}
