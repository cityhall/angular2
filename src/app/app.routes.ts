import { Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard'
export const appRoutes: Routes = [
    {
        path: '', redirectTo: 'admin/login', pathMatch: 'full'
    },
    { path: 'admin/login', loadChildren: './login/login.module#LoginModule' },
    { path: 'admin', loadChildren: './main/main.module#MainModule',canActivate:[AuthGuard] },
]