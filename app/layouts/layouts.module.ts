import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { RouterModule }   from '@angular/router';
// import { LayoutsHeadComponent } from './head/head.component';
import { LayoutsHeaderComponent } from './header/header.component';
import { LayoutsFooterComponent } from './footer/footer.component';

@NgModule({
    imports: [ SharedModule, RouterModule ],
    declarations: [ LayoutsHeaderComponent, LayoutsFooterComponent],
    providers: [],
    exports: [ LayoutsHeaderComponent, LayoutsFooterComponent]
})
export class LayoutsModule {}
