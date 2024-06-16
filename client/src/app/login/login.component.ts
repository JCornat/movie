import { ChangeDetectionStrategy, Component, inject, signal, WritableSignal } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { startWith } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Router } from '@angular/router';

import { AuthenticationService } from '@shared/authentication/authentication.service';
import { Global } from '@shared/global/global';
import { SharedModule } from '@shared/shared.module';

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

  readonly loadingAdd = this.authenticationService.loadingAdd;
  readonly errorAdd = this.authenticationService.errorAdd;
  readonly loginForm = this.buildForm();
  readonly formData = signal<{ [key: string]: any } | null>(null);

  constructor() {
    this.subscribeForm();
  }

  //region Template
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
  //endregion

  //region Navigation
  navigateHome(): void {
    this.router.navigate(['/']);
  }
  //endregion

  //region Service
  async login(options: { username: string, password: string, stayLogged: boolean }): Promise<void> {
    return await this.authenticationService.login(options);
  }
  //endregion

  //region Method
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
  //endregion

  //region Subscribe
  subscribeForm(): void {
    this.loginForm().valueChanges
      .pipe(
        takeUntilDestroyed(),
        startWith({ stayLogged: true }),
      )
      .subscribe((data) => {
        this.onValid(data);
      });
  }
  //endregion
}
