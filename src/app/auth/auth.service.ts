import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { Utils } from '../core/utils';

@Injectable()
export class AuthService {
  private userSubject: BehaviorSubject<any> = new BehaviorSubject(Utils.getLocalStorageItem('user'));
  public userObservable = this.userSubject.asObservable();

  constructor() {
  }

  public login(user) {
    Utils.setLocalStorageItem('user', user);
    this.userSubject.next(user);
  }

  public logout() {
    Utils.setLocalStorageItem('user', '');
    this.userSubject.next(null);
  }

  public signup(user) {
    Utils.setLocalStorageItem('user', user);
    this.userSubject.next(user);
  }
}
