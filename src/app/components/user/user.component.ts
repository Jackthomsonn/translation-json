import { takeUntil } from 'rxjs/internal/operators';
import { IUser } from './../../interfaces/IUser';
import { UserService } from './../../services/user/user.service';
import { AuthenticationService } from './../../services/authentication/authentication.service';
import { Component, HostListener, OnInit } from '@angular/core';
import { BaseComponent } from '../base.component';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})

export class UserComponent extends BaseComponent implements OnInit {
  public shouldShowDropdown: boolean;
  public user: IUser;

  @HostListener('click', ['$event'])
  public onClick() {
    this.shouldShowDropdown = !this.shouldShowDropdown;
  }

  constructor(private authenticationService: AuthenticationService, private userService: UserService) {
    super();
  }

  public getFirstLetter = () => {
    if (!this.user) {
      return;
    }

    return this.user.username.split('').shift();
  }

  public logout = () => {
    this.authenticationService.logout();
    this.authenticationService.isAuthenticated.next(false);
  }

  ngOnInit() {
    this.userService.userInformation.pipe(takeUntil(this.destroyed$)).subscribe(user => {
      this.user = user;
    });
  }
}
