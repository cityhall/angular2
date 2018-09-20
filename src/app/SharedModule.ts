import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchPipe,EscapeHtmlPipe } from './core/filter/search.pipe';
import { OrderBy } from './core/filter/orderBy.pipe';
import { FileUploadModule  } from 'ng2-file-upload';
import { BusyModule } from 'angular2-busy';
import {NgxPaginationModule} from 'ngx-pagination'; 

@NgModule({
    imports: [CommonModule,FileUploadModule,BusyModule,NgxPaginationModule],
    declarations: [SearchPipe,OrderBy,EscapeHtmlPipe ],
    exports: [SearchPipe,OrderBy,EscapeHtmlPipe,FileUploadModule,BusyModule,NgxPaginationModule]
})
export class SharedModule {
    
}