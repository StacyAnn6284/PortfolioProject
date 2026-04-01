import { CommonModule } from '@angular/common';
import { Component, computed, inject, Signal } from "@angular/core";
import { Book } from "./models/book-model";
import { ProjectArrowComponent } from "../project-arrow/project-arrow";
import { PenEditComponent } from "core/UI/icons/pen-edit/pen-edit.component";
import { TrashCanComponent } from "core/UI/icons/trashcan/trashcan.component";
import { injectQuery } from '@tanstack/angular-query-experimental';
import { BookService } from "./services/book.service";
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'app-book-list',
    templateUrl: './book-list.html',
    styleUrl: './book-list.scss',
    standalone: true,
    imports: [CommonModule, ProjectArrowComponent, PenEditComponent, TrashCanComponent]
})

export class BookListComponent {
    private readonly _router = inject(Router);
  private readonly _route = inject(ActivatedRoute);
    private bookService = inject(BookService)
    
     bookListQuery = injectQuery(() => ({
        queryKey: ['book-list'],
        queryFn: () =>  this.bookService.getAllBooks()
     }));



    public bookList = computed(() => this.bookListQuery.data() ?? [])

    editBook(book: Book) {
        this._router.navigate(['../book-form-edit'], {
            relativeTo: this._route,
            state: {book: book}
        })
        console.log(book)
    }

      showForm() {
    this._router.navigate(['../book-form-create'], { relativeTo: this._route });
  }
    deleteBook(bookId: number) {
        console.log(bookId)
    }
}