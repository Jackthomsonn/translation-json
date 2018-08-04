import { ILanguage } from './../../interfaces/ILanguage';
import { takeUntil } from 'rxjs/internal/operators';
import { LoadingService } from './../../services/loading/loading.service';
import { IProject } from './../../interfaces/IProject';
import { TranslateService } from '../../services/translate/translate.service';
import { LanguageService } from '../../services/language/language.service';
import { HeaderService } from '../../services/header/header.service';
import { ProjectService } from '../../services/project/project.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../base.component';

@Component({
  selector: 'app-translator',
  templateUrl: './translator.component.html',
  styleUrls: ['./translator.component.scss']
})

export class TranslatorComponent extends BaseComponent implements OnInit {
  public project: IProject;
  public locales: string[] = [];
  public jsonToTranslate: string;
  public chosenLocales: string[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private projectService: ProjectService,
    private headerService: HeaderService,
    private languageService: LanguageService,
    private loadingService: LoadingService,
    private translateService: TranslateService) {
    super();
  }

  public getLanguages = (baseLocale: string) => {
    this.loadingService.isLoading.next(true);

    this.languageService.getLanguages(baseLocale).pipe(takeUntil(this.destroyed$)).subscribe((languages: ILanguage) => {
      languages.dirs.forEach(dir => {
        if (dir.split('-').shift() === baseLocale) {
          this.locales.push(dir);
        }
      });

      this.loadingService.isLoading.next(false);
    });
  }

  public getChosenLocales = (locales: string[]) => {
    this.chosenLocales = locales;
  }

  public submitForTranslation = () => {
    this.translateService.translate({
      chosenLocales: this.chosenLocales,
      json: this.jsonToTranslate,
      project: this.project
    }).pipe(takeUntil(this.destroyed$)).subscribe(() => {
      this.router.navigate(['projects']);
    });
  }

  public clear = () => {
    this.jsonToTranslate = '';
  }

  ngOnInit() {
    this.projectService
      .getProject(this.route.snapshot.params.projectId)
      .pipe(takeUntil(this.destroyed$))
      .subscribe((project: IProject) => {
        delete project.translations;

        this.project = project;

        this.headerService.setup.next({
          breadcrumbs: [{
            name: 'Projects',
            sref: 'projects'
          }, {
            name: this.project.name,
            sref: `projects/${this.project._id}`
          }, {
            name: 'Create translations',
            sref: `projects/${this.project._id}/translator`
          }]
        });

        this.getLanguages(this.project.baseLocale);
      });
  }
}
