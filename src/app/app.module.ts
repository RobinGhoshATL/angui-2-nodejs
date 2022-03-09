import { NgModule, ErrorHandler } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BrowserModule, HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { GestureConfig } from '@angular/material/core';
import { 
  PerfectScrollbarModule, 
  PERFECT_SCROLLBAR_CONFIG, 
  PerfectScrollbarConfigInterface
} from 'ngx-perfect-scrollbar';

import { InMemoryWebApiModule } from 'angular-in-memory-web-api';

import { rootRouterConfig } from './app.routing';
import { SharedModule } from './shared/shared.module';
import { AppComponent } from './app.component';

import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { ErrorHandlerService } from './shared/services/error-handler.service';
import { MatDialogModule } from '@angular/material/dialog';
import { MomentModule } from 'ngx-moment';
import { AuthGuard } from "./shared/services/auth/auth.guard";

import {
  MsalGuard,
  MsalInterceptor,
  MsalModule,
  MsalService,
  MSAL_CONFIG,
  MSAL_CONFIG_ANGULAR,
} from "@azure/msal-angular";

import { MSALAngularConfigFactory, MSALConfigFactory } from "./shared/helpers/msal-config";

// interceptor
import { authInterceptorProviders, AuthInterceptor } from './shared/helpers/auth.interceptor';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ArticleComponent } from './article/article.component';

// AoT requires an exported function for factories
export function HttpLoaderFactory(httpClient: HttpClient) {
  return new TranslateHttpLoader(httpClient, "assets/i18n/", ".json");
}

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    SharedModule,
    HttpClientModule,
    PerfectScrollbarModule,
    MatDialogModule,
    MomentModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    RouterModule.forRoot(rootRouterConfig, { useHash: false }),
    MsalModule
  ],
  declarations: [AppComponent, ArticleComponent],
  providers: [
      {
        provide: HTTP_INTERCEPTORS,
        useClass: AuthInterceptor,
        multi: true
      },
      {
        provide: HTTP_INTERCEPTORS,
        useClass: MsalInterceptor,
        multi: true
      },
      {
        provide: MSAL_CONFIG,
        useFactory: MSALConfigFactory
      },
      {
        provide: MSAL_CONFIG_ANGULAR,
        useFactory: MSALAngularConfigFactory
      },
      MsalService,
      MsalGuard,
      AuthGuard,
      //  AuthenticationGuard,
    { provide: ErrorHandler, useClass: ErrorHandlerService },
    { provide: HAMMER_GESTURE_CONFIG, useClass: GestureConfig },
    { provide: PERFECT_SCROLLBAR_CONFIG, useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG },
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(msalService: MsalService) {
    msalService.handleRedirectCallback(_ => { });
  }
 }