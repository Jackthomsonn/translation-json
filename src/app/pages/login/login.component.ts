import { takeUntil } from 'rxjs/internal/operators';
import { Router } from '@angular/router';
import { AuthenticationService } from './../../services/authentication/authentication.service';
import { Component } from '@angular/core';
import { BaseComponent } from '../../components/base.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent extends BaseComponent {
  public loginDetails = {
    username: undefined,
    password: undefined
  };

  constructor(private authenticationService: AuthenticationService, private router: Router) {
    super();
  }

  public login = () => {
    this.authenticationService.login(this.loginDetails).pipe(takeUntil(this.destroyed$)).subscribe(() => {
      this.router.navigate(['projects']);
    });
  }
}
