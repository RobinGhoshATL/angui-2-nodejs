import { Routes } from '@angular/router';
import { PsScriptsComponent } from './ps-scripts/ps-scripts.component';


export const PSScriptsRouting: Routes = [
    {
        path: '', 
        component: PsScriptsComponent, 
        data: { title: 'PS Scripts', breadcrumb: 'PS Scripts'}
      },
]