import { Routes } from '@angular/router';

export const PORTAL_ROUTES: Routes = [
    {
        path: '',
        loadChildren: () => import('../portal/portal.module').then(m => m.PortalModule)
    }
]