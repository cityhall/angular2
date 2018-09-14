import { AnnoucementComponent } from './annoucement.component';
import { Routes, RouterModule } from '@angular/router';
const routes: Routes = [
    { path: '', redirectTo: 'index', pathMatch: 'full' },
    { path: 'index', component: AnnoucementComponent}
];
export const AnnoucementRouter = RouterModule.forChild(routes);