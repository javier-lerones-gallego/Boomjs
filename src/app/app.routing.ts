import { Routes, RouterModule }   from '@angular/router';

import { GamesComponent } from './components/games/games.component';
import { MeComponent } from './components/me/me.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';

import { AuthGuard } from './guards/auth.guard';

const appRoutes: Routes = [
  { path: '', redirectTo: 'games', pathMatch: 'full' },
  { path: 'games', component: GamesComponent, data: { title: 'My Games'}, canActivate: [AuthGuard] },
  { path: 'me', component: MeComponent, data: { title: 'Profile' }  },
  { path: '**', component: PageNotFoundComponent, data: { title: 'Not Found' }  }
];

const routing = RouterModule.forRoot(appRoutes);
export default routing;
