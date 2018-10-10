import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user/user.service';
import { BaseComponent } from '../base.component';
import { takeUntil } from 'rxjs/operators';
import { IUser } from 'src/app/interfaces/IUser';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})

export class SidebarComponent extends BaseComponent implements OnInit {
  public isAdmin: boolean;

  constructor(private userService: UserService) {
    super();
  }

  ngOnInit() {
    this.userService.userInformation.pipe(takeUntil(this.destroyed$)).subscribe((userInformation: IUser) => {
      if (userInformation.permissions.includes('admin')) {
        this.isAdmin = true;
      } else {
        this.isAdmin = false;
      }
    });
  }
}
