import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, ReactiveFormsModule, Validators } from '@angular/forms';
import { BooksService } from '../books/service/books.service';
import { Author } from '../books/model/book';
import { NgIf, NgFor } from '@angular/common';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
  standalone: true,
  imports: [ReactiveFormsModule, NgIf, NgFor]
})
export class AdminComponent implements OnInit {
  bookForm!: FormGroup;
  private fb: FormBuilder = inject(FormBuilder);
  private booksService: BooksService = inject(BooksService);
  message: string = '';
  messageType: 'error' | 'info' = 'info';

  ngOnInit(): void {
    this.bookForm = this.fb.group({
      title: ['', Validators.required],
      category: ['', Validators.required],
      isbn: ['', Validators.required],
      cost: ['', [Validators.required, Validators.min(0)]],
      year: ['', [Validators.required, Validators.min(1900)]],
      description: [''],
      authors: this.fb.array([])
    });
  }

  get authors() {
    return this.bookForm.get('authors') as FormArray;
  }

  addAuthor() {
    const authorGroup = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required]
    });
    this.authors.push(authorGroup);
  }

  removeAuthor(index: number) {
    this.authors.removeAt(index);
  }

  onSubmit() {
    if (this.bookForm.valid) {
      const book = {
        id: 0,
        ...this.bookForm.value,
        cost: Number(this.bookForm.value.cost),
        year: Number(this.bookForm.value.year)
      };

      this.booksService.addBook(book).subscribe({
        next: (response) => {
          const authors = this.bookForm.value.authors;
          authors.forEach((author: Author) => {
            this.booksService.getAuthorsNamed(author.firstName, author.lastName).subscribe({
              next: (authorList: Author[]) => {
                if (!authorList || authorList.length === 0) {
                  this.booksService.addBookAuthor(response.id, author).subscribe();
                } else {
                  this.booksService.updateBookAuthors(response.id, authorList[0].id).subscribe();
                }
              }
            });
          });
          this.showMessage('info', `Book was successfully added with id ${response.id}`);
        },
        error: (_: any) => {
          this.showMessage('error', 'Unable to add the book');
        }
      });
      this.bookForm.reset();
      this.authors.clear();
    }
  }

  private showMessage(type: 'error' | 'info', message: string) {
    this.messageType = type;
    this.message = message;
  }
}