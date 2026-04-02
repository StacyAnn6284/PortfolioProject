import { inject, Injectable } from '@angular/core';
import { Book } from '../models/book-model';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root',
})
export class BookService {
  private url = 'https://portfoliobackend-production.up.railway.app/api/books';
  private http = inject(HttpClient);

  getAllBooks(filter: string): Promise<Book[]> {
    if (filter === '' || filter === 'All') {
      const data = fetch(this.url)
        .then((res) => res.json())
        .then((json) => json.data);
      return data ?? [];
    }
    const data = fetch(`${this.url}?filter=${filter}`)
      .then((res) => res.json())
      .then((json) => json.data);
    return data ?? [];
  }

  getBookById(id: Number): Promise<Book> {
    const data = fetch(`${this.url}/${id}`).then((res) => res.json().then((json) => json.data));
    return data ?? {};
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
