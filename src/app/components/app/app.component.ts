import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { GamesFilterService } from '../../services';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewInit {

  constructor(
    private gamesFilterService: GamesFilterService,
    private router: Router) { }

  ngOnInit() {

  }

  ngAfterViewInit() {
    // Remove 'loading' class from app-root after init
    document.querySelector('app-root').classList.remove('loading');
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
