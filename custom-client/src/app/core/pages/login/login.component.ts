import { ChangeDetectionStrategy, Component, inject, signal, WritableSignal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { Route } from '../../../app.routes';
import { AuthenticationService } from '../../services/authentication/authentication.service';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  imports: [FormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {
  public readonly username: WritableSignal<string> = signal<string>('');
  public readonly password: WritableSignal<string> = signal<string>('');

  //#region Injection
  private readonly authService: AuthenticationService = inject(AuthenticationService);
  private readonly router: Router = inject(Router);

  //#endregion

  public login(): void {
    this.authService.login(this.username(), this.password()).subscribe({
      next: async () => {
        await this.router.navigate([Route.home]);
      },
    });
  }
}
