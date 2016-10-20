import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

// Import shortcuts
import Components, { AppComponent } from './components';
import Routing from './routing';
import Services from './services';
import Guards from './guards';
import Pipes from './pipes';

/* tslint:disable */
import * as firebase from 'firebase';
/* tslint:enable */

// Slim Loading Bar
import { SlimLoadingBarService, SlimLoadingBarComponent } from 'ng2-slim-loading-bar';

// AngularFire/Firebase
import { AngularFireModule, AuthProviders, AuthMethods } from 'angularfire2';

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
    Components,
    Pipes,
    SlimLoadingBarComponent
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(firebaseConfig, firebaseAuthConfig),
    Routing
  ],
  providers: [ Services, SlimLoadingBarService, Guards ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
