import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GamesFilterService } from '../../services';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(
    private gamesFilterService: GamesFilterService,
    private router: Router) { }

  ngOnInit() {

  }

  active() {
    this.gamesFilterService.filter.next();
  }

  won() {
    this.gamesFilterService.filter.next('WON');
  }

  loss() {
    this.gamesFilterService.filter.next('LOSS');
  }

}
