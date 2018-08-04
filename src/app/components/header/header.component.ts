import { takeUntil } from 'rxjs/internal/operators';
import { HeaderService } from '../../services/header/header.service';
import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../base.component';
import { IHeaderOptions } from '../../interfaces/IHeaderOptions';
import { IBreadcrumb } from '../../interfaces/IBreadcrumb';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})

export class HeaderComponent extends BaseComponent implements OnInit {
  public breadcrumbs: IBreadcrumb[];

  constructor(private headerService: HeaderService) {
    super();
  }

  ngOnInit() {
    this.headerService.setup.pipe(takeUntil(this.destroyed$)).subscribe((options: IHeaderOptions) => {
      if (options) {
        this.breadcrumbs = options.breadcrumbs;
      }
    });
  }
}
