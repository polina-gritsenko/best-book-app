import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Book } from '@app/shared';
import { Helper } from '@app/shared/helper';
import { BookService } from '@app/core';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { dateFormatValidator } from '@app/shared/date-format-validator';

@Component({
  selector: 'best-book-details',
  templateUrl: './book-details.component.html'
})
export class BookDetailsComponent implements OnInit, OnDestroy {
  public bookForm: FormGroup;
  private subscription = new Subscription();

  constructor(
    private formBuilder: FormBuilder,
    private service: BookService,
    private router: Router
  ) { }

  buildForm() {
    this.bookForm = this.formBuilder.group({
      name: ['', Validators.required],
      author: ['', Validators.required],
      year: ['', Validators.required],
      addedAt: ['', [Validators.required, dateFormatValidator]],
      review: ''
    });
  }

  onSubmit() {
    if (this.bookForm.invalid) {
      Helper.validateAllFormFields(this.bookForm);
    } else {
      const book = { ...this.bookForm.value } as Book;
      this.saveBook(book);
    }
  }

  isControlInvalid(controlName: string): boolean {
    return Helper.isControlInvalid(this.bookForm, controlName);
  }

  saveBook(book: Book) {
    this.subscription.add(this.service.create(book).subscribe(() =>
      this.navigateToBookList()
    ));
  }

  navigateToBookList(): void {
    this.router.navigate(['/books']);
  }

  ngOnInit(): void {
    this.buildForm();
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
