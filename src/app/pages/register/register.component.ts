import { TeamService } from './../../services/team/team.service';
import { IUser } from './../../interfaces/IUser';
import { takeUntil } from 'rxjs/internal/operators';
import { AuthenticationService } from './../../services/authentication/authentication.service';
import { Component } from '@angular/core';
import { Router } from '../../../../node_modules/@angular/router';
import { BaseComponent } from '../../components/base.component';
import { ITeam } from '../../interfaces/ITeam';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})

export class RegisterComponent extends BaseComponent {
  public loginDetails: IUser = {
    username: undefined,
    password: undefined,
    email: undefined,
    phoneNumber: undefined,
    twoFactorAuthEnabled: false,
    teamId: undefined,
    properties: {
      team: {
        name: undefined,
        link: undefined
      }
    }
  };

  constructor(
    private authenticationService: AuthenticationService,
    private teamService: TeamService,
    private router: Router) {
    super();
  }

  public register = () => {
    if (this.loginDetails.teamId) {
      this.teamService.getTeam(this.loginDetails.teamId).pipe(takeUntil(this.destroyed$)).subscribe((team: ITeam) => {
        if (!team) { return; }

        this.loginDetails.properties.team = {
          name: team.name,
          link: `/teams/${team._id}`
        };

        this.authenticationService.register(this.loginDetails).pipe(takeUntil(this.destroyed$)).subscribe(() => {
          this.router.navigate(['login']);
        });
      });
    } else {
      this.authenticationService.register(this.loginDetails).pipe(takeUntil(this.destroyed$)).subscribe(() => {
        this.router.navigate(['login']);
      });
    }
  }
}
