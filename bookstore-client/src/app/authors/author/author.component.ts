import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthorsService } from '../service/author.service';
import { Author } from '../../books/model/book';
import { Subscription } from 'rxjs';
import { NgIf, NgFor } from '@angular/common';

@Component({
  selector: 'app-author',
  templateUrl: './author.component.html',
  styleUrls: ['./author.component.css'],
  standalone: true,
  imports: [ReactiveFormsModule, NgIf, NgFor]
})
export class AuthorComponent implements OnInit, OnDestroy {
  authorForm!: FormGroup;
  selectedAuthor: Author | null = null;
  errorMessage: string = '';
  private subscription!: Subscription;
  private authorsService: AuthorsService = inject(AuthorsService);
  private fb: FormBuilder = inject(FormBuilder);

  ngOnInit(): void {
    this.authorForm = this.fb.group({
      authorId: ['', [Validators.required, Validators.pattern('[0-9]+')]]
    });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  onSubmit(): void {
    if (this.authorForm.valid) {
      const id = this.authorForm.value.authorId;
      this.subscription = this.authorsService.getAuthor(id).subscribe({
        next: (author: Author) => {
          this.selectedAuthor = author;
          this.errorMessage = '';
        },
        error: (_: any) => {
          this.selectedAuthor = null;
          this.errorMessage = `Author with ID ${id} not found`;
        }
      });
    }
  }
}