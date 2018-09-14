import { Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard'
export const appRoutes: Routes = [
   
    {
        path: 'admin', redirectTo: 'admin/login', pathMatch: 'full'
    },
    {
        path: '', loadChildren: './Home/english/english.module#EnglishModule'
    },
    { path: 'admin/login', loadChildren: './login/login.module#LoginModule' },
    { path: 'login', loadChildren: './Home/login/login.module#LoginModule' },
    { path: 'admin', loadChildren: './main/main.module#MainModule',canActivate:[AuthGuard] },
]