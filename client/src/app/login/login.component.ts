import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

import { AuthenticationService } from '@shared/authentication/authentication.service';
import * as Global from '@shared/global/global';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
  ],
})
export class LoginComponent implements OnInit {
  public formData!: { [key: string]: any };
  public loginForm!: FormGroup;
  public error!: string;
  public authenticationService = inject(AuthenticationService);
  public router = inject(Router);

  public ngOnInit(): void {
    this.init();
  }

  public init(): void {
    this.buildForm();
  }

  public onError(data: { [key: string]: any }): void {
    this.formData = null as any;
  }

  public onValid(data: { [key: string]: any }): void {
    this.formData = data;
  }

  public toggleStayConnected(): void {
    const stayLogged = this.formData?.stayLogged;
    this.loginForm.get('stayLogged')?.setValue(!stayLogged);
  }

  public navigateBack(): void {
    this.navigateHome();
  }

  public async onSubmit(): Promise<void> {
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

  public navigateHome(): void {
    this.router.navigate(['/']);
  }

  /*-----------------------*\
           Service
  \*-----------------------*/

  public async login(options: { username: string, password: string, stayLogged: boolean }): Promise<void> {
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

  public buildForm(): void {
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
