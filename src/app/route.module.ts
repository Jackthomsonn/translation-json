import { TranslatorComponent } from './components/translator/translator.component';
import { ProjectViewComponent } from './pages/projects/view/project-view.component';
import { Routes } from '@angular/router';

import { ProjectsComponent } from './pages/projects/list/projects.component';
import { ProjectCreateComponent } from './pages/projects/create/project-create.component';

export const AppRoutes: Routes = [
  { path: '', redirectTo: '/projects', pathMatch: 'full' },
  { path: 'projects', component: ProjectsComponent },
  { path: 'projects/create', component: ProjectCreateComponent },
  { path: 'projects/:projectId', component: ProjectViewComponent },
  { path: 'projects/:projectId/translator', component: TranslatorComponent }
];
