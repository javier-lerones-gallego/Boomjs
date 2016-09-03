// Import angular
import * as angular from 'angular';

// Import moment to make it an angular constant
import * as moment from 'moment';

// Import angular material
import * as ngMaterial from 'angular-material';

// Import uiRouter
import * as ngRouter from 'angular-ui-router';

// Import the styles
import '../index.scss';

// Import Angular config files
import Config from './config';
import Run from './run';

// Import Components
import { AppComponent } from './components/app/app.component';
import { HeaderComponent } from './components/header/header.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { HomeComponent } from './components/home/home.component';
import { MyGamesComponent } from './components/my-games/my-games.component';
import { GameComponent } from './components/game/game.component';
import { GameStatsComponent } from './components/game-stats/game-stats.component';
import { BoardComponent } from './components/board/board.component';
import { FlagCountComponent } from './components/flag-count/flag-count.component';
import { GameTimerComponent } from './components/game-timer/game-timer.component';
import { TileComponent } from './components/tile/tile.component';
import { MeComponent } from './components/me/me.component';
import { DefeatComponent } from './components/defeat/defeat.component';
import { NewGameButtonComponent } from './components/new-game-button/new-game-button.component';
import { SuccessComponent } from './components/success/success.component';
import { FireworksComponent } from './components/fireworks/fireworks.component';

// Import Services
import GameService from './services/game.service';
import LogService from './services/log.service';
import UtilsService from './services/utils.service';

// Import Filters
import StartFromFilter from './filters/startfrom.filter';

// Import Model Factories
import Game from './models/game.model';
import Board from './models/board.model';
import Tile from './models/tile.model';

// Declare the angular app name
const appName = 'com.javierlerones.boomjs';

// The main angular app
const app = angular.module(appName, [
    'ui.router',
    ngMaterial
]);

// Configure the Angular App
app.config(Config);
app.run(Run);

// Components
app.component(AppComponent.name, AppComponent);
app.component(HeaderComponent.name, HeaderComponent);
app.component(SidenavComponent.name, SidenavComponent);
app.component(HomeComponent.name, HomeComponent);
app.component(MyGamesComponent.name, MyGamesComponent);
app.component(GameComponent.name, GameComponent);
app.component(GameStatsComponent.name, GameStatsComponent);
app.component(BoardComponent.name, BoardComponent);
app.component(FlagCountComponent.name, FlagCountComponent);
app.component(GameTimerComponent.name, GameTimerComponent);
app.component(TileComponent.name, TileComponent);
app.component(MeComponent.name, MeComponent);
app.component(DefeatComponent.name, DefeatComponent);
app.component(NewGameButtonComponent.name, NewGameButtonComponent);
app.component(SuccessComponent.name, SuccessComponent);
app.component(FireworksComponent.name, FireworksComponent);

// Filters
app.filter(StartFromFilter.name, StartFromFilter);

// Services
app.service(GameService.name, GameService);
app.service(LogService.name, LogService);
app.service(UtilsService.name, UtilsService);

// Factories/Models
app.factory('Game', Game);
app.factory('Board', Board);
app.factory('Tile', Tile);

// Constants

// Bootstrap the Angular app when the document is readyeslint
angular.element(document).ready(() => {
    angular.bootstrap(document, [appName]);
});
