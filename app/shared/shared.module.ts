import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ComponentsModule } from '../components/components.module';

@NgModule({
    imports: [CommonModule, FormsModule, ComponentsModule],
    declarations: [ ],
    providers: [ ],
    exports: [CommonModule, FormsModule, ComponentsModule]
})
export class SharedModule {}
