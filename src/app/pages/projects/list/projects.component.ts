import { UserService } from './../../../services/user/user.service';
import { takeUntil } from 'rxjs/internal/operators';
import { SocketService } from './../../../services/socket/socket.service';
import { LoadingService } from './../../../services/loading/loading.service';
import { IProject } from './../../../interfaces/IProject';
import { ProjectService } from '../../../services/project/project.service';
import { HeaderService } from '../../../services/header/header.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { BaseComponent } from '../../../components/base.component';
import { IUser } from '../../../interfaces/IUser';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})

export class ProjectsComponent extends BaseComponent implements OnInit, OnDestroy {
  public projects: IProject[];
  public isPartOfATeam: boolean;

  constructor(
    private headerService: HeaderService,
    private projectService: ProjectService,
    private loadingService: LoadingService,
    private socketService: SocketService,
    private userService: UserService
  ) {
    super();
  }

  private getProjects = (shouldShowLoader: boolean) => {
    if (!shouldShowLoader) {
      this.loadingService.isLoading.next(false);
    } else {
      this.loadingService.isLoading.next(true);
    }

    this.userService.userInformation.pipe(takeUntil(this.destroyed$)).subscribe((user: IUser) => {
      if (!user) {
        return;
      }

      if (!user.properties.team) {
        this.loadingService.isLoading.next(false);
        this.isPartOfATeam = false;
      } else {
        this.isPartOfATeam = true;

        this.projectService
          .getProjects()
          .pipe(takeUntil(this.destroyed$))
          .subscribe((projects: IProject[]) => {
            this.projects = projects;

            this.loadingService.isLoading.next(false);
          });
      }
    });
  }

  ngOnInit() {
    this.headerService.setup.next({
      breadcrumbs: [{
        name: 'Projects'
      }]
    });

    this.socketService.on('notification', () => {
      this.getProjects(false);
    });

    this.getProjects(true);
  }

  ngOnDestroy() {
    this.destroyed$.next(true);
    this.destroyed$.complete();
    this.socketService.remove('notification');
  }
}
