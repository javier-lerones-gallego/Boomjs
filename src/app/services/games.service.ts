import 'rxjs/add/operator/map';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { Game } from '../models';

@Injectable()
export class GamesService {
  private API_PATH: string = 'https://www.googleapis.com/books/v1/volumes';

  constructor(private http: Http) {}

  search(queryTitle: string): Observable<Game[]> {
    return this.http.get(`${this.API_PATH}?q=${queryTitle}`)
      .map(res => res.json().items);
  }

  retrieve(volumeId: string): Observable<Game> {
    return this.http.get(`${this.API_PATH}/${volumeId}`)
      .map(res => res.json());
  }
}
