import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchPipe } from './core/filter/search.pipe';
import { FileSelectDirective } from 'ng2-file-upload';

@NgModule({
    imports: [CommonModule],
    declarations: [SearchPipe,FileSelectDirective],
    exports: [SearchPipe,FileSelectDirective]
})
export class SharedModule {
    
}