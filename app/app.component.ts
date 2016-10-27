import { ViewEncapsulation, Component, OnInit } from '@angular/core';
import { Router,  ActivatedRoute, NavigationStart, NavigationEnd, NavigationCancel, Event as NavigationEvent } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { SlimLoadingBarService } from './components/loader/loader.module';
import {enableProdMode} from '@angular/core';
enableProdMode();

@Component({
  selector: 'app',
  providers: [],
  styleUrls: ['./style/scss/app.scss', './app.component.scss'],
  encapsulation: ViewEncapsulation.None,
  template: `
    <header-component></header-component>
      <router-outlet></router-outlet>
    <footer-component></footer-component>
    <ng2-slim-loading-bar></ng2-slim-loading-bar>
  `
})

export class AppComponent implements OnInit {
  title: string = 'Cali Style Technologies';
  data = {};
  server: string;

  constructor(
    private router: Router,
    private slimLoadingBarService: SlimLoadingBarService,
  ){
    this.router.events.subscribe((event: NavigationEvent) => {
      if(event instanceof NavigationStart) {
        this.slimLoadingBarService.start(() => {
          console.log('Loading complete');
        });
      }
      if(event instanceof NavigationCancel) {
        this.slimLoadingBarService.complete();
      }
      if(event instanceof NavigationEnd) {
        this.slimLoadingBarService.complete();
      }
    });
  }

  ngOnInit(): void {

  }
  ngAfterViewInit(): void {

  }
}
