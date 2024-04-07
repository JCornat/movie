import { ChangeDetectionStrategy, Component, inject, signal, WritableSignal } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SharedModule } from '@shared/shared.module';
import { AuthenticationService, LoginPayload } from '@shared/authentication/authentication.service';
import { catchError } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { of, tap } from 'rxjs';

type LoginForm = {
  username: FormControl<string>;
  password: FormControl<string>;
  stayLogged: FormControl<boolean>;
};

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [SharedModule],
})
export class LoginComponent {
  readonly loginForm = this.buildForm();
  readonly error: WritableSignal<any> = signal(null);
  private readonly authenticationService = inject(AuthenticationService);
  private readonly router = inject(Router);

  onSubmit() {
    this.error.set(null);
    const options: LoginPayload = {
      username: this.loginForm.controls.username.value,
      password: this.loginForm.controls.password.value,
      stayLogged: this.loginForm.controls.stayLogged.value,
    };

    this.authenticationService.login(options).pipe(
      tap(() => {
        this.navigateBack();
      }),
      catchError((err: HttpErrorResponse) => {
        this.error.set(err.error);
        return of(null);
      }),
    ).subscribe();
  }

  /*-----------------------*\
           Navigation
  \*-----------------------*/

  navigateBack(): void {
    this.router.navigate(['/']);
  }

  /*-----------------------*\
            Method
  \*-----------------------*/

  private buildForm(): FormGroup<LoginForm> {
    return new FormGroup<LoginForm>({
      username: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
      password: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
      stayLogged: new FormControl(true, { nonNullable: true }),
    });
  }
}
