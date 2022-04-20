import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialDesignModule } from '../material-design/material-design.module';

import { SharedRoutingModule } from './shared-routing.module';
import { AuthHeaderComponent } from './auth-header/auth-header.component';
import { AuthFooterComponent } from './auth-footer/auth-footer.component';
import { DefaultHeaderComponent } from './default-header/default-header.component';
import { DefaultFooterComponent } from './default-footer/default-footer.component';
import { DefaultNavComponent } from './default-nav/default-nav.component';
import { SiteButtonComponent } from './site-button/site-button/site-button.component';
import { LoaderComponent } from './loader/loader.component';

@NgModule({
  declarations: [AuthHeaderComponent, AuthFooterComponent, DefaultHeaderComponent, DefaultFooterComponent, DefaultNavComponent, SiteButtonComponent, LoaderComponent],
  exports: [
    AuthHeaderComponent,
    AuthFooterComponent,
    DefaultHeaderComponent,
    DefaultFooterComponent,
    DefaultNavComponent,
    LoaderComponent
  ],
  imports: [
    CommonModule,
    SharedRoutingModule,
    MaterialDesignModule
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class SharedModule { }
