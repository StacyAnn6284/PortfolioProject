import { CommonModule } from '@angular/common';
import { Component, computed, inject, signal, Signal } from '@angular/core';
import { Book } from './models/book-model';
import { ProjectArrowComponent } from '../project-arrow/project-arrow';
import { PenEditComponent } from 'core/UI/icons/pen-edit/pen-edit.component';
import { TrashCanComponent } from 'core/UI/icons/trashcan/trashcan.component';
import { injectMutation, injectQuery, QueryClient } from '@tanstack/angular-query-experimental';
import { BookService } from './services/book.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.html',
  styleUrl: './book-list.scss',
  standalone: true,
  imports: [CommonModule, ProjectArrowComponent, PenEditComponent, TrashCanComponent, FormsModule],
})
export class BookListComponent {
  private readonly _queryClient = inject(QueryClient);
  private readonly _router = inject(Router);
  private readonly _route = inject(ActivatedRoute);
  private bookService = inject(BookService);

  statusFilter = signal('');

  bookListQuery = injectQuery(() => ({
    queryKey: ['book-list', this.statusFilter()],
    queryFn: () => this.bookService.getAllBooks(this.statusFilter()),
  }));

  public bookList = computed(() => this.bookListQuery.data() ?? []);

  private readonly _bookDeleteMutation = injectMutation(() => ({
    mutationFn: (id: number) => this.bookService.deleteBook(id).toPromise(),
    onSuccess: () => {
      this._queryClient.invalidateQueries({ queryKey: ['book-list'] });
    },
  }));

  editBook(book: Book) {
    this._router.navigate(['../book-form-edit'], {
      relativeTo: this._route,
      state: { book: book },
    });
    console.log(book);
  }

  showForm() {
    this._router.navigate(['../book-form-create'], { relativeTo: this._route });
  }
  deleteBook(bookId: number) {
    this._bookDeleteMutation.mutate(bookId, {
      onSuccess: () => {
        console.log('book successfully deleted');
      },
    });
  }
}
