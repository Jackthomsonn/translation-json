import { Component, OnInit } from '@angular/core';
import { ErrorService } from '../../services/error/error.service';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.scss']
})

export class ErrorComponent implements OnInit {
  public error: any;

  constructor(private errorService: ErrorService) { }

  public closeDialog = () => {
    this.errorService.exceptionCaught.next(undefined);
  }

  ngOnInit() {
    this.errorService.exceptionCaught.subscribe(error => {
      this.error = error;
    });
  }
}
