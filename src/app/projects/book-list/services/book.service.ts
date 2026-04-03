import { inject, Injectable } from '@angular/core';
import { Book } from '../models/book-model';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root',
})
export class BookService {
  private url = 'https://portfoliobackend-production.up.railway.app/api/books';
  private http = inject(HttpClient);

  getAllBooks(filter: string, searchTerm: string): Promise<Book[]> {
    const url = filter ? `${this.url}?filter=${filter}` 
    : searchTerm ? `${this.url}?search=${searchTerm}` : this.url
    return fetch(url).then((res) => res.json()).then((json) => {
      const data = json.data ?? [];
      return [...data].sort((a, b) => a.id - b.id)
    });
  }

  getBookById(id: Number): Promise<Book> {
    return fetch(`${this.url}/${id}`).then((res) => res.json().then((json) => json.data ?? {}));
  }

  editBook(book: Book) {
    return this.http.put<Book>(`${this.url}/${book.id}`, book);
  }

  createBook(book: Book) {
    return this.http.post<Book>(this.url, book);
  }

  deleteBook(id: number) {
    return this.http.delete<Book>(`${this.url}/${id}`);
  }

}
