import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { AngularFire, FirebaseObjectObservable } from 'angularfire2';
import { Game, Tile, Board, Coordinates } from '../../models';
import { BoardService } from '../../services';

import { Subscription, Observable } from 'rxjs';

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
  @Input('selectedgame') selectedgame: Observable<Game>;

  gameObservable: FirebaseObjectObservable<Game>;
  boardObservable: FirebaseObjectObservable<Board>;

  private _game: Game;
  private _board: Board;
  private _tiles: Tile[];

  private _boardSubscription: Subscription;
  private _authSubscription: Subscription;

  private show: boolean;
  private uid: string;
  private gameRef: string = '';
  private boardRef: string = '';

  constructor(
    private ngFire: AngularFire,
    private boardService: BoardService) { }

  ngOnInit() {
    // Hide the component by default
    this.show = false;

    // Subscribe to Firebase auth to get the google profile
    this._authSubscription = this.ngFire.auth.subscribe(auth => {
      this.uid = auth.uid;

      this.selectedgame.subscribe(game => {
        this._game = game;

        this.gameRef = 'games'.concat('/', auth.uid, '/', game['$key']);
        this.boardRef = 'boards'.concat('/', auth.uid, '/', game['$key']);

        // Get the game and the tiles observables
        this.gameObservable = this.ngFire.database.object(this.gameRef);
        this.boardObservable = this.ngFire.database.object(this.boardRef);

        this._boardSubscription = this.boardObservable.subscribe(board => {
          this._board = board;
          this._tiles = this.boardService.from(board);

          // Unsubscribe immediately, there is no need to keep listening for updates
          // since this is not multiplay, we only need to make sure the firebase is updated
          // on each event triggered from the tile component, but the local copy is handled
          // purely locally

          if (this._boardSubscription) {
            this._boardSubscription.unsubscribe();
          }

          // Only show the board when it has been loaded
          this.show = true;
        });
      });

    });
  }

  ngOnDestroy() {
    this._authSubscription.unsubscribe();

    if (this._boardSubscription) {
      this._boardSubscription.unsubscribe();
    }
  }

  get game(): Game { return this._game; }
  get tiles(): Tile[] { return this._tiles || []; }

  get revealed(): number { return this._tiles.filter(t => t.state === 'REVEALED').length; }
  get first(): boolean { return this.revealed === 0; }
  get flags(): number { return this._tiles.filter(t => t.state === 'FLAG').length; }
  get left(): number { return this._game.mines - this.flags; }

  get completed() {
    return this._tiles.filter(t => t.state === 'FLAG' && t.mine).length === this._game.mines
      && this.revealed === this._tiles.length - this._game.mines;
  }

  close(event) {
    this.show = false;
  }

  tilePressed(event) {
    // If it is the first click, randomize the mines
    if (this.first) {
      // Randomize the mines on first click
      this.randomizeBombs(event.coordinates);
      // Set the game as started
      this.gameObservable.update({ state: 'STARTED' });
    }
  }

  tileStateChange(event) {
    // Update the tile
    const tile = this.getTile(event.coordinates.x, event.coordinates.y);
    tile.state = event.value;

    // Update the bord object
    this.updateBoard();

    if (this.completed) {
      // Set the game as won
      this.gameObservable.update({ state: 'WON' });
      // TODO: victory something?
    }
  }

  tileReveal(event) {
    // Spread the reveal if possible
    this.reveal(event.coordinates.x, event.coordinates.y);

    // Check for victory
    if (this.completed) {
      // Set the game as won
      this.gameObservable.update({ state: 'WON' });
      // TODO: victory something?
    }

    // Update the board after revealing
    this.updateBoard();
  }

  tileDetonate(event) {
    this._tiles.forEach(tile => {
      tile.state = tile.mine ? 'DETONATED' : 'REVEALED';
    });
    // Set the game as loss
    this.gameObservable.update({ state: 'LOSS' });
    // Update the board
    this.updateBoard();
  }

  tileSpread(event) {
    // Find the tile, we checked for REVEALED state before getting here
    const tile = this.getTile(event.coordinates.x, event.coordinates.y);

    // If the total count of flags around this tile equals the count of mines it has, force a neighbour reveal
    if (this.neighboursFlags(event.coordinates.x, event.coordinates.y) === tile.count) {
      if (this.forceRevealNeighbours(event.coordinates.x, event.coordinates.y)) {
        // Bomb was revealed, detonate the board, game over.
        this._tiles.forEach(t => {
          t.state = t.mine ? 'DETONATED' : 'REVEALED';
        });
        // Set the game as loss
        this.gameObservable.update({ state: 'LOSS' });
      } else {
        // No bombs found, check for win condition
        if (this.completed) {
          // Set the game as won
          this.gameObservable.update({ state: 'WON' });
        }
      }

      // Update the board
      this.updateBoard();
    }
  }

  private hasMine(x: number, y: number): boolean {
    return this._tiles.some(tile => tile.x === x && tile.y === y && tile.mine);
  }

  private getTile(x: number, y: number): Tile {
    return this._tiles.find((tile, index) => tile.x === x && tile.y === y);
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

  private neighboursFlags(x: number, y: number): number {
    return this.getNeighbours(x, y).filter(n => n.state === 'FLAG').length;
  }

  private forceRevealNeighbours(x: number, y: number): boolean {
    const neighbours = this.getNeighbours(x, y);

    let boom = false;
    neighbours.forEach(n => {
      if (n.state !== 'FLAG') {
        if (n.mine) {
          n.state = 'DETONATED';
          boom = true;
        } else {
          n.state = 'REVEALED';

          if (n.count === 0) {
            this.revealNeighbours(n);
          }
        }
      }
    });

    return boom;
  }

  private revealNeighbours(tile) {
    // The tile pressed is count !== 0
    if (tile.count !== 0) {
      throw new Error('Tried to reveal a tile with mine count > 0.');
    }

    const neighbours = this.getNeighbours(tile.x, tile.y);

    const spreadTiles = neighbours.filter(n => n.count === 0 && n.state === 'ACTIVE');
    const endTiles = neighbours.filter(n => n.count !== 0 && n.state === 'ACTIVE');

    // Reveal the end Tiles
    endTiles.forEach(t => {
      t.state = 'REVEALED';
    });

    // Spread to the other tiles
    spreadTiles.forEach(t => {
      // First reveal the actual neighbour
      t.state = 'REVEALED';
      // Then tell its neighbours to spread
      this.revealNeighbours(t);
    });
  }

  private addMine(x: number, y: number): void {
    // Switch the tile to be a mine
    const tile = this.getTile(x, y);
    tile.mine = true;

    // Increase the count of each neighbour by 1
    this.getNeighbours(x, y)
      .forEach(n => {
        if (!n.mine) {
          n.count++;
        }
      });
  }

  private reveal(x: number, y: number): void {
    // Find the tile
    const tile = this.getTile(x, y);
    // Reveal the tile
    tile.state = 'REVEALED';

    // Then if 0 trigger the reveal around it
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
      t.state = 'REVEALED';
    });

    // Spread to the other tiles
    spreadTiles.forEach(t => {
      // First reveal the actual neighbour
      t.state = 'REVEALED';
      // Then tell its neighbours to spread
      this.revealAround(t);
    });
  }

  private randomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  private randomizeBombs(exceptCoordinates: Coordinates): void {
    // Randomize the mine locations, avoid the tile we just clicked on
    for (let mines = 0; mines < this._game.mines; mines++) {
      let foundEmptySpot = false;
      while (!foundEmptySpot) {
        const x = this.randomNumber(0, this._game.rows - 1);
        const y = this.randomNumber(0, this._game.columns - 1);

        if (exceptCoordinates.x !== x && exceptCoordinates.y !== y && !this.hasMine(x, y)) {
          // Add the mine to the board
          this.addMine(x, y);
          foundEmptySpot = true;
        }
      }
    }
  }


  private updateBoard(): void {
    this.ngFire.database.object(this.boardRef)
      .update(this.boardService.to(this.tiles, this._game.columns));
  }
}
