import { takeUntil } from 'rxjs/internal/operators';
import { Component, OnInit } from '@angular/core';
import { ErrorService } from '../../services/error/error.service';
import { BaseComponent } from '../base.component';
import { IError } from '../../interfaces/IError';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.scss']
})

export class ErrorComponent extends BaseComponent implements OnInit {
  public error: IError;

  constructor(private errorService: ErrorService) {
    super();
  }

  public closeDialog = () => {
    this.errorService.exceptionCaught.next(undefined);
  }

  ngOnInit() {
    this.errorService.exceptionCaught.pipe(takeUntil(this.destroyed$)).subscribe(error => {
      if (!error) { return; }

      const { statusText } = error;

      this.error = {
        message: error.error.split('<pre>')[1].split('<br>')[0].split('Error: ').pop(),
        statusText: statusText
      };
    });
  }
}
