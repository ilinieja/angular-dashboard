import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { Utils } from '../utils';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  public user;
  private userSubscription: Subscription;

  constructor(private authService: AuthService,
              private router: Router) {
  }

  ngOnInit() {
    this.userSubscription = this.authService.userObservable.subscribe(
      (user) => {
        if (!user) {
          this.router.navigate(['login']);
          return;
        }

        this.user = user;
      },
      (err) => {
        console.error(err);
      }
    );
  }

  ngOnDestroy() {
    Utils.safeUnsubscribe(this.userSubscription);
  }

  public logout(): void {
    this.authService.logout();
  }
}
