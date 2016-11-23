import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { RouterModule }   from '@angular/router';


@NgModule({
    imports: [ SharedModule, RouterModule ],
    declarations: [],
    providers: [],
    exports: []
})
export class EffectsModule {}
