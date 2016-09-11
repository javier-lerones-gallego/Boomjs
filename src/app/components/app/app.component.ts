import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFire, AuthProviders, AuthMethods } from 'angularfire2';
import { RouteNameService } from '../../services';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  private photoURL: string = '';
  private routeTitle: string = '';

  constructor(
    private routeNameService: RouteNameService,
    private ngFire: AngularFire,
    private router: Router) { }

  ngOnInit() {
    // Subscribe to Firebase auth to get the google profile
    this.ngFire.auth.subscribe(auth => {
      // Change the icon in the header with the google photo
      this.photoURL = auth.google.photoURL;
    });

    this.routeNameService.name.subscribe(n => this.routeTitle = n);
  }

  get photo(): string { return this.photoURL; }

  login() {
    this.ngFire.auth.login({
      provider: AuthProviders.Google,
      method: AuthMethods.Popup
    });
  }

}
