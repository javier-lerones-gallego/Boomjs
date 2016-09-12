import { Routes, RouterModule }   from '@angular/router';

import { GamesComponent } from './components/games/games.component';
import { MeComponent } from './components/me/me.component';
import { GameComponent } from './components/game/game.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';

const appRoutes: Routes = [
  { path: '', redirectTo: 'games', pathMatch: 'full' },
  { path: 'games', component: GamesComponent, data: { title: 'My Games'} },
  { path: 'game/:id', component: GameComponent, data: { title: 'Game' }  },
  { path: 'me', component: MeComponent, data: { title: 'Profile' }  },
  { path: '**', component: PageNotFoundComponent, data: { title: 'Not Found' }  }
];

const routing = RouterModule.forRoot(appRoutes);
export default routing;
