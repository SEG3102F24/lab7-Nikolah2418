import { Routes } from '@angular/router';
import { BookComponent } from './books/book/book.component';
import { AdminComponent } from './admin/admin.component';
import { AuthorComponent } from './authors/author/author.component';

export const routes: Routes = [
  { path: 'book/:id', component: BookComponent },
  { path: 'admin', component: AdminComponent },
  { path: 'author', component: AuthorComponent },
  { path: '', redirectTo: '/book/1', pathMatch: 'full' }
];