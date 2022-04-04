import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { DefaultLayoutComponent } from './layouts/default-layout/default-layout.component';
import { PORTAL_ROUTES } from './routes/portal.routes';
import { AUTH_ROUTES } from './routes/auth.routes';
import { AuthGuard } from './shared/auth-guard/auth.guard';
import { SecureInnerPagesGuard } from './shared/secure-inner-pages-guard/secure-inner-pages.guard';

const routes: Routes = [
  { path: '', component: AuthLayoutComponent, children: AUTH_ROUTES, canActivate: [SecureInnerPagesGuard]},
  { path: 'portal', component: DefaultLayoutComponent, children: PORTAL_ROUTES, canActivate: [AuthGuard]},
  { path: '**', redirectTo: 'portal/404'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
