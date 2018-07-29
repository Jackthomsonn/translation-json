import { LoadingService } from './../../services/loading/loading.service';
import { ILocale } from './../../interfaces/ILocale';
import { IProject } from './../../interfaces/IProject';
import { TranslateService } from '../../services/translate/translate.service';
import { LanguageService } from '../../services/language/language.service';
import { HeaderService } from '../../services/header/header.service';
import { ProjectService } from '../../services/project/project.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ErrorService } from '../../services/error/error.service';

@Component({
  selector: 'app-translator',
  templateUrl: './translator.component.html',
  styleUrls: ['./translator.component.scss']
})

export class TranslatorComponent implements OnInit {
  public project: IProject;
  public locales: ILocale[] = [];
  public jsonToTranslate: string;
  public chosenLocales: ILocale[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private projectService: ProjectService,
    private headerService: HeaderService,
    private languageService: LanguageService,
    private loadingService: LoadingService,
    private translateService: TranslateService,
    private errorService: ErrorService) { }

  public getLanguages = (baseLocale: string) => {
    this.loadingService.isLoading.next(true);

    this.languageService.getLanguages(baseLocale).subscribe((languages: any) => {
      languages.dirs.forEach(dir => {
        if (dir.split('-').shift() === baseLocale) {
          this.locales.push(dir);
        }
      });

      this.loadingService.isLoading.next(false);
    });
  }

  public getChosenLocales = (locales: any[]) => {
    this.chosenLocales = locales;
  }

  public submitForTranslation = () => {
    if (!this.validateJson(this.jsonToTranslate)) {
      this.errorService.exceptionCaught.next({
        statusText: 'Invalid JSON',
        error: 'You have supplied invalid JSON. Please check and try again'
      });
    } else if (this.chosenLocales.length === 0) {
      this.errorService.exceptionCaught.next({
        statusText: 'No locales selected',
        error: 'You must select at least target locale you wish to translate to'
      });
    } else {
      this.translateService.translate({
        chosenLocales: this.chosenLocales,
        json: this.jsonToTranslate,
        project: this.project
      }).subscribe(() => {
        this.router.navigate(['projects']);
      });
    }
  }

  public clear = () => {
    this.jsonToTranslate = '';
  }

  private validateJson(str: string) {
    try {
      JSON.parse(str);
    } catch (e) {
      return false;
    }

    return true;
  }

  ngOnInit() {
    this.projectService.getProject(this.route.snapshot.params.projectId).subscribe((project: IProject) => {
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
