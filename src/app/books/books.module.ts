import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BooksRoutingModule } from '@app/books/books-routing.module';
import { BooksComponent } from '@app/books/books.component';
// import { FormsModule } from '@angular/forms';
import { SharedModule } from '@app/shared';

@NgModule({
  imports: [
    BooksRoutingModule,
    CommonModule,
    SharedModule
  ],
  declarations: [
    BooksComponent
  ]
})
export class BooksModule { }
