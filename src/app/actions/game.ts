import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Game } from '../models';

/**
 * Instead of passing around action string constants and manually recreating
 * action objects at the point of dispatch, we create services encapsulating
 * each appropriate action group. Action types are included as static
 * members and kept next to their action creator. This promotes a
 * uniform interface and single import for appropriate actions
 * within your application components.
 */
@Injectable()
export class GameActions {
  static LOAD_COLLECTION = '[Game] Load Collection';
  loadCollection(): Action {
    return {
      type: GameActions.LOAD_COLLECTION
    };
  }

  static LOAD_COLLECTION_SUCCESS = '[Game] Load Collection Success';
  loadCollectionSuccess(games: Game[]): Action {
    return {
      type: GameActions.LOAD_COLLECTION_SUCCESS,
      payload: games
    };
  }

  static LOAD_GAME = '[Game] Load Game';
  loadGame(game: Game): Action {
    return {
      type: GameActions.LOAD_GAME,
      payload: game
    };
  }

  static NEW_EASY = '[Game] New Easy';
  newEasy(): Action {
    return {
      type: GameActions.NEW_EASY,
      payload: {}
    };
  }
}
