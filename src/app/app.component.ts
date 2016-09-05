import { Component } from '@angular/core';
import { GamesService } from './services/games.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [GamesService]
})
export class AppComponent {
  constructor(private gamesService: GamesService) {}

  easy() {
    // Create a new Easy game
    this.gamesService.easy()
      .then(() => {
        // After creating the game, go to it
      });
  }

  medium() {
    // Create a new Medium game
    this.gamesService.medium()
      .then(() => {
        // After creating the game, go to it
      });
  }

  expert() {
    // Create a new Expert game
    this.gamesService.expert()
      .then(() => {
        // After creating the game, go to it
      });
  }
}
