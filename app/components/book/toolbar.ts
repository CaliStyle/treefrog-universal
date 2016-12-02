import { Component, Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'bc-toolbar',
  styleUrls:['./toolbar.component.scss'],
  template: `
    <md-toolbar color="primary">
      <button md-icon-button (click)="openMenu.emit()">
        <md-icon>menu</md-icon>
      </button>
      <ng-content></ng-content>
    </md-toolbar>
  `
})
export class ToolbarComponent {
  @Output() openMenu = new EventEmitter();
}
