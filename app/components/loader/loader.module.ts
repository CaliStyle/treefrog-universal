'use strict';

import {NgModule, ModuleWithProviders} from "@angular/core";
import {CommonModule} from "@angular/common";

import {SlimLoadingBarComponent} from './loader.component';
import {SlimLoadingBarService} from './loader.service';

export * from './loader.component';
export * from './loader.service';

export default {
  providers: [SlimLoadingBarService],
  directives: [SlimLoadingBarComponent]
}

@NgModule({
  imports: [CommonModule],
  declarations: [SlimLoadingBarComponent],
  exports: [CommonModule, SlimLoadingBarComponent]
})
export class SlimLoadingBarModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SlimLoadingBarModule,
      providers: [SlimLoadingBarService]
    };
  }
}
