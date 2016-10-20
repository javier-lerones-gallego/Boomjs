import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Rx';

@Injectable()
export class RouteNameService {
  public name = new Subject<string>();
}
