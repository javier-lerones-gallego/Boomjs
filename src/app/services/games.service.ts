import { Injectable } from '@angular/core';
// import 'rxjs/add/operator/map';
// import { Observable } from 'rxjs/Observable';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import * as moment from 'moment';

import { Game } from '../models';

@Injectable()
export class GamesService {
  games: FirebaseListObservable<Game[]>;

  constructor(private ngFire: AngularFire) {
    this.games = this.ngFire.database.list('games', {
      query: { orderByChild: 'created'}
    });
  }

  easy(): any {
    return this.games.push({
      rows: 9,
      columns: 9,
      mines: 10,
      created: moment().valueOf()
    });
  }

  medium(): any {
    return this.games.push({
      rows: 15,
      columns: 16,
      mines: 40,
      created: moment().valueOf()
    });
  }

  expert(): any {
    return this.games.push({
      rows: 15,
      columns: 30,
      mines: 99,
      created: moment().valueOf()
    });
  }
}
