import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'pages-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class PagesAboutComponent {


  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {

  }
  ngOnDestroy() {
  }
 }
