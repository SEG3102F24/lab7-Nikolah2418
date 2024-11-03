import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Author } from '../../books/model/book';

const API_URL = 'http://localhost:8080/books-api/';

@Injectable({
  providedIn: 'root'
})
export class AuthorsService {
  private http: HttpClient = inject(HttpClient);

  getAuthor(id: string): Observable<Author> {
    return this.http.get<Author>(`${API_URL}authors/${id}`);
  }
}