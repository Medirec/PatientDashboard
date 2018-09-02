import { FilterPipe } from './pipes/filter.pipe';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FileDropDirective } from './directives/file-drop-directive';
@NgModule({
  imports: [
    CommonModule
  ],
    declarations: [FilterPipe,FileDropDirective],
  exports: [FilterPipe,FileDropDirective]
})
export class SharedModule { }
