import { ITeam } from './../../../interfaces/ITeam';
import { HeaderService } from '../../../services/header/header.service';
import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../../../components/base.component';
import { TeamService } from '../../../services/team/team.service';

@Component({
  selector: 'app-team-create',
  templateUrl: './team-create.component.html',
  styleUrls: ['./team-create.component.scss']
})

export class TeamCreateComponent extends BaseComponent implements OnInit {
  public team: ITeam = { name: undefined }

  constructor(private headerService: HeaderService, private teamService: TeamService) {
    super();
  }

  public createTeam = () => {
    this.teamService.createTeam(this.team).subscribe(() => {
      console.log('Created!');
    });
  }

  ngOnInit() {
    this.headerService.setup.next({
      breadcrumbs: [{
        name: 'Team',
        sref: 'team/create'
      }]
    });
  }
}
