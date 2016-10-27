import { NgModule } from '@angular/core';
import { Pages404Component } from './404/404.component'
import { Pages500Component } from './500/500.component'
import { PagesAboutComponent } from './about/about.component'
import { PagesContactComponent } from './contact/contact.component'
import { PagesHomeComponent } from './home/home.component'

import { SharedModule } from '../shared/shared.module'
import { RouterModule }   from '@angular/router';
import { LayoutsModule } from '../layouts/layouts.module'

@NgModule({
    imports : [
        RouterModule,
        SharedModule,
        LayoutsModule
    ],
    declarations: [
        Pages404Component,
        Pages500Component,
        PagesAboutComponent,
        PagesContactComponent,
        PagesHomeComponent
    ],
    exports: [
        Pages404Component,
        Pages500Component,
        PagesAboutComponent,
        PagesContactComponent,
        PagesHomeComponent
    ]
})
export class PagesModule {}
