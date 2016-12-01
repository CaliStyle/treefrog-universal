import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule }   from '@angular/router';
import { MaterialModule } from '@angular/material';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { SlimLoadingBarModule } from './loader/loader.module';
import { Typeahead } from './typeahead/typeahead.component';
import { BookAuthorsComponent } from './book/book-authors';
import { BookDetailComponent } from './book/book-detail';
import { BookPreviewComponent } from './book/book-preview';
import { BookPreviewListComponent } from './book/book-preview-list';
import { BookSearchComponent } from './book/book-search';
import { LayoutComponent } from './book/layout';
import { NavItemComponent } from './book/nav-item';
import { SidenavComponent } from './book/sidenav';
import { ToolbarComponent } from './book/toolbar';
import { PublishedPipe } from './pipes/published.pipe';
import { TruncatePipe } from './pipes/truncate.pipe';
import { EllipsisPipe } from './pipes/ellipsis.pipe';
import { AddCommasPipe } from './pipes/add-commas.pipe';
import { Share } from './share/share.module';

@NgModule({
    imports: [
      CommonModule,
      RouterModule,
      MaterialModule.forRoot(),
      ReactiveFormsModule,
      FormsModule,
      SlimLoadingBarModule.forRoot(),
      Share
    ],
    declarations: [
      Typeahead,
      PublishedPipe,
      TruncatePipe,
      AddCommasPipe,
      EllipsisPipe,
      BookAuthorsComponent,
      BookDetailComponent,
      BookPreviewComponent,
      BookPreviewListComponent,
      BookSearchComponent,
      LayoutComponent,
      NavItemComponent,
      SidenavComponent,
      ToolbarComponent,
    ],
    providers: [],
    exports: [
      SlimLoadingBarModule,
      Typeahead,
      PublishedPipe,
      TruncatePipe,
      AddCommasPipe,
      EllipsisPipe,
      Share,
      BookAuthorsComponent,
      BookDetailComponent,
      BookPreviewComponent,
      BookPreviewListComponent,
      BookSearchComponent,
      LayoutComponent,
      NavItemComponent,
      SidenavComponent,
      ToolbarComponent,
    ]
})
export class ComponentsModule {}
