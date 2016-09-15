import { Injectable } from '@angular/core';
import {
    CanActivate, Router,
    ActivatedRouteSnapshot,
    RouterStateSnapshot
} from '@angular/router';
import { AngularFire } from 'angularfire2';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(
        private angularFire: AngularFire,
        private router: Router) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
        return this.angularFire.auth
            .take(1)
            .map(auth => {
                if (!auth) {
                    this.angularFire.auth.login();
                    return true;
                }
                return !!auth;
            });
    }
}
