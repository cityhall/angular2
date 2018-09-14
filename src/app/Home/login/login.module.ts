import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';
import { NotificationService } from './../../core/services/notification.service';
import { AuthenService } from './../../core/services/authen.service';
import { FormsModule } from '@angular/forms';

export const routes: Routes = [
  //login/''
  { path: '' ,component:LoginComponent}
]

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes)
  ],
  providers:[AuthenService, NotificationService],
  declarations: [LoginComponent]
})
export class LoginModule { }
