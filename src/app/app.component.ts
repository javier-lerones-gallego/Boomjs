import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from './reducers';
import { GameActions } from './actions/game';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(private store: Store<AppState>,
    private gameActions: GameActions) {

  }

  easy() {
    // Create a new Easy game
    this.store.dispatch(this.gameActions.newEasy());
  }

  medium() {
    // Create a new Medium game

  }

  expert() {
    // Create a new Expert game

  }
}
