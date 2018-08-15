import { Component, OnInit, HostBinding } from '@angular/core';
import { Location } from '@angular/common';
import { NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { Metrika } from 'ng-yandex-metrika';

import 'rxjs/add/operator/filter';

import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {
  @HostBinding('class.header-visible') public user;

  private routerSubscription: Subscription;

  constructor(
    private auth: AuthService,
    private metrika: Metrika,
    private router: Router,
    private location: Location,
  ) {
  }

  ngOnInit() {
    this.auth.userObservable.subscribe(
      (user) => {
        this.user = user;
      },
      (err) => {
        console.error(err);
      }
    );

    let prevPath = this.location.path();
    this.routerSubscription = this.router.events
      .filter(event => (event instanceof NavigationEnd))
      .subscribe((event) => {
        const newPath = this.location.path();
        this.metrika.hit(newPath, {
          referer: prevPath,
        });
        prevPath = newPath;
      });
  }
}
