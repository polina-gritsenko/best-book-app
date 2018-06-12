import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookDetailsComponent } from './book-details.component';
import { BookDetailsRoutingModule } from '@app/book-details/book-details-routing.module';
import { SharedModule } from '@app/shared';

@NgModule({
  imports: [
    BookDetailsRoutingModule,
    CommonModule,
    SharedModule
  ],
  declarations: [
    BookDetailsComponent
  ]
})
export class BookDetailsModule {

}
