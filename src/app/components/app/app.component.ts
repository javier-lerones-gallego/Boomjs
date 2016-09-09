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
  private fabs: boolean = false;

  constructor(
    private ngFire: AngularFire,
    private gamesService: GamesService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.ngFire.auth.subscribe(auth => {
      // console.log(auth);
      this.photoURL = auth.google.photoURL;
    });

    // BUG: This doesn't seem to work yet. data is empty.
    this.route.data.subscribe(data => {
      // console.log('data route updated', data);
    });
  }

  get photo(): string { return this.photoURL; }
  get miniFabsCss(): string { return this.fabs ? 'visible' : ''; }

  home(): void {
    this.router.navigate(['/']);
  }

  me(): void {
    this.router.navigate(['/me']);
  }

  onFabMouseover(): void {
    this.fabs = true;
  }

  onFabMouseout(): void {
    this.fabs = false;
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
