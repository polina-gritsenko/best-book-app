import { Injectable, OnDestroy } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject, Subscription } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Book } from '@app/shared';
import { CoreModule } from '@app/core/core.module';

@Injectable({
  providedIn: CoreModule
})
export class BookService implements OnDestroy {

  private subscription = new Subscription();

  // Observable booksNumber source
  private bookNumberSource = new BehaviorSubject<number>(0);

  // Observable booksNumber stream
  public booksNumber$ = this.bookNumberSource.asObservable();

  private headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  private apiUrl = '/api/books';

  constructor(private http: HttpClient) {
    this.setInitialBooksNumber();
  }

  list(): Observable<Book[]> {
    return this.http.get<Book[]>(this.apiUrl)
      .pipe(
        catchError(error => {
          return Observable.throw(error);
        })
      );
  }

  setInitialBooksNumber(): void {
    this.subscription.add(this.http.get<Book[]>(`${this.apiUrl}`)
      .subscribe(books =>
        this.bookNumberSource.next(books.length)
      ));
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  delete(id: number): Observable<Book> {
    const nextBookNumber = this.bookNumberSource.getValue() - 1;

    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<Book>(url, { headers: this.headers })
      .pipe(
        tap(() => {
          this.updateBookNumber(nextBookNumber);
        }),
        catchError(error => {
          return Observable.throw(error);
        })
      );
  }

  update(book: Book): Observable<any> {
    const url = `${this.apiUrl}/${book.id}`;

    return this.http.put(url, book, { headers: this.headers })
      .pipe(
        catchError(error => {
          return Observable.throw(error);
        })
      );
  }

  create(book: Book): Observable<Book> {
    const nextBookNumber = this.bookNumberSource.getValue() + 1;

    return this.http.post<Book>(this.apiUrl, book, { headers: this.headers })
      .pipe(
        tap(() => {
          this.updateBookNumber(nextBookNumber);
        }),
        catchError(error => {
          return Observable.throw(error);
        })
      );
  }

  updateBookNumber(value) {
    this.bookNumberSource.next(value);
  }

}
