import { EnglishComponent } from './english.component';
import { Routes, RouterModule } from '@angular/router';
const routes: Routes = [
    //{ path: '', redirectTo: 'index', pathMatch: 'full' },
    { path: '', component: EnglishComponent}
];
export const EnglishRoutes = RouterModule.forChild(routes);