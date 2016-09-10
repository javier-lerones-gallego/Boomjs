import { Component, OnInit } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { Game } from '../../models';
import { Router }   from '@angular/router';

@Component({
  selector: 'my-games',
  templateUrl: './my-games.component.html',
  styleUrls: ['./my-games.component.scss']
})
export class MyGamesComponent implements OnInit {
  constructor(private ngFire: AngularFire,
    private router: Router) { }

  games: FirebaseListObservable<Game[]>;

  ngOnInit() {
    this.games = this.ngFire.database.list('games', {
      query: { orderByChild: 'created' }
    });
  }

  go(game: any): void {
    this.router.navigate(['/game', game.$key]);
  }
}
