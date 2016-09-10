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
    // Subscribe to Firebase auth to get the google profile
    this.ngFire.auth.subscribe(auth => {
      // Get the auth id
      this.games = this.ngFire.database.list('games'.concat('/', auth.uid), {
        query: { orderByChild: 'created' }
      });
    });

  }

  go(game: any): void {
    this.router.navigate(['/game', game.$key]);
  }
}
