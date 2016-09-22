import { Component, OnInit, OnDestroy } from '@angular/core';
import { AngularFire, FirebaseListObservable, FirebaseAuthState } from 'angularfire2';
import { Game, Bomb, Action } from '../../models';
import { Router, ActivatedRoute }   from '@angular/router';
import { RouteNameService, GamesFilterService } from '../../services';
import { Subscription } from 'rxjs';
import { SlimLoadingBarService } from 'ng2-slim-loading-bar';
import * as moment from 'moment';


@Component({
  selector: 'boom-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.scss']
})
export class GamesComponent implements OnInit, OnDestroy {
  games: FirebaseListObservable<Game[]>;
  private auth: FirebaseAuthState;

  private _authSubscription: Subscription;
  private _gamesSubscription: Subscription;

  constructor(private ngFire: AngularFire,
    private routeNameService: RouteNameService,
    private gamesFilterService: GamesFilterService,
    private router: Router,
    private route: ActivatedRoute,
    private slimLoadingBarService: SlimLoadingBarService) { }

  ngOnInit() {
    // Loading
    this.slimLoadingBarService.reset();
    this.slimLoadingBarService.color = '#4cc727';
    this.slimLoadingBarService.height = '4px';
    this.slimLoadingBarService.start();

    // Subscribe to Firebase auth to get the google profile
    this._authSubscription = this.ngFire.auth.subscribe(auth => {
      // Store auth object state
      this.auth = auth;

      // Get the games
      this.games = this.ngFire.database.list('games'.concat('/', auth.uid), {
        query: {
          orderByPriority: true
        },
      });

      this._gamesSubscription = this.games.subscribe(x => {
        // stop the loader
        this.slimLoadingBarService.complete();
      });
    });

    // Change the header title
    this.route.data.forEach(data => {
      this.routeNameService.name.next(data['title']);
    });
  }

  ngOnDestroy() {
      this._authSubscription.unsubscribe();
      this._gamesSubscription.unsubscribe();
  }

  go(game: Game): void {
    this.router.navigate(['/game', game['$key']]);
  }

  css(game: Game): string {
    let style: Array<string> = [];

    // First the type of game
    if (game.rows === 9 && game.columns === 9) {
      style.push('easy');
    } else if (game.rows === 15 && game.columns === 16) {
      style.push('medium');
    } else if (game.rows === 15 && game.columns === 30) {
      style.push('expert');
    } else {
      style.push('custom');
    }

    // Second the state
    if (!!game.started) {
      style.push('started');
    }

    return style.join(' ');
  }

  ago(date: number): string {
    return moment(date).fromNow();
  }

  easy() {
    this.games.push({ rows: 9, columns: 9, count: 10, created: moment().valueOf() })
      .then(game => {
        // Set inverted priority for easy descending create date ordering
        game.setPriority(0 - Date.now());
        // After creating the game, go to it
        this.router.navigate(['/game', game.key]);
      });
  }

  medium() {
    this.games.push({ rows: 15, columns: 16, count: 40, created: moment().valueOf() })
      .then(game => {
        // Set inverted priority for easy descending create date ordering
        game.setPriority(0 - Date.now());
        // After creating the game, go to it
        this.router.navigate(['/game', game.key]);
      });
  }

  expert() {
    this.games.push({ rows: 15, columns: 30, count: 99, created: moment().valueOf() })
      .then(game => {
        // Set inverted priority for easy descending create date ordering
        game.setPriority(0 - Date.now());
        // After creating the game, go to it
        this.router.navigate(['/game', game.key]);
      });
  }

  custom() {
    throw new Error('Not yet implemented.');
  }
}
