import '@ngrx/core/add/operator/select';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { Action } from '@ngrx/store';

import { Game } from '../models';
import { GameActions } from '../actions';


export interface GamesState {
  ids: string[];
  entities: { [id: string]: Game };
};

const initialState: GamesState = {
  ids: [],
  entities: {}
};

export default function(state = initialState, action: Action): GamesState {
  switch (action.type) {
    case GameActions.LOAD_COLLECTION_SUCCESS:
      const games: Game[] = action.payload;
      const newGames = games.filter(game => !state.entities[game.id]);

      const newGameIds = newGames.map(game => game.id);
      const newGameEntities = newGames.reduce((entities: { [id: string]: Game }, game: Game) => {
        return Object.assign(entities, {
          [game.id]: game
        });
      }, {});

      return {
        ids: [ ...state.ids, ...newGameIds ],
        entities: Object.assign({}, state.entities, newGameEntities)
      };
    case GameActions.LOAD_GAME:
      const game: Game = action.payload;

      if (state.ids.filter(id => id === game.id)) {
        return state;
      }

      return {
        ids: [ ...state.ids, game.id ],
        entities: Object.assign({}, state.entities, {
          [game.id]: game
        })
      };
    default: {
      return state;
    }
  }
}

/**
 * Because the data structure is defined within the reducer it is optimal to
 * locate our selector functions at this level. If store is to be thought of
 * as a database, and reducers the tables, selectors can be considered the
 * queries into said database. Remember to keep your selectors small and
 * focused so they can be combined and composed to fit each particular
 * use-case.
 */
export function getGameEntities() {
  return (state$: Observable<GamesState>) => state$
    .select(s => s.entities);
};

export function getGame(id: string) {
  return (state$: Observable<GamesState>) => state$
    .select(s => s.entities[id]);
}

export function getGames(gameIds: string[]) {
  return (state$: Observable<GamesState>) => state$
    .let(getGameEntities())
    .map(entities => gameIds.map(id => entities[id]));
}

export function hasGame(id: string) {
  return (state$: Observable<GamesState>) => state$
    .select(s => s.ids.filter(i => id === i));
}
