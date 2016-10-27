import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SlimLoadingBarModule } from './loader/loader.module';
import { Typeahead } from './typeahead/typeahead.component';
import { Published } from './pipes/published.pipe';
import { Truncate } from './pipes/truncate.pipe';
import { Share } from './share/share.module';

@NgModule({
    imports: [
      CommonModule,
      FormsModule,
      SlimLoadingBarModule.forRoot(),
      Share
    ],
    declarations: [
      Typeahead,
      Published,
      Truncate
    ],
    providers: [],
    exports: [
      SlimLoadingBarModule,
      Typeahead,
      Published,
      Truncate,
      Share
    ]
})
export class ComponentsModule {}
