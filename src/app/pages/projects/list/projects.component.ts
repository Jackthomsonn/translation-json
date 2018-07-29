import { SocketService } from './../../../services/socket/socket.service';
import { LoadingService } from './../../../services/loading/loading.service';
import { IProject } from './../../../interfaces/IProject';
import { ProjectService } from '../../../services/project/project.service';
import { HeaderService } from '../../../services/header/header.service';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-proejcts',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})

export class ProjectsComponent implements OnInit, OnDestroy {
  public projects: IProject[];

  constructor(
    private headerService: HeaderService,
    private projectService: ProjectService,
    private loadingService: LoadingService,
    private socketService: SocketService) { }

  private getProjects = (shouldShowLoader: boolean) => {
    if (!shouldShowLoader) {
      this.loadingService.isLoading.next(false);
    } else {
      this.loadingService.isLoading.next(true);
    }

    this.projectService.getProjects().subscribe((projects: IProject[]) => {
      this.projects = projects;

      this.loadingService.isLoading.next(false);
    });
  }

  ngOnInit() {
    this.headerService.setup.next({
      breadcrumbs: [{
        name: 'Projects'
      }]
    });

    this.socketService.on('notification', (data: any) => {
      this.getProjects(false);
    });

    this.getProjects(true);
  }

  ngOnDestroy() {
    this.socketService.remove('notification');
  }
}
