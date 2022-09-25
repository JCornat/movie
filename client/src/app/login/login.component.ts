import { Component, OnInit } from '@angular/core';
// import { AuthenticationService } from '../authentication/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public questions!: any[];
  public formData!: { [key: string]: any } | null;

  constructor(
    // public authenticationService: AuthenticationService,
    public router: Router,
  ) {
    //
  }

  public ngOnInit(): void {
    this.init();
  }

  public init(): void {
    this.questions = [
      {
        key: 'login',
        type: 'password',
        label: 'Login',
      },
      {
        key: 'password',
        type: 'password',
        label: 'Password',
      },
      {
        key: 'stayLogged',
        type: 'checkbox',
        values: [
          {value: 'true', label: 'Rester connecté'}
        ],
      },
    ];
  }

  public onError(data: { [key: string]: any }): void {
    this.formData = null;
  }

  public onValid(data: { [key: string]: any }): void {
    this.formData = data;
  }

  public navigateHome(): void {
    this.router.navigate(['/']);
  }

  public async onSubmit(): Promise<void> {
    const options = {
      login: this.formData!.login,
      password: this.formData!.password,
      stayLogged: (this.formData!.stayLogged === 'true'),
    };

    // await this.authenticationService.login(options);
    this.navigateHome();
  }
}
