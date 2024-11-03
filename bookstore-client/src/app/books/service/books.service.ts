import { Injectable, inject } from '@angular/core';
import { Book, Author } from '../model/book';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

const API_URL = 'http://localhost:8080/books-api/';

@Injectable({
  providedIn: 'root'
})
export class BooksService {
  private http: HttpClient = inject(HttpClient);

  getBook(id: string): Observable<Book> {
    return this.http.get<Book>(`${API_URL}books/${id}`);
  }

  addBook(book: Book): Observable<Book> {
    return this.http.post<Book>(`${API_URL}books`, book);
  }

  addBookAuthor(id: number, author: Author): Observable<Author> {
    return this.http.post<Author>(`${API_URL}books/${id}/authors`, author);
  }

  getAuthorsNamed(firstName: string, lastName: string): Observable<any> {
    const options = { params: new HttpParams().set('firstName', firstName).set('lastName', lastName) };
    return this.http.get<any>(`${API_URL}authors`, options).pipe(
      map(response => response._embedded ? response._embedded.authors : undefined)
    );
  }

  updateBookAuthors(bookId: number, authorId: number): Observable<any> {
    return this.http.patch(`${API_URL}books/${bookId}/authors/${authorId}`, {});
  }
}