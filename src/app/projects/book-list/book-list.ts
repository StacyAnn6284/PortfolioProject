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
import { SearchIconComponent } from 'core/UI/icons/search/search.component';
import { DeleteConfirmComponent } from 'core/components/delete-confirm/delete-confirm';
import { ChevronLeftComponent } from 'core/UI/icons/chevron-left/chevron-left.component';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.html',
  styleUrl: './book-list.scss',
  imports: [
    CommonModule,
    ProjectArrowComponent,
    PenEditComponent,
    TrashCanComponent,
    FormsModule,
    SearchIconComponent,
    DeleteConfirmComponent,
    ChevronLeftComponent,
  ],
})
export class BookListComponent {
  private readonly _queryClient = inject(QueryClient);
  private readonly _router = inject(Router);
  private readonly _route = inject(ActivatedRoute);
  private bookService = inject(BookService);
  public showDeleteConfirm = signal(false);
  public activeBook = signal<Book>(new Book());
  public searchTerm = signal('');
  public statusFilter = signal('');

  public expanded = signal<Record<number, boolean>>({});

  bookListQuery = injectQuery(() => ({
    queryKey: ['book-list', this.statusFilter(), this.searchTerm()],
    queryFn: () => this.bookService.getAllBooks(this.statusFilter(), this.searchTerm()),
  }));

  public bookList = computed(() => this.bookListQuery.data() ?? []);

  private readonly _bookDeleteMutation = injectMutation(() => ({
    mutationFn: (id: number) => this.bookService.deleteBook(id).toPromise(),
    onSuccess: () => {
      this._queryClient.invalidateQueries({ queryKey: ['book-list'] });
    },
  }));

  toggleExpanded(bookId: number) {
    const current = this.expanded();
    this.expanded.set({
      ...current,
      [bookId]: !current[bookId],
    });
  }

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
  deleteBook(book: Book) {
    this.showDeleteConfirm.set(true);
    this.activeBook.set(book);
  }

  handleDelete() {
    this._bookDeleteMutation.mutate(this.activeBook().id!, {
      onSuccess: () => {
        this.showDeleteConfirm.set(false);
      },
    });
  }
}
