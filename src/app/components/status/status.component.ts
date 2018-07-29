import { Component, OnInit, Input, HostBinding } from '@angular/core';

@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.scss']
})

export class StatusComponent implements OnInit {
  public fluffyStatusName: string;
  @Input() status;

  @HostBinding('class.in_progress')
  public isInProgress: boolean;

  @HostBinding('class.complete')
  public isComplete: boolean;

  @HostBinding('class.failed')
  public failed: boolean;

  @HostBinding('class.new')
  public isNew: boolean;

  constructor() { }

  private checkStatus = () => {
    switch (this.status) {
      case 'IN_PROGRESS':
        this.isInProgress = true;
        this.fluffyStatusName = 'In progress';
        break;
      case 'COMPLETE':
        this.isComplete = true;
        this.fluffyStatusName = 'Complete';
        break;
      case 'FAILED':
        this.failed = true;
        this.fluffyStatusName = 'Failed';
        break;
      case 'NEW':
        this.isNew = true;
        this.fluffyStatusName = 'New';
        break;
      default:
        this.isInProgress = true;
        this.fluffyStatusName = 'In progress';
        break;
    }
  }

  ngOnInit() {
    this.checkStatus();
  }

}
