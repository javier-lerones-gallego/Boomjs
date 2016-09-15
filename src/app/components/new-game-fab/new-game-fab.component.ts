import { Component, OnInit } from '@angular/core';
import { Router }   from '@angular/router';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import * as moment from 'moment';
import { Game, Tile } from '../../models';

@Component({
  selector: 'boom-new-game-fab',
  templateUrl: './new-game-fab.component.html',
  styleUrls: ['./new-game-fab.component.scss']
})
export class NewGameFabComponent implements OnInit {
  private games: FirebaseListObservable<Game[]>;

  constructor(
    private ngFire: AngularFire,
    private router: Router
  ) { }

  ngOnInit() {
    // Subscribe to Firebase auth to get the google profile
    this.ngFire.auth.subscribe(auth => {
      this.games = this.ngFire.database.list('games'.concat('/', auth.uid));
    });
  }

  easy() {
    // Create a new Easy game
    this.games.push({
      rows: 9,
      columns: 9,
      mines: 10,
      created: moment().valueOf(),
      difficulty: 'EASY',
      state: 'READY',
      tiles: this.createTiles(9, 9)
    }).then(game => {
        // After creating the game, go to it
        this.router.navigate(['/game', game.key]);
      });
  }

  medium() {
    // Create a new Medium game
    this.games.push({
      rows: 15,
      columns: 16,
      mines: 40,
      created: moment().valueOf(),
      difficulty: 'MEDIUM',
      state: 'READY',
      tiles: this.createTiles(15, 16)
    }).then(game => {
        // After creating the game, go to it
        this.router.navigate(['/game', game.key]);
      });
  }

  expert() {
    // Create a new Expert game
    this.games.push({
      rows: 15,
      columns: 30,
      mines: 99,
      created: moment().valueOf(),
      difficulty: 'EXPERT',
      state: 'READY',
      tiles: this.createTiles(15, 30)
    }).then(game => {
        // After creating the game, go to it
        this.router.navigate(['/game', game.key]);
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
}
