import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AngularFire, AuthProviders, AuthMethods } from 'angularfire2';
import { RouteNameService } from '../../services';
import { Subscription } from 'rxjs';
import * as moment from 'moment';

@Component({
  selector: 'boom-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit, OnDestroy {
  private photoURL: string = '';
  private name: string = '';
  private routeTitle: string = '';

  private _authSubscription: Subscription;
  private _routeSubscription: Subscription;

  constructor(
    private routeNameService: RouteNameService,
    private ngFire: AngularFire,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit() {
    // Subscribe to Firebase auth to get the google profile
    this._authSubscription = this.ngFire.auth.subscribe(auth => {
      // Change the icon in the header with the google photo
      this.photoURL = auth.google.photoURL;
      this.name = auth.google.displayName;
    });

    this._routeSubscription = this.routeNameService.name.subscribe(n => this.routeTitle = n);
  }

  ngOnDestroy() {
    this._authSubscription.unsubscribe();
    this._routeSubscription.unsubscribe();
  }

  get photo(): string { return this.photoURL; }
  get now(): string { return moment().format('hh:mm A'); }

  login() {
    this.ngFire.auth.login({
      provider: AuthProviders.Google,
      method: AuthMethods.Popup
    });
  }

}
