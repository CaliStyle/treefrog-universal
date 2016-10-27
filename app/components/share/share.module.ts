import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ShareContainerComponent } from './share-container/share-container.component';
import { ShareButtonComponent } from './share-button/share-button.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  // providers: [
  //   { provide: 'Window',  useValue: window }
  // ],
  declarations: [
    ShareContainerComponent,
    ShareButtonComponent
  ],
  exports: [
    ShareContainerComponent
  ]
})
export class Share { }
