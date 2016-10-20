import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { TILE_STATE } from '../../models';

@Component({
  selector: 'boom-tile',
  templateUrl: './tile.component.html',
  styleUrls: ['./tile.component.scss']
})
export class TileComponent implements OnInit {
  @Input('x') x: number;
  @Input('y') y: number;
  @Input('mine') mine: boolean;
  @Input('count') count: number;
  @Input('state') state: TILE_STATE;

  @Output() change = new EventEmitter();
  @Output() reveal = new EventEmitter();
  @Output() detonate = new EventEmitter();
  @Output() pressed = new EventEmitter();
  @Output() spread = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  get color(): string {
    switch (this.state) {
      case 'FLAG':
      case 'DETONATED':
        return 'flagged';
      case 'UNKNOWN':
        return 'unknown';
      default:
        return 'active';
    }
  }

  // For revealed tiles, don't let the click event bubble up to the overlay
  stop(event: MouseEvent): boolean {
    event.stopPropagation();
    // Ignoring this, also helps us catch the dblCkick event instead
    return false;
  }

  dblClick(event: MouseEvent) {
    // Trigger the spread reveal if possible
    if (this.state === 'REVEALED') {
      this.spread.emit({ coordinates: { x: this.x, y: this.y }});
    }
  }

  click(event: MouseEvent): boolean {
    // First stop the bubble
    event.stopPropagation();

    // Do this only if left click, ignore the middle mouse
    if (event.button === 0) {

      // Trigger click before anything else if it is the first click
      this.pressed.emit({ coordinates: { x: this.x, y: this.y }});

      // If active and not a mine
      //  reveal the tile
      if (this.state === 'ACTIVE' && !this.mine) {
        this.reveal.emit({ coordinates: { x: this.x, y: this.y } });
      }

      // If active and a mine
      //  detonate the tile
      if (this.state === 'ACTIVE' && this.mine) {
        this.detonate.emit({ coordinates: { x: this.x, y: this.y } });
      }
    }

    return false;
  }

  rightClick(event: MouseEvent) {
      if (this.state !== 'REVEALED') {
        this.toggleState();
      }
  }


  private toggleState(): void {
    switch (this.state) {
      case 'ACTIVE':
        this.change.emit({ coordinates: { x: this.x, y: this.y }, value: 'FLAG' });
        break;
      case 'FLAG':
        this.change.emit({ coordinates: { x: this.x, y: this.y }, value: 'UNKNOWN' });
        break;
      case 'UNKNOWN':
        this.change.emit({ coordinates: { x: this.x, y: this.y }, value: 'ACTIVE' });
        break;
    }
  }

}
