import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Rx';

@Injectable()
export class GamesFilterService {
    public filter: Subject<string>;

    constructor() {
        this.filter = new Subject<string>();
    }
}
