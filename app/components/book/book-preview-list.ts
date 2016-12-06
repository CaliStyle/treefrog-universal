import { Component, Input } from '@angular/core';
import { Book } from '../../models/book';

@Component({
  selector: 'bc-book-preview-list',
  template: `
    <bc-book-preview *ngFor="let book of books" [book]="book"></bc-book-preview>
  `,
  styleUrls: ['./book-preview-list.component.scss']
})
export class BookPreviewListComponent {
  @Input() books: Book[];
}
