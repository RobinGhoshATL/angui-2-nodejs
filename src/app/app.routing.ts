import { Routes } from '@angular/router';
import { AdminLayoutComponent } from './shared/components/layouts/admin-layout/admin-layout.component';
import { AuthLayoutComponent } from './shared/components/layouts/auth-layout/auth-layout.component';
import { ArticleComponent } from '../app/article/article.component';
import { AuthGuard } from './shared/services/auth/auth.guard';
import { MsalGuard } from "@azure/msal-angular";
import { AppComponent } from './app.component';
import { AuthenticationGuard } from 'microsoft-adal-angular6';

export const rootRouterConfig: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },
  {
    path: 'sessions',
    component: AuthLayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('./views/sessions/sessions.module').then(m => m.SessionsModule),
        data: { title: 'Session' }
      }
    ]
  },
  
  {
    path: 'dashboard',
    component: AdminLayoutComponent,
    canActivate: [MsalGuard],
    // canActivateChild: [AuthenticationGuard],
    children: [
      {
        path: '',
        redirectTo: 'analytics',
        pathMatch: 'full',
      },
      {
        path: 'analytics',
        loadChildren: () => import('./views/dashboard/dashboard.module').then(m => m.DashboardModule),
        data: { title: 'Dashboard', breadcrumb: 'Dashboard' },

      },
      {
        path: 'profile',
        loadChildren: () => import('./views/profile/profile.module').then(m => m.ProfileModule),
        data: { title: 'Profile', breadcrumb: 'PROFILE' },

      },
      {
        path: 'tour',
        loadChildren: () => import('./views/app-tour/app-tour.module').then(m => m.AppTourModule),
        data: { title: 'Tour', breadcrumb: 'TOUR' },

      },
      {
        path: 'products',
        loadChildren: () => import('./views/products/products.module').then(m => m.ProductsModule),
        data: { title: 'Products', breadcrumb: 'Products' },

      },
      {
        path: 'assets',
        loadChildren: () => import('./views/assets/assets.module').then(m => m.AssetsModule),
        data: { title: 'Assets', breadcrumb: 'Assets' },

      },
      {
        path: 'files',
        loadChildren: () => import('./views/files/files.module').then(m => m.FilesModule),
        data: { title: 'Files', breadcrumb: 'Files' },

      },
      {
        path: 'school',
        loadChildren: () => import('./views/school/school.module').then(m => m.SchoolModule),
        data: { title: 'School', breadcrumb: 'School' },

      },
      {
        path: 'ps-scripts',
        loadChildren: () => import('./views/ps-scripts/ps-scripts.module').then(m => m.PsScriptsModule),
        data: { title: 'PsScript', breadcrumb: 'PsScript' },

      },
      {
        path: 'article/:id',
        component: ArticleComponent

      },

    ]
  },
  {
    path: '**',
    redirectTo: 'sessions/404'
  }
];

