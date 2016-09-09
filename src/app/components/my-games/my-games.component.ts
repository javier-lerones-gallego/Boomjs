import { Component, OnInit } from '@angular/core';

import { FirebaseListObservable } from 'angularfire2';
import { Game } from '../../models';
import { GamesService } from '../../services/games.service';
import { Router }   from '@angular/router';

@Component({
  selector: 'my-games',
  templateUrl: './my-games.component.html',
  styleUrls: ['./my-games.component.scss'],
  providers: [GamesService]
})
export class MyGamesComponent implements OnInit {
  constructor(
    private gamesService: GamesService,
    private router: Router) { }

  games: FirebaseListObservable<Game[]>;

  ngOnInit() {
    this.games = this.gamesService.games;
  }

  go(game: any): void {
    this.router.navigate(['/game', game.$key]);
  }
}
