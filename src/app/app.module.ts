import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { routing, appRoutingProviders } from './app.routing';

import { Store, StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { StoreLogMonitorModule, useLogMonitor } from '@ngrx/store-log-monitor';
import { gameReducer } from './game.reducer';

import { MdCardModule } from '@angular2-material/card';
import { MdButtonModule } from '@angular2-material/button';
import { MdIconModule, MdIconRegistry } from '@angular2-material/icon';
import { MdToolbarModule } from '@angular2-material/toolbar';
import { MdSidenavModule } from '@angular2-material/sidenav';
import { MdListModule } from '@angular2-material/list/list';

import { AppComponent } from './app.component';
import { MyGamesComponent } from './my-games/my-games.component';
import { MeComponent } from './me/me.component';
import { GameComponent } from './game/game.component';
import { NewGameComponent } from './new-game/new-game.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

@NgModule({
  declarations: [
    AppComponent,
    MyGamesComponent,
    MeComponent,
    GameComponent,
    NewGameComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    StoreModule.provideStore({ game: gameReducer }, { counter: 0 }),
    StoreDevtoolsModule.instrumentStore({
      monitor: useLogMonitor({
        visible: true,
        position: 'right'
      })
    }),
    StoreLogMonitorModule,
    MdButtonModule, MdCardModule, MdIconModule, MdToolbarModule, MdSidenavModule, MdListModule,
    routing
  ],
  providers: [MdIconRegistry, appRoutingProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
