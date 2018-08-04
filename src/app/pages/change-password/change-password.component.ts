import { takeUntil } from 'rxjs/internal/operators';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { LoadingService } from '../../services/loading/loading.service';
import { AuthenticationService } from '../../services/authentication/authentication.service';
import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../../components/base.component';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})

export class ChangePasswordComponent extends BaseComponent implements OnInit {
  public details = {
    email: undefined,
    password: undefined
  };

  constructor(
    private authenticationService: AuthenticationService,
    private loadingService: LoadingService,
    private route: ActivatedRoute) {
    super();
  }

  public resetPassword = () => {
    this.loadingService.isLoading.next(true);

    this.authenticationService.updatePassword(this.details).pipe(takeUntil(this.destroyed$)).subscribe(() => {
      this.loadingService.isLoading.next(false);
    });
  }

  ngOnInit() {
    const queryParams: ParamMap = this.route.snapshot.queryParamMap;
    this.details.email = queryParams.get('q').split('=').pop();
  }
}
