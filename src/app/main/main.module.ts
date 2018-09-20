import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './main.component';
import { mainRoutes } from './main.routes';
import { RouterModule, Routes } from '@angular/router'
import { UserModule } from './user/user.module';
import { HomeModule } from './home/home.module';
import { SharedModule} from '../SharedModule'

@NgModule({
  imports: [
    CommonModule,
    UserModule,
    SharedModule,
    HomeModule,
  
    RouterModule.forChild(mainRoutes)
  ],
  declarations: [MainComponent],
  exports: [],
  providers:[]
})
export class MainModule { }
