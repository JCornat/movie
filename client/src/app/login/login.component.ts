import { ChangeDetectionStrategy, Component, inject, signal, WritableSignal } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { Router } from '@angular/router';

import { AuthenticationService } from '@shared/authentication/authentication.service';
import { Global } from '@shared/global/global';
import { SharedModule } from '@shared/shared.module';
import { startWith } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [SharedModule],
})
export class LoginComponent {
  authenticationService = inject(AuthenticationService);
  router = inject(Router);

  loadingAdd = this.authenticationService.loadingAdd;
  errorAdd = this.authenticationService.errorAdd;
  loginForm = this.buildForm();
  formData = signal<{ [key: string]: any } | null>(null);

  constructor() {
    this.subscribeForm();
  }

  navigateBack(): void {
    this.navigateHome();
  }

  async onSubmit(): Promise<void> {
    const data = this.formData() as { username: string, password: string, stayLogged: boolean };
    if (Global.isEmpty(data)) {
      return;
    }

    if (data.stayLogged) {
      this.authenticationService.stayLogged.set(true);
    }

    await this.login(data);
    this.navigateHome();
  }

  /*-----------------------*\
           Navigation
  \*-----------------------*/

  navigateHome(): void {
    this.router.navigate(['/']);
  }

  /*-----------------------*\
           Service
  \*-----------------------*/

  async login(options: { username: string, password: string, stayLogged: boolean }): Promise<void> {
    return await this.authenticationService.login(options);
  }

  /*-----------------------*\
            Method
  \*-----------------------*/

  buildForm(): WritableSignal<FormGroup> {
    const form = new FormGroup({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
      stayLogged: new FormControl(true),
    });

    return signal(form);
  }

  onValid(data: { [key: string]: any }): void {
    this.formData.set(data);
  }

  /*-----------------------*\
          Subscriber
  \*-----------------------*/

  subscribeForm(): void {
    this.loginForm().valueChanges
      .pipe(startWith({ stayLogged: true }))
      .subscribe((data) => {
        console.log('ok', data);
        this.onValid(data);
      });
  }
}
