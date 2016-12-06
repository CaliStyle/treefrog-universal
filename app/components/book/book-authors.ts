import { Component, Input } from '@angular/core';
import { Book } from '../../models/book';


@Component({
  selector: 'bc-book-authors',
  template: `
    <h5 md-subheader>Written By:</h5>
    <span>
      {{ authors | bcAddCommas }}
    </span>
  `,
  styleUrls: ['./book-authors.component.scss']
})
export class BookAuthorsComponent {
  @Input() book: Book;

  get authors() {
    return this.book.volumeInfo.authors;
  }
}
