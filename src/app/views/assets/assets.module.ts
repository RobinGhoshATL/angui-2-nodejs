import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AssetsRoutes } from './assets.routing';
import { MatTabsModule } from '@angular/material/tabs';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { FlexLayoutModule } from '@angular/flex-layout';
import { QuillModule } from 'ngx-quill';
import { AssetsComponent } from './assets.component';

@NgModule({
  declarations: [AssetsComponent],
  imports: [
    CommonModule,
    MatTabsModule,  
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    MatDatepickerModule, 
    MatNativeDateModule,
    MatProgressBarModule,
    FlexLayoutModule,
    QuillModule,
    RouterModule.forChild(AssetsRoutes)
  ],
  exports: [
],
  entryComponents: []
})
export class AssetsModule { }
