import { IUser } from './../../interfaces/IUser';
import { takeUntil } from 'rxjs/internal/operators';
import { AuthenticationService } from './../../services/authentication/authentication.service';
import { Component } from '@angular/core';
import { Router } from '../../../../node_modules/@angular/router';
import { BaseComponent } from '../../components/base.component';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})

export class RegisterComponent extends BaseComponent {
  public loginDetails: IUser = {
    username: undefined,
    password: undefined,
    email: undefined,
    phoneNumber: undefined,
    twoFactorAuthEnabled: false,
    properties: {
      team: {
        name: 'Global Team',
        link: '/teams/global'
      }
    }
  };

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router) {
    super();
  }

  public register = () => {
    this.authenticationService.register(this.loginDetails).pipe(takeUntil(this.destroyed$)).subscribe(() => {
      this.router.navigate(['login']);
    });
  }
}
