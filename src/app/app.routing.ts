import { Routes, RouterModule }   from '@angular/router';

import { MyGamesComponent } from './my-games/my-games.component';
import { MeComponent } from './me/me.component';
import { GameComponent } from './game/game.component';
import { NewGameComponent } from './new-game/new-game.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';


const appRoutes: Routes = [
  { path: '', component: MyGamesComponent, data: { title: 'BoomJS'} },
  { path: 'new/:difficulty', component: NewGameComponent, data: { title: 'New Game' } },
  { path: 'game/:id', component: GameComponent, data: { title: 'Game' }  },
  { path: 'me', component: MeComponent, data: { title: 'Me' }  },
  { path: '**', component: PageNotFoundComponent, data: { title: 'Not Found' }  }
];

export const appRoutingProviders: any[] = [

];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
