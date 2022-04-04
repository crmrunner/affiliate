import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialDesignModule } from '../material-design/material-design.module';

import { PortalRoutingModule } from './portal-routing.module';
import { HomeComponent } from './home/home.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ClipboardModule } from 'ngx-clipboard';


@NgModule({
  declarations: [
    HomeComponent,
    PageNotFoundComponent
  ],
  imports: [
    CommonModule,
    PortalRoutingModule,
    MaterialDesignModule,
    ClipboardModule
  ]
})
export class PortalModule { }
