import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  private user;

  constructor(private router: Router, private auth: AuthService) {
    auth.userObservable.subscribe(
      (user) => {
        this.user = user;
      },
      (err) => {
        console.error(err);
      }
    );
  }

  /* tslint:disable:max-line-length */
  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (!this.user) {
      this.router.navigate(['login']);
      return false;
    }

    return true;
  }
}
