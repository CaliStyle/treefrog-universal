import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Book } from '../../models/book';


@Component({
  selector: 'bc-book-detail',
  template: `
    <md-card *ngIf="book">
      <md-card-title-group>
        <md-card-title>{{ title }}</md-card-title>
        <md-card-subtitle *ngIf="subtitle">{{ subtitle }}</md-card-subtitle>
        <img md-card-sm-image *ngIf="thumbnail" [src]="thumbnail"/>
      </md-card-title-group>
      <md-card-content>
        <p [innerHtml]="description"></p>
      </md-card-content>
      <md-card-footer class="footer">
        <bc-book-authors [book]="book"></bc-book-authors>
      </md-card-footer>
      <md-card-actions align="end">
        <button md-raised-button *ngIf="inCollection" (click)="remove.emit(book)">
        Remove Book from Collection
        </button>

        <button md-raised-button *ngIf="!inCollection" (click)="add.emit(book)">
        Add Book to Collection
        </button>
      </md-card-actions>
    </md-card>

  `,
  styleUrls: ['./book-detail.component.scss']
})
export class BookDetailComponent {
  /**
   * Presentational components receieve data through @Input() and communicate events
   * through @Output() but generally maintain no internal state of their
   * own. All decisions are delegated to 'container', or 'smart'
   * components before data updates flow back down.
   *
   * More on 'smart' and 'presentational' components: https://gist.github.com/btroncone/a6e4347326749f938510#utilizing-container-components
   */
  @Input() book: Book;
  @Input() inCollection: boolean;
  @Output() add = new EventEmitter<Book>();
  @Output() remove = new EventEmitter<Book>();


  /**
   * Tip: Utilize getters to keep templates clean
   */
  get id() {
    return this.book.id;
  }

  get title() {
    return this.book.volumeInfo.title;
  }

  get subtitle() {
    return this.book.volumeInfo.subtitle;
  }

  get description() {
    return this.book.volumeInfo.description;
  }

  get thumbnail() {
    return this.book.volumeInfo.imageLinks.smallThumbnail;
  }
}
