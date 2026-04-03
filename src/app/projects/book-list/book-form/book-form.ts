import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { BookService } from '../services/book.service';
import { Book } from '../models/book-model';
import { ActivatedRoute, Router } from '@angular/router';
import { injectMutation, QueryClient } from '@tanstack/angular-query-experimental';
import { StarRatingComponent } from 'core/components/star-rating/star-rating';

@Component({
  selector: 'app-book-form',
  imports: [CommonModule, ReactiveFormsModule, StarRatingComponent],
  templateUrl: './book-form.html',
  styleUrl: './book-form.scss',
})
export class BookFormComponent implements OnInit {
  private readonly _queryClient = inject(QueryClient);
  private readonly _router = inject(Router);
  public readonly rating = signal<number | null>(null);
  private readonly _route = inject(ActivatedRoute);
  bookForm!: FormGroup;
  public book: Book | null = null;
  private readonly _bookUpdateMutation = injectMutation(() => ({
    mutationFn: (target: Book) => this.BookService.editBook(target).toPromise(),
    onSuccess: () => {
      this._queryClient.invalidateQueries({ queryKey: ['book-list'] });
    },
  }));

  private readonly _bookCreateMutation = injectMutation(() => ({
    mutationFn: (target: Book) => this.BookService.createBook(target).toPromise(),
    onSuccess: () => {
      this._queryClient.invalidateQueries({ queryKey: ['book-list'] });
    },
  }));

  constructor(
    private fb: FormBuilder,
    private BookService: BookService,
  ) {}

  ngOnInit() {
    this.book = history.state.book ?? null;

    this.bookForm = this.fb.group({
      title: new FormControl(this.book?.title ?? '', [
        Validators.required,
        Validators.maxLength(100),
      ]),
      author: new FormControl(this.book?.author ?? '', [
        Validators.required,
        Validators.maxLength(100),
      ]),
      status: new FormControl(this.book?.status ?? 'not started'),
      notes: new FormControl(this.book?.notes ?? '', [Validators.maxLength(500)]),
      rating: new FormControl(this.book?.rating ?? null),
    });
  }

  setRating(rating: number) {
    this.rating.set(rating);
  }

  onSubmit() {
    if (!this.bookForm.valid) {
      this.bookForm.markAllAsTouched();
      return;
    }

    const formValue = this.bookForm.value as Book;

    if (this.book?.id) {
      const updateBookData = { ...formValue, id: this.book.id, rating: this.rating() };
      this._bookUpdateMutation.mutate(updateBookData, {
        onSuccess: () => {
          this._router.navigate(['../book-list'], { relativeTo: this._route });
        },
      });
    } else {
      const createBookData = { ...formValue, rating: this.rating() };
      this._bookCreateMutation.mutate(createBookData, {
        onSuccess: () => {
          this._router.navigate(['../book-list'], { relativeTo: this._route });
        },
      });
    }
  }

  handleCancel() {
    this._router.navigate(['../book-list'], { relativeTo: this._route });
  }
}
