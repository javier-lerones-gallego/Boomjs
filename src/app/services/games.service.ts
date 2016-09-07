import { Injectable } from '@angular/core';
// import 'rxjs/add/operator/map';
// import { Observable } from 'rxjs/Observable';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import * as moment from 'moment';

import { Game, Tile } from '../models';

@Injectable()
export class GamesService {
  games: FirebaseListObservable<Game[]>;

  constructor(private ngFire: AngularFire) {
    this.games = this.ngFire.database.list('games', {
      query: { orderByChild: 'created' }
    });
  }

  private createTiles(x: number, y: number): Array<Tile> {
    let tiles = new Array<Tile>();
    for (let i = 0; i < x; i++) {
      for (let j = 0; j < y; j++) {
        tiles.push({ x: i, y: j, mine: false, count: 0, state: 'ACTIVE' });
      }
    }
    return tiles;
  }

  easy(): any {
    return this.games.push({
      rows: 9,
      columns: 9,
      mines: 10,
      created: moment().valueOf(),
      difficulty: 'EASY',
      state: 'READY',
      tiles: this.createTiles(9, 9)
    });
  }

  medium(): any {
    return this.games.push({
      rows: 15,
      columns: 16,
      mines: 40,
      created: moment().valueOf(),
      difficulty: 'MEDIUM',
      state: 'READY',
      tiles: this.createTiles(15, 16)
    });
  }

  expert(): any {
    return this.games.push({
      rows: 15,
      columns: 30,
      mines: 99,
      created: moment().valueOf(),
      difficulty: 'EXPERT',
      state: 'READY',
      tiles: this.createTiles(15, 30)
    });
  }
}
