
import { UserComponent } from './user.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
//import { PaginationModule } from 'ngx-bootstrap/pagination';
import { FormsModule} from '@angular/forms';
import { ModalModule } from 'ngx-bootstrap/modal';
import { MultiselectDropdownModule } from 'angular-2-dropdown-multiselect';
import { Daterangepicker } from 'ng2-daterangepicker';
import { SharedModule} from '../../SharedModule'
import { UploadService } from '../../core/services/upload.service';
import { ModalimageModule } from './../../shared/modalimage/modalimage.module';

const userRoutes:  Routes=[
  {path:'',redirectTo:'index',pathMatch:'full'},
  {path:'index',component:UserComponent},
]
@NgModule({
  imports: [
    CommonModule,
    //PaginationModule,
    FormsModule,
    MultiselectDropdownModule,
    ModalimageModule,
    Daterangepicker,
    SharedModule,
    ModalModule.forRoot(),
    RouterModule.forChild(userRoutes)
  ],

  declarations: [UserComponent],
  providers:[UploadService]
})
export class UserModule { }
