import { Component, Input } from '@angular/core';

@Component({
  selector: 'bc-sidenav',
  template: `
    <md-sidenav [opened]="open">
      <md-nav-list>
        <ng-content></ng-content>
      </md-nav-list>
    </md-sidenav>
  `,
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent {
  @Input() open = false;
}
