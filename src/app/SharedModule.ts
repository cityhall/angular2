import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchPipe,EscapeHtmlPipe } from './core/filter/search.pipe';
import { OrderBy } from './core/filter/orderBy.pipe';
import { FileSelectDirective } from 'ng2-file-upload';

@NgModule({
    imports: [CommonModule],
    declarations: [SearchPipe,FileSelectDirective,OrderBy,EscapeHtmlPipe],
    exports: [SearchPipe,FileSelectDirective,OrderBy,EscapeHtmlPipe]
})
export class SharedModule {
    
}