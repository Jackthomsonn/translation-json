import { ErrorComponent } from './components/error/error.component';
import { BreadcrumbsComponent } from './components/breadcrumbs/breadcrumbs/breadcrumbs.component';
import { LoadingComponent } from './components/loading/loading.component';
import { SwitchComponent } from './components/switch/switch.component';
import { SelectComponent } from './components/select/select.component';
import { TranslatorComponent } from './components/translator/translator.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { AppRoutes } from './route.module';

import { SidebarComponent } from './components/sidebar/sidebar.component';
import { HeaderComponent } from './components/header/header.component';
import { ButtonComponent } from './components/button/button.component';
import { ProjectItemComponent } from './components/project-item/project-item.component';
import { StatusComponent } from './components/status/status.component';
import { AppComponent } from './app.component';

import { ProjectsComponent } from './pages/projects/list/projects.component';
import { ProjectCreateComponent } from './pages/projects/create/project-create.component';
import { ProjectViewComponent } from './pages/projects/view/project-view.component';
import { LocaleTranslatorPipe } from './pipes/locale-translator.pipe';
import { RequestInterceptor } from './interceptor';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ButtonComponent,
    SidebarComponent,
    ProjectsComponent,
    ProjectItemComponent,
    StatusComponent,
    ProjectCreateComponent,
    ProjectViewComponent,
    TranslatorComponent,
    SelectComponent,
    SwitchComponent,
    LocaleTranslatorPipe,
    LoadingComponent,
    BreadcrumbsComponent,
    ErrorComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(
      AppRoutes
    )
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: RequestInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
