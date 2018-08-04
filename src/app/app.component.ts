import { AuthenticationService } from './services/authentication/authentication.service';
import { SocketService } from './services/socket/socket.service';
import { LoadingService } from './services/loading/loading.service';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ErrorService } from './services/error/error.service';
import { BaseComponent } from './components/base.component';
import { takeUntil } from 'rxjs/internal/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent extends BaseComponent implements OnInit {
  public isLoading: boolean;
  public showError: boolean;
  public isAuthenticated: boolean;

  constructor(
    private loadingService: LoadingService,
    private authenticationService: AuthenticationService,
    private errorService: ErrorService,
    private cdRef: ChangeDetectorRef,
    private socketService: SocketService) {
    super();
  }

  ngOnInit() {
    this.loadingService.isLoading.pipe(takeUntil(this.destroyed$)).subscribe(isLoading => {
      this.isLoading = isLoading;

      this.cdRef.detectChanges();
    });

    this.errorService.exceptionCaught.pipe(takeUntil(this.destroyed$)).subscribe(error => {
      if (error) {
        this.showError = true;
      } else {
        this.showError = false;
      }
    });

    this.authenticationService.isAuthenticated.subscribe(isAuthenticated => {
      this.isAuthenticated = isAuthenticated;
    });

    this.cdRef.detectChanges();

    this.socketService.connect();
  }
}
