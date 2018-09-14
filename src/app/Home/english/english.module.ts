import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EnglishComponent } from '../../Home/english/english.component';
import { EnglishRoutes } from './english.routes';

@NgModule({
  imports: [
    CommonModule,EnglishRoutes
  ],
  declarations: [EnglishComponent],
  providers:[]
})
export class EnglishModule { }
