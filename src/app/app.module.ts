import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { routing, appRoutingProviders } from './app.routing';

import * as firebase from 'firebase';
import { AngularFireModule } from 'angularfire2';

import services from './services';

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
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

// Must export the config
export const firebaseConfig = {
    apiKey: 'AIzaSyAbzHwkEl8UBu6A42XzfN_WmietUOc5AXE',
    authDomain: 'boomjs-5abad.firebaseapp.com',
    databaseURL: 'https://boomjs-5abad.firebaseio.com',
    storageBucket: 'boomjs-5abad.appspot.com'
};

@NgModule({
  declarations: [
    AppComponent,
    MyGamesComponent,
    MeComponent,
    GameComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,

    AngularFireModule.initializeApp(firebaseConfig),
    MdButtonModule, MdCardModule, MdIconModule, MdToolbarModule, MdSidenavModule, MdListModule,

    routing
  ],
  providers: [MdIconRegistry, appRoutingProviders, services],
  bootstrap: [AppComponent]
})
export class AppModule { }
