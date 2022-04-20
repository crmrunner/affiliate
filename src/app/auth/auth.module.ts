import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialDesignModule } from '../material-design/material-design.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';

import { AuthRoutingModule } from './auth-routing.module';
import { SignupComponent } from '../auth/auth/signup/signup.component';
import { LoginComponent } from '../auth/auth/login/login.component';
import { StrengthCheckerComponent } from '../strength-checker/strength-checker.component';
import { ForgotPasswordComponent } from './auth/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './auth/reset-password/reset-password.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    SignupComponent,
    LoginComponent,
    StrengthCheckerComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent,
    //LoaderComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    MaterialDesignModule,
    FormsModule,
    ReactiveFormsModule,
    NgSelectModule,
    SharedModule
  ]
})
export class AuthModule { }

