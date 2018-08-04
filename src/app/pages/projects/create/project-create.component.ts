import { UserService } from './../../../services/user/user.service';
import { takeUntil } from 'rxjs/internal/operators';
import { LoadingService } from './../../../services/loading/loading.service';
import { LanguageService } from './../../../services/language/language.service';
import { IProject } from './../../../interfaces/IProject';
import { ProjectService } from '../../../services/project/project.service';
import { HeaderService } from '../../../services/header/header.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ILocale } from '../../../interfaces/ILocale';
import { BaseComponent } from '../../../components/base.component';

@Component({
  selector: 'app-project-create',
  templateUrl: './project-create.component.html',
  styleUrls: ['./project-create.component.scss']
})

export class ProjectCreateComponent extends BaseComponent implements OnInit {
  public project: IProject;
  public locales: string[] = [];

  constructor(
    private headerService: HeaderService,
    private projectService: ProjectService,
    private languageService: LanguageService,
    private loadingService: LoadingService,
    private userService: UserService,
    private router: Router) {
    super();
  }

  public createProject = () => {
    this.projectService.createProject(this.project).pipe(takeUntil(this.destroyed$)).subscribe(() => {
      this.router.navigate(['projects']);
    });
  }

  public setBaseLocale = (chosenLocale: string) => {
    this.project.baseLocale = chosenLocale;
  }

  private getLanguages = () => {
    this.loadingService.isLoading.next(true);

    this.languageService.getLanguages().pipe(takeUntil(this.destroyed$)).subscribe((locales: ILocale) => {
      locales.dirs.forEach(locale => {
        if (!this.locales.includes(locale.split('-').pop())) {
          this.locales.push(locale.split('-').pop());
        }
      });

      this.loadingService.isLoading.next(false);
    });
  }

  ngOnInit() {
    this.headerService.setup.next({
      breadcrumbs: [{
        name: 'Projects',
        sref: 'projects'
      }, {
        name: 'Create',
        sref: 'projects/create'
      }]
    });

    this.project = {
      name: undefined,
      baseLocale: undefined,
      translations: [],
      status: undefined,
      team: undefined
    };

    this.userService.userInformation.pipe(takeUntil(this.destroyed$)).subscribe(user => {
      if (!user) {
        return;
      }

      this.project.team = user.properties.team;
    });

    this.getLanguages();
  }
}
