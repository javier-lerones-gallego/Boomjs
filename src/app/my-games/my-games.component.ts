import { Component, OnInit } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';

import { Game } from '../models/game';

@Component({
  selector: 'my-games',
  templateUrl: './my-games.component.html',
  styleUrls: ['./my-games.component.scss']
})
export class MyGamesComponent implements OnInit {
  games: FirebaseListObservable<Game[]>;

  constructor(private af: AngularFire) {

  }

  ngOnInit() {
    this.games = this.af.database.list('games');
  }

}
