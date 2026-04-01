import { inject, Injectable } from "@angular/core";
import { Book } from "../models/book-model";
import { HttpClient } from "@angular/common/http";
@Injectable ({
    providedIn: 'root'
})

export class BookService{
  private url = "https://portfoliobackend-production.up.railway.app/api/book"
  private http = inject(HttpClient)

async getAllBooks() : Promise<Book[]> {
   const data = await fetch(this.url).then(res => res.json()).then(json => json.data);
    return await data ?? [];
}

async getBookById(id: Number) : Promise<Book> {
    const data = await fetch(`${this.url}/${id}`).then(res => res.json().then(json => json.data))
    return await data ?? {}
}

editBook(book: Book) {
 return this.http.put<Book>(`${this.url}/${book.id}`, book)
}

createBook(book:Book) {
 return this.http.post<Book>(this.url, book)
}

deleteBook(id: number) {
 return this.http.delete<Book>(`${this.url}/${id}`)   
}

}