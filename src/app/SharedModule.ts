import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchPipe } from './core/filter/search.pipe';
import { OrderBy } from './core/filter/orderBy.pipe';
import { FileSelectDirective } from 'ng2-file-upload';

@NgModule({
    imports: [CommonModule],
    declarations: [SearchPipe,FileSelectDirective,OrderBy],
    exports: [SearchPipe,FileSelectDirective,OrderBy]
})
export class SharedModule {
    
}