import moment from 'moment';

export default class LogService {
    constructor($log, environment) {
        this.$log = $log;
        this.environment = environment;
    }

    static get name() { return 'LogService'; }
    get timestamp() { return moment().format('hh:mm:ss A'); }

    /**
     * Description: prints a debug message in the console. Automatically disabled in prod env.
     *
     * @param {any} message The main message to be passed to the log.
     * @param {any[]} more Extra prams to be passed to the log.
     */
    debug(message, ...more) {
        if (this.environment === 'dev') {
            this.$log.log(`LOG (${this.timestamp}) ${message}`, ...more);
        }
    }

    error(message, ...more) {
        this.$log.error(`ERROR ${this.timestamp}: ${message}`, ...more);
    }

    info(message, ...more) {
        this.$log.info(`INFO ${this.timestamp}: ${message}`, ...more);
    }
}
LogService.$inject = ['$log', 'environment'];
