import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SchoolRoutes } from './school.routing';
import { MatTabsModule } from '@angular/material/tabs';
import { SchoolComponent } from './school.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatRadioModule } from '@angular/material/radio';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FlexLayoutModule } from '@angular/flex-layout';
import { QuillModule } from 'ngx-quill';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import {  MatPaginatorModule } from '@angular/material/paginator';
import {  MatSortModule } from '@angular/material/sort';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatTableModule } from '@angular/material/table';

import { FileUploadModule } from 'ng2-file-upload';
// file share module import
import { FileManagerAllModule } from '@syncfusion/ej2-angular-filemanager';

// trim string pipe import
import { TrimStringPipe } from  "app/shared/pipes/trim-string.pipe";
@NgModule({
  declarations: [SchoolComponent],
  imports: [
    MatPaginatorModule,
    MatSortModule,
    CommonModule,
    MatTabsModule,    
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatListModule,
    MatCardModule,
    MatDatepickerModule, 
    MatNativeDateModule,
    MatProgressBarModule,
    MatRadioModule,
    MatCheckboxModule,
    MatButtonModule,
    MatIconModule,
    FlexLayoutModule,
    QuillModule,
    NgxDatatableModule,
    Ng2SearchPipeModule,
    MatTooltipModule,
    MatTableModule,
    FileUploadModule,
    FileManagerAllModule,
    RouterModule.forChild(SchoolRoutes)
  ],
  exports: [
    
  ],
  entryComponents: []
})
export class SchoolModule { }
