import { Routes, RouterModule }   from '@angular/router';

import { MyGamesComponent } from './components/my-games/my-games.component';
import { MeComponent } from './components/me/me.component';
import { GameComponent } from './components/game/game.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';

const appRoutes: Routes = [
  { path: '', component: MyGamesComponent, data: { title: 'BoomJS'} },
  { path: 'game/:id', component: GameComponent, data: { title: 'Game' }  },
  { path: 'me', component: MeComponent, data: { title: 'Me' }  },
  { path: '**', component: PageNotFoundComponent, data: { title: 'Not Found' }  }
];

export const routing = RouterModule.forRoot(appRoutes);
