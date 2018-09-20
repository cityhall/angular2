import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalimageComponent } from './modalimage.component';
import { FormsModule } from '@angular/forms';
import { ModalModule } from 'ngx-bootstrap/modal';
import { AngularDraggableModule } from 'angular2-draggable';
import { TreeModule } from 'angular-tree-component';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { SharedModule} from '../../SharedModule'

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    AngularDraggableModule,
    SharedModule,
    ModalModule.forRoot(),
    TreeModule.forRoot(),
    PaginationModule.forRoot()
  ],
  declarations: [ModalimageComponent],
  exports: [ModalimageComponent]
})
export class ModalimageModule { }
