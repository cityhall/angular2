import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductComponent } from './product.component';
import { ProductRouter } from './product.routes';
import { PaginationModule, ModalModule } from 'ngx-bootstrap';
import { FormsModule } from '@angular/forms';
import { DataService } from './../../core/services/data.service';
import { UtilityService } from './../../core/services/utility.service';
import { UploadService } from './../../core/services/upload.service';
import { Daterangepicker } from 'ng2-daterangepicker';
import { MultiselectDropdownModule } from 'angular-2-dropdown-multiselect';
import { CKEditorModule } from 'ng2-ckeditor';
import { SharedModule } from '../../SharedModule'
import { ModalimageModule } from './../../shared/modalimage/modalimage.module';
import { Routes } from '@angular/router';

const productRoutes: Routes = [
  { path: '', redirectTo: 'index', pathMatch: 'full' },
  { path: 'index', component: ProductComponent },
]

@NgModule({
  imports: [
    CommonModule,
    ProductRouter,
    FormsModule,
    CKEditorModule,
    PaginationModule,
    ModalModule,
    SharedModule,
    ModalimageModule,
    Daterangepicker,
    MultiselectDropdownModule
  ],
  declarations: [ProductComponent],
  providers: [DataService, UtilityService, UploadService]
})
export class ProductModule { }