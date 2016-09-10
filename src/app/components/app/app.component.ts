import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute }   from '@angular/router';
import { AngularFire, AuthProviders, AuthMethods } from 'angularfire2';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  private photoURL: string = '';

  constructor(
    private ngFire: AngularFire,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit() {
    // Subscribe to Firebase auth to get the google profile
    this.ngFire.auth.subscribe(auth => {
      // Change the icon in the header with the google photo
      this.photoURL = auth.google.photoURL;
    });

    // BUG: This doesn't seem to work yet. data is empty.
    this.route.data.subscribe(data => {
      // console.log('data route updated', data);
    });
  }

  get photo(): string { return this.photoURL; }

  home(): void {
    this.router.navigate(['/']);
  }

  me(): void {
    this.router.navigate(['/me']);
  }

  login() {
    this.ngFire.auth.login({
      provider: AuthProviders.Google,
      method: AuthMethods.Popup
    });
  }

}
