import { Component, OnInit, OnDestroy } from '@angular/core';
import { AngularFire, FirebaseListObservable, FirebaseAuthState } from 'angularfire2';
import { Game } from '../../models';
import { Router, ActivatedRoute }   from '@angular/router';
import { RouteNameService, GamesFilterService, BoardService } from '../../services';
import { Subscription, Subject } from 'rxjs';
import { SlimLoadingBarService } from 'ng2-slim-loading-bar';
import * as moment from 'moment';


@Component({
  selector: 'boom-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.scss']
})
export class GamesComponent implements OnInit, OnDestroy {
  games: FirebaseListObservable<Game[]>;
  selectedGame: Subject<Game>;

  private auth: FirebaseAuthState;
  private _authSubscription: Subscription;
  private _gamesSubscription: Subscription;

  constructor(private ngFire: AngularFire,
    private routeNameService: RouteNameService,
    private gamesFilterService: GamesFilterService,
    private boardService: BoardService,
    private router: Router,
    private route: ActivatedRoute,
    private slimLoadingBarService: SlimLoadingBarService) { }

  ngOnInit() {
    // Loading
    this.slimLoadingBarService.reset();
    this.slimLoadingBarService.color = '#4cc727';
    this.slimLoadingBarService.height = '4px';
    this.slimLoadingBarService.start();

    // Initialize the selected game observable
    this.selectedGame = new Subject<Game>();

    // Subscribe to Firebase auth to get the google profile
    this._authSubscription = this.ngFire.auth.subscribe(auth => {
      // Store auth object state
      this.auth = auth;
      // Get the auth id
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
    // Instead of a routed state, game is now an overlay
    this.selectedGame.next(game);
  }


  easy() {
    // Create a new Easy game
    this.games.push({
      rows: 9,
      columns: 9,
      mines: 10,
      created: moment().valueOf(),
      difficulty: 'EASY',
      state: 'READY'
    }).then(game => {
        // Set inverted priority for easy descending create date ordering
        game.setPriority(0 - Date.now());

        // Add the tiles in a separate location to stop the massive triggering of many observables
        this.ngFire.database.object('boards'.concat('/', this.auth.uid, '/', game.key))
          .set(this.boardService.generate(9, 9));

        // After creating the game, open it
        this.selectedGame.next(game);
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
      state: 'READY'
    }).then(game => {
        // Set inverted priority for easy descending create date ordering
        game.setPriority(0 - Date.now());

        // Add the tiles in a separate location to stop the massive triggering of many observables
        this.ngFire.database.object('boards'.concat('/', this.auth.uid, '/', game.key))
          .set(this.boardService.generate(16, 15));

        // After creating the game, open it
        this.selectedGame.next(game);
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
      state: 'READY'
    }).then(game => {
        // Set inverted priority for easy descending create date ordering
        game.setPriority(0 - Date.now());

        // Add the tiles in a separate location to stop the massive triggering of many observables
        this.ngFire.database.object('boards'.concat('/', this.auth.uid, '/', game.key))
          .set(this.boardService.generate(30, 15));

        // After creating the game, open it
        this.selectedGame.next(game);
      });
  }
}
