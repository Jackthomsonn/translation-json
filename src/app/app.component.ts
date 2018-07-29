import { SocketService } from './services/socket/socket.service';
import { LoadingService } from './services/loading/loading.service';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ErrorService } from './services/error/error.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {
  public isLoading: boolean;
  public showError: boolean;

  constructor(
    private loadingService: LoadingService,
    private errorService: ErrorService,
    private cdRef: ChangeDetectorRef,
    private socketService: SocketService) { }

  ngOnInit() {
    this.loadingService.isLoading.subscribe(isLoading => {
      this.isLoading = isLoading;

      this.cdRef.detectChanges();
    });

    this.errorService.exceptionCaught.subscribe(error => {
      if (error) {
        this.showError = true;
      } else {
        this.showError = false;
      }
    });

    this.socketService.connect();
  }
}
