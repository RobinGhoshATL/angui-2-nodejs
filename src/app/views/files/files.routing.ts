import { Routes } from '@angular/router';

import { FilesComponent } from './files.component';

export const FilesRoutes: Routes = [
  { path: '', component: FilesComponent, data: { title: 'Files', breadcrumb: 'Files' } },
 ];