import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Book } from '../model/book';
import { BooksService } from '../service/books.service';
import { Subscription } from 'rxjs';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  //styleUrls: ['./book.component.css'],
  standalone: true,
  imports: [NgIf]
})
export class BookComponent implements OnInit, OnDestroy {
  selectedBook!: Book | null;
  private subscription!: Subscription;
  private route: ActivatedRoute = inject(ActivatedRoute);
  private booksService: BooksService = inject(BooksService);

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = params['id'];
      this.subscription = this.booksService.getBook(id).subscribe({
        next: (data: Book) => {
          this.selectedBook = data;
        },
        error: (_: any) => {
          this.selectedBook = null;
        }
      });
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}