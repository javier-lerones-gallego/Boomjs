import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { routing, appRoutingProviders } from './app.routing';

import * as firebase from 'firebase';
import { AngularFireModule, AuthProviders, AuthMethods } from 'angularfire2';

import services from './services';

import { MdCardModule } from '@angular2-material/card';
import { MdButtonModule } from '@angular2-material/button';
import { MdIconModule, MdIconRegistry } from '@angular2-material/icon';
import { MdToolbarModule } from '@angular2-material/toolbar';
import { MdSidenavModule } from '@angular2-material/sidenav';
import { MdListModule } from '@angular2-material/list/list';

import { AppComponent } from './components/app/app.component';
import { MyGamesComponent } from './components/my-games/my-games.component';
import { MeComponent } from './components/me/me.component';
import { GameComponent } from './components/game/game.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { TileComponent } from './components/tile/tile.component';

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
    MyGamesComponent,
    MeComponent,
    GameComponent,
    PageNotFoundComponent,
    TileComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,

    AngularFireModule.initializeApp(firebaseConfig, firebaseAuthConfig),
    MdButtonModule, MdCardModule, MdIconModule, MdToolbarModule, MdSidenavModule, MdListModule,

    routing
  ],
  providers: [MdIconRegistry, appRoutingProviders, services],
  bootstrap: [AppComponent]
})
export class AppModule { }
