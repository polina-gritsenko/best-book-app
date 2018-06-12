import { Component, OnDestroy, OnInit } from '@angular/core';
import { BookService } from '@app/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'best-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  public booksNumber: number;
  private subscription = new Subscription();

  constructor(private booksService: BookService) { }

  ngOnInit() {
    this.subscription.add(this.booksService.booksNumber$
      .subscribe(number => this.booksNumber = number)
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
