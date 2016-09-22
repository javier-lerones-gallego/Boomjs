import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'boom-tile',
  templateUrl: './tile.component.html',
  styleUrls: ['./tile.component.scss']
})
export class TileComponent {
  @Input('key') key: string;
  @Input('x') x: number;
  @Input('y') y: number;
  @Input('mine') mine: boolean;
  @Input('count') count: number;

  @Output() change = new EventEmitter();
  @Output() reveal = new EventEmitter();
  @Output() detonate = new EventEmitter();
  @Output() pressed = new EventEmitter();

  constructor() { }

  get color(): string {
    return 'active';
    // switch (this.state) {
    //   case 'FLAG':
    //   case 'DETONATED':
    //     return 'flagged';
    //   case 'UNKNOWN':
    //     return 'unknown';
    //   default:
    //     return 'active';
    // }
  }

  click(event: MouseEvent) {
    // Do this only if left click, ignore the middle mouse
    if (event.button === 0) {
      // Trigger click before anything else if it is the first click
      this.pressed.emit({ key: this.key, coordinates: { x: this.x, y: this.y }});

      // If active and not a mine
      //  reveal the tile
      // if (this.state === 'ACTIVE' && !this.mine) {
      //   this.reveal.emit({ key: this.key, coordinates: { x: this.x, y: this.y } });
      // }

      // If active and a mine
      //  detonate the tile
      // if (this.state === 'ACTIVE' && this.mine) {
      //   this.detonate.emit({ key: this.key, coordinates: { x: this.x, y: this.y } });
      // }
    }
  }

  rightClick(event: MouseEvent) {
      // if (this.state !== 'REVEALED') {
      //   this.toggleState();
      // }
  }


  // private toggleState(): void {
  //   switch (this.state) {
  //     case 'ACTIVE':
  //       this.change.emit({ key: this.key, value: 'FLAG' });
  //       break;
  //     case 'FLAG':
  //       this.change.emit({ key: this.key, value: 'UNKNOWN' });
  //       break;
  //     case 'UNKNOWN':
  //       this.change.emit({ key: this.key, value: 'ACTIVE' });
  //       break;
  //   }
  // }

}
