import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { DefaultLayoutComponent } from './layouts/default-layout/default-layout.component';
import { PORTAL_ROUTES } from './routes/portal.routes';
import { AUTH_ROUTES } from './routes/auth.routes';
import { AuthGuard } from './shared/auth-guard/auth.guard';
import { SecureInnerPagesGuard } from './shared/secure-inner-pages-guard/secure-inner-pages.guard';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

const routes: Routes = [
  { path: '', component: AuthLayoutComponent, children: AUTH_ROUTES, canActivate: [SecureInnerPagesGuard]},
  { path: '', component: DefaultLayoutComponent, children: PORTAL_ROUTES, canActivate: [AuthGuard]},
  { path: '**', component: PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
