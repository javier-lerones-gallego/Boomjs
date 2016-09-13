import { Component, OnInit } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { Game, Tile } from '../../models';
import { Router, ActivatedRoute }   from '@angular/router';
import { RouteNameService, GamesFilterService } from '../../services';

import { SlimLoadingBarService } from 'ng2-slim-loading-bar';
import * as moment from 'moment';


@Component({
  selector: 'games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.scss']
})
export class GamesComponent implements OnInit {
  constructor(private ngFire: AngularFire,
    private routeNameService: RouteNameService,
    private gamesFilterService: GamesFilterService,
    private router: Router,
    private route: ActivatedRoute,
    private slimLoadingBarService: SlimLoadingBarService) { }

  games: FirebaseListObservable<Game[]>;

  ngOnInit() {
    // Loading
    this.slimLoadingBarService.reset();
    this.slimLoadingBarService.color = '#4cc727';
    this.slimLoadingBarService.height = '4px';
    this.slimLoadingBarService.start();
    // Subscribe to Firebase auth to get the google profile
    this.ngFire.auth.subscribe(auth => {
      // Get the auth id
      this.games = this.ngFire.database.list('games'.concat('/', auth.uid), {
        query: {
          orderByPriority: true
        },
      });

      this.games.subscribe(x => {
        // stop the loader
        this.slimLoadingBarService.complete();
      });
    });

    // Change the header title
    this.route.data.forEach(data => {
      this.routeNameService.name.next(data['title']);
    });
  }

  go(game: Game): void {
    this.router.navigate(['/game', game['$key']]);
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
        // Set inverted priority for easy descending create date ordering
        game.setPriority(0 - Date.now());
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
        // Set inverted priority for easy descending create date ordering
        game.setPriority(0 - Date.now());
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
        // Set inverted priority for easy descending create date ordering
        game.setPriority(0 - Date.now());
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