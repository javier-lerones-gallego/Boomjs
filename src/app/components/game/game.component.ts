import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AngularFire, FirebaseObjectObservable, FirebaseListObservable } from 'angularfire2';
import { Game, Tile } from '../../models';
import { RouteNameService } from '../../services';

import { Subscription } from 'rxjs';

/*
  The observables are being triggered too many times because tiles are inside game,
  so changing the state of a tile, also triggers the game observable which contains the tile collection
  and the values are refreshed hundreds of times every time something happens.

  This is worse on an expert level game, where there is already hundreds of tiles, which makes the delays
  much much longer, going to the tens of thousands of updates of the entire collection.

  I will try having a separate observable for the game, and a list of observables for the tiles.
  I can refactor the game to only store the location of the mines, and calculate the counts dinamically
  instead, and also only store the clicks for each game, this way I could also recreate the history.
*/

@Component({
  selector: 'boom-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit, OnDestroy {
  game: FirebaseObjectObservable<Game>;
  tiles: FirebaseListObservable<Tile[]>;

  private _game: Game;
  private _tiles: Tile[];

  private _gameSubscription: Subscription;
  private _tileSubscription: Subscription;
  private _routeSubscription: Subscription;
  private _authSubscription: Subscription;

  private uid: string;
  private gameRef: string = '';
  private tilesRef: string = '';

  constructor(
    private ngFire: AngularFire,
    private router: Router,
    private route: ActivatedRoute,
    private routeNameService: RouteNameService) { }

  ngOnInit() {
    // If the params in the url change, refresh the component
    // The router only reloads the component if both route and params change
    this._routeSubscription = this.route.params.subscribe(params => {
      // Subscribe to Firebase auth to get the google profile
      this._authSubscription = this.ngFire.auth.subscribe(auth => {
        this.uid = auth.uid;

        this.gameRef = 'games'.concat('/', auth.uid, '/', params['id']);
        this.tilesRef = 'tiles'.concat('/', auth.uid, '/', params['id']);

        // Get the game and the tiles observables
        this.game = this.ngFire.database.object(this.gameRef);
        this.tiles = this.ngFire.database.list(this.tilesRef);

        this._gameSubscription = this.game.subscribe(g => { this._game = g; console.log('Game subscribe triggered.'); });

        /*
            Instead of subscribing to the entire list of tiles, which will
            trigger this subscribe every time each individual tile is changed. This is very noticeable on randomizing
            the bombs, where tens of thousands of events are triggered and this handler is ran so many times
            the browser slows down visibly.

            I should do a forEach() without subscription here to have the tile keys into an array, then pass each tile key
            to the tile component, and each tile component should get an individual object observable
        */

        this._tileSubscription = this.tiles.subscribe(t => { this._tiles = t; console.log('Tiles subscribe triggered.', t.length); });
      });
    });

    // Change the header title, data is observable and only has one value
    this.route.data.forEach(data => {
      this.routeNameService.name.next(data['title']);
    });
  }

  ngOnDestroy() {
      this._gameSubscription.unsubscribe();
      this._tileSubscription.unsubscribe();
      this._routeSubscription.unsubscribe();
      this._authSubscription.unsubscribe();
  }

  get revealed(): number { return this._tiles.filter(t => t.state === 'REVEALED').length; }
  get first(): boolean { return this.revealed === 0; }
  get flags(): number { return this._tiles.filter(t => t.state === 'FLAG').length; }
  get left(): number { return this._game.mines - this.flags; }
  get completed() {
    return this._tiles.filter(t => t.state === 'FLAG' && t.mine).length === this._game.mines
      && this.revealed === this._tiles.length - this._game.mines;
  }

  tilePressed(event) {
    // If it is the first click, randomize the mines
    if (this.first) {
      // Randomize the mines on first click
      this.randomize(event.coordinates);
      // Set the game as started
      this.game.update({ state: 'STARTED' });
    }
  }

  tileStateChange(event) {
    // Update firebase
    this.ngFire.database.list(this.tilesRef)
      .update(event.key, { state: event.value });

    if (this.completed) {
      // Set the game as won
      this.game.update({ state: 'WON' });
      // TODO: victory something?
    }
  }

  tileReveal(event) {
    // Update firebase
    this.ngFire.database.list(this.tilesRef)
      .update(event.key, { state: 'REVEALED' });

    // Spread the reveal if possible
    this.reveal(event.coordinates.x, event.coordinates.y);

    // Check for victory
    if (this.completed) {
      // Set the game as won
      this.game.update({ state: 'WON' });
      // TODO: victory something?
    }
  }

  tileDetonate(event) {
    this._tiles.forEach(tile => {
        this.ngFire.database.list(this.tilesRef)
          .update(this.getTileKey(tile.x, tile.y), { state: tile.mine ? 'DETONATED' : 'REVEALED' });
    });
    // Set the game as loss
    this.game.update({ state: 'LOSS' });
  }

  private hasMine(x: number, y: number): boolean {
    return this._tiles.some(tile => tile.x === x && tile.y === y && tile.mine);
  }

  private getTile(x: number, y: number): Tile {
    return this._tiles.filter((tile, index) => tile.x === x && tile.y === y)[0];
  }

  private getTileKey(x: number, y: number): string {
    return this.getTile(x, y)['$key'];
  }

  private getNeighbours(i: number, j: number): Tile[] {
    const neighbours: Tile[] = [];

    for (let x = Math.max(0, i - 1); x <= Math.min(i + 1, this._game.rows - 1); x++) {
      for (let y = Math.max(0, j - 1); y <= Math.min(j + 1, this._game.columns - 1); y++) {
        if (x !== i || y !== j) {
          neighbours.push(this.getTile(x, y));
        }
      }
    }

    return neighbours;
  }

  private addMine(x: number, y: number): void {
    // Switch the tile to be a mine
    const tileIndex = this.getTileKey(x, y);

    // Update the firebase
    this.ngFire.database.list(this.tilesRef)
      .update(tileIndex, { mine: true, count: 0 });

    // Increase the count of each neighbour by 1
    this.getNeighbours(x, y)
      .forEach(n => {
        if (!n.mine) {
          this.ngFire.database.list(this.tilesRef)
            .update(this.getTileKey(n.x, n.y), { count: n.count + 1 });
        }
      });
  }

  private reveal(x: number, y: number): void {
    const tile = this.getTile(x, y);

    if (tile.count === 0) {
      this.revealAround(tile);
    }
  }

  private revealAround(tile: Tile): void {
    const neighbours = this.getNeighbours(tile.x, tile.y);

    const spreadTiles = neighbours.filter(n => n.count === 0 && n.state === 'ACTIVE');
    const endTiles = neighbours.filter(n => n.count !== 0 && n.state === 'ACTIVE');

    // Reveal the end Tiles
    endTiles.forEach(t => {
      this.ngFire.database.list(this.tilesRef)
        .update(this.getTileKey(t.x, t.y), { state: 'REVEALED' });
    });

    // Spread to the other tiles
    spreadTiles.forEach(t => {
      // First reveal the actual neighbour
      this.ngFire.database.list(this.tilesRef)
        .update(this.getTileKey(t.x, t.y), { state: 'REVEALED' });
      // Then tell its neighbours to spread
      this.revealAround(t);
    });
  }

  private randomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  private randomize(coordinates: any): void {
    // Randomize the mine locations, avoid the tile we just clicked on
    for (let mines = 0; mines < this._game.mines; mines++) {
      let foundEmptySpot = false;
      while (!foundEmptySpot) {
        const x = this.randomNumber(0, this._game.rows - 1);
        const y = this.randomNumber(0, this._game.columns - 1);

        if (coordinates.x !== x && coordinates.y !== y && !this.hasMine(x, y)) {
          // Add the mine to the board
          this.addMine(x, y);
          foundEmptySpot = true;
        }
      }
    }
  }
}
