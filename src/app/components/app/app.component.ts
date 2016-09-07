import { Component, OnInit } from '@angular/core';
import { GamesService } from '../../services/games.service';
import { Router, ActivatedRoute }   from '@angular/router';
import { AngularFire, AuthProviders, AuthMethods } from 'angularfire2';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  private photoURL: string = '';

  constructor(
    private ngFire: AngularFire,
    private gamesService: GamesService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.ngFire.auth.subscribe(auth => {
      console.log(auth);
      this.photoURL = auth.google.photoURL;
    });
  }

  get photo(): string { return this.photoURL; }
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
