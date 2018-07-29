import { LoadingService } from './../../../services/loading/loading.service';
import { ILocale } from './../../../interfaces/ILocale';
import { IProject } from './../../../interfaces/IProject';
import { TranslateService } from '../../../services/translate/translate.service';
import { LanguageService } from '../../../services/language/language.service';
import { HeaderService } from '../../../services/header/header.service';
import { ProjectService } from '../../../services/project/project.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '../../../../../node_modules/@angular/platform-browser';

@Component({
  selector: 'app-project-view',
  templateUrl: './project-view.component.html',
  styleUrls: ['./project-view.component.scss']
})

export class ProjectViewComponent implements OnInit {
  public project: IProject;
  public locales: ILocale[] = [];
  public jsonToTranslate: string;
  public chosenLocales: ILocale[];

  constructor(
    private route: ActivatedRoute,
    private projectService: ProjectService,
    private languageService: LanguageService,
    private headerService: HeaderService,
    private loadingService: LoadingService,
    private sanitizer: DomSanitizer) { }

  public download = (translation: any) => {
    const json = JSON.stringify(translation, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);

    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  private getLanguages = () => {
    this.languageService.getLanguages(this.project.baseLocale).subscribe((locales: ILocale[]) => {
      this.loadingService.isLoading.next(false);
      this.locales = locales;
    });
  }

  private getProjects = () => {
    this.loadingService.isLoading.next(true);

    this.projectService.getProject(this.route.snapshot.params.projectId).subscribe((project: IProject) => {
      this.project = project;

      this.headerService.setup.next({
        breadcrumbs: [{
          name: 'Projects',
          sref: 'projects'
        }, {
          name: this.project.name,
          sref: `projects/${this.project._id}`
        }]
      });

      this.getLanguages();
    });
  }

  ngOnInit() {
    this.getProjects();
  }
}
