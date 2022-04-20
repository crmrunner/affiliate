import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialDesignModule } from '../material-design/material-design.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { PortalRoutingModule } from './portal-routing.module';
import { HomeComponent } from './home/home.component';
import { ClipboardModule } from 'ngx-clipboard';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { ProfileComponent } from './profile/profile.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    HomeComponent,
    ProfileComponent,
    //LoaderComponent
  ],
  imports: [
    CommonModule,
    PortalRoutingModule,
    MaterialDesignModule,
    ClipboardModule,
    InfiniteScrollModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule
  ]
})
export class PortalModule { }
