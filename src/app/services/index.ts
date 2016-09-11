import { HTTP_PROVIDERS } from '@angular/http';
import { RouteNameService } from './route-name.service';
import { GamesFilterService } from './games-filter.service';

export { RouteNameService, GamesFilterService };

export default [
  HTTP_PROVIDERS,
  RouteNameService,
  GamesFilterService,
];
