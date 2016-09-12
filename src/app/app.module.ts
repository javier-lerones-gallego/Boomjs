import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import routing from './app.routing';
import services from './services';

/* tslint:disable */
import * as firebase from 'firebase';
/* tslint:enable */

import { AngularFireModule, AuthProviders, AuthMethods } from 'angularfire2';

import { AppComponent } from './components/app/app.component';
import { GamesComponent } from './components/games/games.component';
import { MeComponent } from './components/me/me.component';
import { GameComponent } from './components/game/game.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { TileComponent } from './components/tile/tile.component';
import { NewGameFabComponent } from './components/new-game-fab/new-game-fab.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { TitleCasePipe } from './pipes/title-case.pipe';

// Must export the config
export const firebaseConfig = {
    apiKey: 'AIzaSyAbzHwkEl8UBu6A42XzfN_WmietUOc5AXE',
    authDomain: 'boomjs-5abad.firebaseapp.com',
    databaseURL: 'https://boomjs-5abad.firebaseio.com',
    storageBucket: 'boomjs-5abad.appspot.com'
};

export const firebaseAuthConfig = {
  provider: AuthProviders.Google,
  method: AuthMethods.Redirect
};

@NgModule({
  declarations: [
    AppComponent,
    GamesComponent,
    MeComponent,
    GameComponent,
    PageNotFoundComponent,
    TileComponent,
    TitleCasePipe,
    NewGameFabComponent,
    ToolbarComponent
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(firebaseConfig, firebaseAuthConfig),
    routing
  ],
  providers: [services],
  bootstrap: [AppComponent]
})
export class AppModule { }
