import { Component, OnInit } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { Game } from '../../models';
import { Router, ActivatedRoute }   from '@angular/router';
import { RouteNameService, GamesFilterService } from '../../services';

@Component({
  selector: 'games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.scss']
})
export class GamesComponent implements OnInit {
  constructor(private ngFire: AngularFire,
    private routeNameService: RouteNameService,
    private gamesFilterService: GamesFilterService,
    private router: Router,
    private route: ActivatedRoute) { }

  games: FirebaseListObservable<Game[]>;

  ngOnInit() {
    // Subscribe to Firebase auth to get the google profile
    this.ngFire.auth.subscribe(auth => {
      // Get the auth id
      this.games = this.ngFire.database.list('games'.concat('/', auth.uid), {
        query: {
          orderByChild: 'state',
          equalTo: this.gamesFilterService.filter,
        },
      });
    });

    // Change the header title
    this.route.data.forEach(data => {
      this.routeNameService.name.next(data['title']);
    });
  }

  go(game: any): void {
    this.router.navigate(['/game', game.$key]);
  }
}
