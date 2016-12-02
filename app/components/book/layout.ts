import { Component } from '@angular/core';


@Component({
  selector: 'bc-layout',
  template: `
    <md-sidenav-layout fullscreen>

      <ng-content></ng-content>

    </md-sidenav-layout>
  `,
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent { }
