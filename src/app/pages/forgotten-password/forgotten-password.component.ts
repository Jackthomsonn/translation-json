import { Router } from '@angular/router';
import { takeUntil } from 'rxjs/internal/operators';
import { LoadingService } from './../../services/loading/loading.service';
import { AuthenticationService } from './../../services/authentication/authentication.service';
import { Component } from '@angular/core';
import { BaseComponent } from '../../components/base.component';

@Component({
  selector: 'app-forgotten-password',
  templateUrl: './forgotten-password.component.html',
  styleUrls: ['./forgotten-password.component.scss']
})

export class ForgottenPasswordComponent extends BaseComponent {
  public loginDetails = {
    email: undefined
  };

  constructor(
    private authenticationService: AuthenticationService,
    private loadingService: LoadingService,
    private router: Router) {
    super();
  }

  public setNewPassword = () => {
    this.loadingService.isLoading.next(true);

    this.authenticationService.resetPassword(this.loginDetails).pipe(takeUntil(this.destroyed$)).subscribe(() => {
      this.router.navigate(['login']);
      this.loadingService.isLoading.next(false);
    });
  }
}
