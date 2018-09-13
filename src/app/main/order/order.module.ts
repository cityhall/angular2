import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderComponent } from './order.component';
import { PaginationModule, ModalModule } from 'ngx-bootstrap';
import { FormsModule } from '@angular/forms';
import { Daterangepicker } from 'ng2-daterangepicker';
import { OrderRouter } from './order.routes';
import { OrderDetailComponent } from './order-detail/order-detail.component';
import { OrderAddComponent } from './order-add/order-add.component';
@NgModule({
  imports: [
    CommonModule,
    OrderRouter,
    FormsModule,
    PaginationModule,
    Daterangepicker,
    ModalModule
  ],
  declarations: [OrderComponent, OrderDetailComponent, OrderAddComponent],
  providers: []
})
export class OrderModule { }