// Import the styles
import '../index.scss';

// Import angular
import angular from 'angular';

// Import uiRouter
import uiRouter from 'angular-ui-router';

// Import Angular config files
import Config from './config';
import Run from './run';

// Import main App Component
import { AppComponent } from './components/app/app.component';

// Import Components
import { HomeComponent } from './components/home/home.component';
import { HeaderComponent } from './components/header/header.component';
import { BoardComponent } from './components/board/board.component';
import { TileComponent } from './components/tile/tile.component';
import { GameComponent } from './components/game/game.component';
import { SuccessComponent } from './components/success/success.component';
import { DefeatComponent } from './components/defeat/defeat.component';
import { MyGamesComponent } from './components/my-games/my-games.component';
import { GameStatsComponent } from './components/game-stats/game-stats.component';
import { NewGameComponent } from './components/new-game/new-game.component';
import { FlagCountComponent } from './components/flag-count/flag-count.component';
import { GameTimerComponent } from './components/game-timer/game-timer.component';
import { NewGameButtonComponent } from './components/new-game-button/new-game-button.component';
import { ExplosionComponent } from './components/explosion/explosion.component';
import { FireworksComponent } from './components/fireworks/fireworks.component';

// Import Services
import GameService from './services/game.service';
import UtilsService from './services/utils.service';

// Import Filters
import StartFromFilter from './filters/startfrom.filter';

// Import Model Factories
import Game from './models/game.model';
import Board from './models/board.model';
import Tile from './models/tile.model';

// Declare the angular app name
const appName = 'com.javierlerones.boomjs';

// Set up the angular app object with its dependencies
const app = angular.module(appName, [uiRouter]);

// Configure the Angular App
app.config(Config);
app.run(Run);

// Main app component
app.component(AppComponent.name, AppComponent);

// Components
app.component(HomeComponent.name, HomeComponent);
app.component(HeaderComponent.name, HeaderComponent);
app.component(BoardComponent.name, BoardComponent);
app.component(TileComponent.name, TileComponent);
app.component(GameComponent.name, GameComponent);
app.component(SuccessComponent.name, SuccessComponent);
app.component(DefeatComponent.name, DefeatComponent);
app.component(MyGamesComponent.name, MyGamesComponent);
app.component(GameStatsComponent.name, GameStatsComponent);
app.component(NewGameComponent.name, NewGameComponent);
app.component(FlagCountComponent.name, FlagCountComponent);
app.component(GameTimerComponent.name, GameTimerComponent);
app.component(NewGameButtonComponent.name, NewGameButtonComponent);
app.component(ExplosionComponent.name, ExplosionComponent);
app.component(FireworksComponent.name, FireworksComponent);

// Services
app.service(GameService.name, GameService);
app.service(UtilsService.name, UtilsService);

// Filters
app.filter(StartFromFilter.name, StartFromFilter.filter);

// Models
app.factory('Game', Game);
app.factory('Tile', Tile);
app.factory('Board', Board);

// Bootstrap the Angular app when the document is ready
angular.element(document).ready(() => {
    angular.bootstrap(document, [appName]);
});
