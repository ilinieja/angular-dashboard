import { Component, OnInit, HostBinding } from '@angular/core';

import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {
  @HostBinding('class.header-visible') public user;

  constructor(private auth: AuthService) {
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
  }
}
