import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'pages-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class PagesHomeComponent {

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {

  }
  ngOnDestroy() {
  }
 }
