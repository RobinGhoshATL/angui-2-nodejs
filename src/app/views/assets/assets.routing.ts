import { Routes } from '@angular/router';
import { AssetsComponent } from './assets.component';

export const AssetsRoutes: Routes = [
  { path: '', component: AssetsComponent, data: { title: 'Assets', breadcrumb: 'Assets' } },
];