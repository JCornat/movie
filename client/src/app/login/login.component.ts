import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

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
export class LoginComponent implements OnInit {
  formData!: { [key: string]: any };
  loginForm!: FormGroup;
  error!: string;
  authenticationService = inject(AuthenticationService);
  router = inject(Router);

  ngOnInit(): void {
    this.init();
  }

  init(): void {
    this.buildForm();
  }

  onError(data: { [key: string]: any }): void {
    this.formData = null as any;
  }

  onValid(data: { [key: string]: any }): void {
    this.formData = data;
  }

  toggleStayConnected(): void {
    const stayLogged = this.formData?.stayLogged;
    this.loginForm.get('stayLogged')?.setValue(!stayLogged);
  }

  navigateBack(): void {
    this.navigateHome();
  }

  async onSubmit(): Promise<void> {
    if (Global.isEmpty(this.formData)) {
      return;
    }

    const options = {
      username: this.formData.username,
      password: this.formData.password,
      stayLogged: this.formData.stayLogged,
    };

    await this.login(options);
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
    try {
      await this.authenticationService.login(options);
    } catch (error) {
      this.error = (error as any).message;
      throw error;
    }
  }

  /*-----------------------*\
            Method
  \*-----------------------*/

  buildForm(): void {
    this.loginForm = new FormGroup({
      username: new FormControl(''),
      password: new FormControl(''),
      stayLogged: new FormControl(''),
    });

    this.loginForm.valueChanges.subscribe((data) => {
      this.onValid(data);
    });
  }
}
