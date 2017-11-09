import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

import { Utils } from '../../core/utils';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  public loginForm: FormGroup;
  public signupForm: FormGroup;
  private user;
  private userSubscription: Subscription;

  constructor(public auth: AuthService,
              private fb: FormBuilder,
              private router: Router) {
  }

  ngOnInit() {
    this.constructLoginForm();

    this.userSubscription = this.auth.userObservable.subscribe(
      (user) => {
        if (user && user.isNew) {
          this.router.navigate(['', 'profile']);
          return;
        }

        this.router.navigate(['']);
      },
      (err) => {
        console.error(err);
      }
    );
  }

  ngOnDestroy() {
    Utils.safeUnsubscribe(this.userSubscription);
  }

  public constructLoginForm() {
    this.signupForm = null;
    this.loginForm = this.fb.group({
      username: ['', [
        Validators.required,
        Validators.pattern(EMAIL_REGEX),
      ]],
      password: ['', [
        Validators.required,
      ]],
    });
  }

  public constructSignupForm() {
    this.loginForm = null;
    this.signupForm = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      username: ['', [
        Validators.required,
        Validators.pattern(EMAIL_REGEX),
      ]],
      password: ['', [Validators.required]],
    });
  }

  public onLoginSubmit() {
    this.user = LoginComponent.prepareUserDataFromForm(this.loginForm);
    this.auth.login(this.user);
  }

  public onSignupSubmit() {
    this.user = LoginComponent.prepareUserDataFromForm(this.signupForm);
    this.auth.signup(this.user);
  }

  private static prepareUserDataFromForm(form: FormGroup) {
    const formModel = form.value;

    const userData: any = {
      username: formModel.username,
      password: formModel.password,
    };

    if (formModel.firstName) {
      userData.firstName = formModel.firstName;
    }

    if (formModel.lastName) {
      userData.lastName = formModel.lastName;
    }

    return userData;
  }

}
