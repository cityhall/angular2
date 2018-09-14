import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnnoucementComponent } from './annoucement.component';
import { AnnoucementRouter } from './annoucement.routes';
import { PaginationModule, ModalModule } from 'ngx-bootstrap';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    FormsModule,
    CommonModule,
    PaginationModule.forRoot(),
    AnnoucementRouter,
    ModalModule.forRoot()
  ],
  declarations: [AnnoucementComponent],
  providers:[]
})
export class AnnoucementModule { }