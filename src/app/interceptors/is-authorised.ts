import { AuthenticationService } from '../services/authentication/authentication.service';
import { CanActivate, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { UserService } from '../services/user/user.service';

@Injectable()
export class IsAuthorised implements CanActivate {
  constructor(
    private userService: UserService,
    private authenticationService: AuthenticationService,
    private router: Router) { }

  async canActivate() {
    try {
      const user = await this.userService.getUserInformation().toPromise();
      this.userService.userInformation.next(user);
      this.authenticationService.isAuthenticated.next(true);

      return true;
    } catch {
      this.router.navigate(['login']);
      this.authenticationService.isAuthenticated.next(false);

      return false;
    }
  }
}
