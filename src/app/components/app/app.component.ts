import { Component, OnInit } from '@angular/core';
import { GamesService } from '../../services/games.service';
import { Router }   from '@angular/router';
import { AngularFire, AuthProviders, AuthMethods } from 'angularfire2';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(
    private ngFire: AngularFire,
    private gamesService: GamesService,
    private router: Router) { }

  ngOnInit() {
    this.ngFire.auth.subscribe(auth => console.log(auth));
  }

  login() {
    this.ngFire.auth.login({
      provider: AuthProviders.Google,
      method: AuthMethods.Popup
    });
  }

  easy() {
    // Create a new Easy game
    this.gamesService.easy()
      .then(game => {
        // After creating the game, go to it
        this.router.navigate(['/game', game.key]);
      });
  }

  medium() {
    // Create a new Medium game
    this.gamesService.medium()
      .then(game => {
        // After creating the game, go to it
        this.router.navigate(['/game', game.key]);
      });
  }

  expert() {
    // Create a new Expert game
    this.gamesService.expert()
      .then(game => {
        // After creating the game, go to it
        this.router.navigate(['/game', game.key]);
      });
  }
}
