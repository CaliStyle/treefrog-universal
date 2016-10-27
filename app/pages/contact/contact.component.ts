import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Emailer } from '../../services/emailer/emailer';


@Component({
  selector: 'pages-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
})
export class PagesContactComponent {

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private emailer: Emailer
  ) {}

  ngOnInit() {
  }
  ngOnDestroy() {
  }
 }
