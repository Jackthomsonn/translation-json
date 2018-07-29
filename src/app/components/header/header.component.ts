import { HeaderService } from '../../services/header/header.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})

export class HeaderComponent implements OnInit {
  public breadcrumbs: string;

  constructor(private headerService: HeaderService) { }

  ngOnInit() {
    this.headerService.setup.subscribe((options: any) => {
      this.breadcrumbs = options.breadcrumbs;
    });
  }
}
