import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedMaterialModule } from '../shared-material.module';
import { TranslateModule } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { SharedPipesModule } from '../pipes/shared-pipes.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SharedDirectivesModule } from '../directives/shared-directives.module';

// ONLY REQUIRED FOR **SIDE** NAVIGATION LAYOUT
import { HeaderSideComponent } from './header-side/header-side.component';
import { SidebarSideComponent } from './sidebar-side/sidebar-side.component';

// ONLY REQUIRED FOR **TOP** NAVIGATION LAYOUT
import { SidebarTopComponent } from './sidebar-top/sidebar-top.component';

// ALWAYS REQUIRED 
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { FooterComponent } from './footer/footer.component';
import { BreadcrumbComponent } from './breadcrumb/breadcrumb.component';
import { AppComfirmComponent } from '../services/app-confirm/app-confirm.component';
import { AppLoaderComponent } from '../services/app-loader/app-loader.component';
import { EgretSidebarComponent, EgretSidebarTogglerDirective } from './egret-sidebar/egret-sidebar.component';
import { EgretExampleViewerTemplateComponent } from './example-viewer-template/example-viewer-template.component';

import { AvatarModule } from "ngx-avatar";
const components = [
  SidebarTopComponent,
  SidenavComponent,
  NotificationsComponent,
  SidebarSideComponent,
  HeaderSideComponent,
  AdminLayoutComponent,
  AuthLayoutComponent,
  BreadcrumbComponent,
  AppComfirmComponent,
  AppLoaderComponent,
  EgretSidebarComponent,
  FooterComponent,
  EgretSidebarTogglerDirective,
  EgretExampleViewerTemplateComponent
]

@NgModule({
  imports: [
  CommonModule,
    FormsModule,
    RouterModule,
    TranslateModule,
    FlexLayoutModule,
    PerfectScrollbarModule,
    SharedPipesModule,
    SharedDirectivesModule,
    SharedMaterialModule,
    AvatarModule
  ],
  declarations: components,
  entryComponents: [AppComfirmComponent, AppLoaderComponent],
  exports: components
})
export class SharedComponentsModule {}