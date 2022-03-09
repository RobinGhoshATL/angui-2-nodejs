import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PsScriptsComponent } from './ps-scripts/ps-scripts.component';
import { MatStepperModule } from '@angular/material/stepper';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ChartsModule } from 'ng2-charts';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatListModule } from '@angular/material/list';
import { FileUploadModule } from 'ng2-file-upload';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatExpansionModule } from '@angular/material/expansion';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { FileManagerAllModule } from '@syncfusion/ej2-angular-filemanager';
import { RouterModule } from '@angular/router';
import { PSScriptsRouting } from './ps-scripts.routing';



@NgModule({
  declarations: [PsScriptsComponent],
  imports: [
    CommonModule,
    MatStepperModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatCardModule,
    FlexLayoutModule,
    ChartsModule,
    MatTooltipModule,
    MatListModule,
    FileUploadModule,
    MatProgressBarModule,
    MatIconModule,
    MatSelectModule,
    MatProgressSpinnerModule,
    MatCheckboxModule,
    MatExpansionModule,
    NgxDatatableModule,
    FileManagerAllModule,
    RouterModule.forChild(PSScriptsRouting),
  ]
})
export class PsScriptsModule { }
