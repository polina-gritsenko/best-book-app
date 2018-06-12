import { Component, OnInit, OnDestroy } from '@angular/core';
import { Book } from '@app/shared';
import { BookService } from '@app/core';
import { Subscription } from 'rxjs';
import { AlertType } from '@app/shared/alert-type';

@Component({
  selector: 'best-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.scss']
})
export class BooksComponent implements OnInit, OnDestroy {

  public books: Book[];
  public alertMessage: string;
  public alertType: AlertType;
  public showAlert = false;


  private bookInEditStateId: number;
  private subscription = new Subscription();

  constructor(private service: BookService) { }

  getBooks() {
    this.subscription.add(this.service.list()
      .subscribe(data => {
        this.showAlert = false;
        this.books = data;
      }));
  }

  isEditState(bookId: number) {
    return bookId === this.bookInEditStateId;
  }

  editBook(bookId: number) {
    this.bookInEditStateId = bookId;
  }

  deleteBook(bookId: number) {
    this.subscription.add(this.service.delete(bookId)
      .subscribe(() => {
        this.alertMessage = 'Book deleted successfully';
        this.handleSuccessfullUpdate();
      }));
  }

  updateBook(book: Book) {
    this.subscription.add(this.service.update(book)
      .subscribe(() => {
        this.alertMessage = 'Book updated successfully';
        this.handleSuccessfullUpdate();
      }));
  }

  handleSuccessfullUpdate() {
    this.bookInEditStateId = null;
    this.showNotification(AlertType.Success);
    this.getBooks();
  }

  showNotification(alertType: AlertType) {
    this.alertType = alertType;
    this.showAlert = true;
  }

  ngOnInit() {
    this.getBooks();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
