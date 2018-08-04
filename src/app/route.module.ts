import { ChangePasswordComponent } from './pages/change-password/change-password.component';
import { ForgottenPasswordComponent } from './pages/forgotten-password/forgotten-password.component';
import { TranslatorComponent } from './components/translator/translator.component';
import { ProjectViewComponent } from './pages/projects/view/project-view.component';
import { Routes } from '@angular/router';

import { ProjectsComponent } from './pages/projects/list/projects.component';
import { ProjectCreateComponent } from './pages/projects/create/project-create.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { IsAuthorised } from './interceptors/is-authorised';

export const AppRoutes: Routes = [
  { path: '', redirectTo: '/projects', pathMatch: 'full' },
  { path: 'projects', component: ProjectsComponent, canActivate: [IsAuthorised] },
  { path: 'projects/create', component: ProjectCreateComponent, canActivate: [IsAuthorised] },
  { path: 'projects/:projectId', component: ProjectViewComponent, canActivate: [IsAuthorised] },
  { path: 'projects/:projectId/translator', component: TranslatorComponent, canActivate: [IsAuthorised] },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'forgotten-password', component: ForgottenPasswordComponent },
  { path: 'auth/forgotten-password', component: ChangePasswordComponent }
];
