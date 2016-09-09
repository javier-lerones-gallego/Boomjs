import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {
  private _tiles = [];

  constructor() { }

  get tiles(): Array<any> { return this._tiles; }

  ngOnInit() {
    for (let i = 0; i < 81; i++) {
      this._tiles.push(i);
    }
  }

}
