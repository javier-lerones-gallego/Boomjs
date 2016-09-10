import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AngularFire, FirebaseObjectObservable, FirebaseListObservable } from 'angularfire2';
import { Game, Tile } from '../../models';
import { TileComponent } from '../tile/tile.component';

@Component({
  selector: 'game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss'],
  directives: [TileComponent]
})
export class GameComponent implements OnInit {
  gameObservable: FirebaseObjectObservable<Game>;
  tilesObservable: FirebaseListObservable<Tile[]>;

  game: Game;
  tiles: Tile[];

  constructor(
    private ngFire: AngularFire,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit() {
    // If the params in the url change, refresh the component
    // The router only reloads the component if both route and params change
    this.route.params.subscribe(params => {
      const gameRef = 'games/'.concat(params['id']);

      // Get the game and the tiles observables
      this.gameObservable = this.ngFire.database.object(gameRef);
      this.tilesObservable = this.ngFire.database.list(gameRef.concat('/tiles'));

      // Store the data in the component
      this.gameObservable.subscribe(game => { this.game = game; });
      this.tilesObservable.subscribe(tiles => { this.tiles = tiles; });
    });
  }

  get revealed(): number { return this.tiles.filter(t => t.state === 'REVEALED').length; }
  get first(): boolean { return this.revealed === 0; }
  get flags(): number { return this.tiles.filter(t => t.state === 'FLAG').length; }
  get left(): number { return this.game.mines - this.flags; }
  get completed() {
    return this.tiles.filter(t => t.state === 'FLAG' && t.mine).length ===
      this.game.mines
      && this.revealed === this.tiles.length - this.game.mines;
  }

  tilePressed(event) {
    // If it is the first click, randomize the mines
    if (this.first) {
      // Randomize the mines on first click
      this.randomize(event.coordinates);
      // Set the game as started
      this.gameObservable.update({ state: 'STARTED' });
    }
  }

  tileStateChange(event) {
    // Update firebase
    this.tilesObservable.update(event.key, { state: event.value });

    if (this.completed) {
      // Set the game as won
      this.gameObservable.update({ state: 'WON' });
      // TODO: victory something?
    }
  }

  tileReveal(event) {
    // Update firebase
    this.tilesObservable.update(event.key, { state: 'REVEALED' });

    // Spread the reveal if possible
    this.reveal(event.coordinates.x, event.coordinates.y);

    // Check for victory
    if (this.completed) {
      // Set the game as won
      this.gameObservable.update({ state: 'WON' });
      // TODO: victory something?
    }
  }

  tileDetonate(event) {
    this.tiles.forEach(tile => {
      if (tile.mine) {
        this.tilesObservable.update(tile['$key'], { state: 'DETONATED' });
      } else {
        this.tilesObservable.update(tile['$key'], { state: 'REVEALED' });
      }
    });
    // Set the game as loss
    this.gameObservable.update({ state: 'LOSS' });
  }

  private hasMine(x: number, y: number): boolean {
    return this.tiles.some(tile => tile.x === x && tile.y === y && tile.mine);
  }

  private getTile(x: number, y: number): Tile {
    return this.tiles.filter(tile => tile.x === x && tile.y === y)[0];
  }

  private getNeighbours(i: number, j: number): Tile[] {
    const neighbours: Tile[] = [];

    for (let x = Math.max(0, i - 1); x <= Math.min(i + 1, this.game.rows - 1); x++) {
      for (let y = Math.max(0, j - 1); y <= Math.min(j + 1, this.game.columns - 1); y++) {
        if (x !== i || y !== j) {
          neighbours.push(this.getTile(x, y));
        }
      }
    }

    return neighbours;
  }

  private addMine(x: number, y: number): void {
    // Switch the tile to be a mine
    const tile = this.getTile(x, y);

    // Update the firebase
    this.tilesObservable.update(tile['$key'], { mine: true, count: 0 });

    // Increase the count of each neighbour by 1
    this.getNeighbours(x, y)
      .forEach(n => {
        // Pure functions
        const neighbour = n;
        if (!neighbour.mine) {
          this.tilesObservable.update(neighbour['$key'], { count: neighbour.count + 1 });
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
      this.tilesObservable.update(t['$key'], { state: 'REVEALED' });
    });

    // Spread to the other tiles
    spreadTiles.forEach(t => {
      // First reveal the actual neighbour
      this.tilesObservable.update(t['$key'], { state: 'REVEALED' });
      // Then tell its neighbours to spread
      this.revealAround(t);
    });
  }

  private randomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  private randomize(coordinates: any): void {
    // Randomize the mine locations, avoid the tile we just clicked on
    for (let mines = 0; mines < this.game.mines; mines++) {
      let foundEmptySpot = false;
      while (!foundEmptySpot) {
        const x = this.randomNumber(0, this.game.rows - 1);
        const y = this.randomNumber(0, this.game.columns - 1);

        if (coordinates.x !== x && coordinates.y !== y && !this.hasMine(x, y)) {
          // Add the mine to the board
          this.addMine(x, y);
          foundEmptySpot = true;
        }
      }
    }
  }
}
