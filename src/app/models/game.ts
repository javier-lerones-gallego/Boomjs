import { DIFFICULTY } from './difficulty';
import * as moment from 'moment';

export interface Game {
    id: string;
    rows: number;
    columns: number;
    mines: number;
    difficulty: DIFFICULTY;

    created: moment.Moment;
    started: moment.Moment;
    end: moment.Moment;

    elapsed: number;
}
