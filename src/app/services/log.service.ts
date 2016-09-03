import * as angular from 'angular';
import * as moment from 'moment';

import { ILogService } from './ilog.service';

export default class LogService implements ILogService {
    constructor(private $log: angular.ILogService) {

    }

    static get name() { return 'LogService'; }

    get timestamp() { return moment().format('hh:mm:ss A'); }

    debug(message, ...more) {
        this.$log.log(`LOG (${this.timestamp}) ${message}`, ...more);
    }

    error(message, ...more) {
        this.$log.error(`ERROR ${this.timestamp}: ${message}`, ...more);
    }

    info(message, ...more) {
        this.$log.info(`INFO ${this.timestamp}: ${message}`, ...more);
    }
}
LogService.$inject = ['$log', 'environment'];
