import { Component, EventEmitter, Output, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { LetterNumberMinLengthDirective } from '../../../../shared/directives/letter-number-min-length.directive';
import {
  debounceTime,
  distinctUntilChanged,
  filter,
  map,
  Subject,
  Subscription,
} from 'rxjs';

@Component({
  selector: 'app-search-bar',
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    LetterNumberMinLengthDirective,
  ],
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.css',
})
export class SearchBarComponent {
  searchTerm: string = '';
  @Output() search = new EventEmitter<string>();

  private searchSubject = new Subject<string>();
  private searchSubscription?: Subscription;

  ngOnInit(): void {
    this.searchSubscription = this.searchSubject
      .pipe(
        debounceTime(1000),
        distinctUntilChanged(),
        map((term) => term.trim()),
        filter((term) => {
          const alphanumericRegex = /^[a-zA-Z0-9\s]*$/;
          if (term && (term.length < 3 || !alphanumericRegex.test(term))) {
            this.search.emit('');
            return false;
          }
          return term.length === 0 || term.length >= 3;
        })
      )
      .subscribe((term) => {
        this.search.emit(term);
      });
  }

  ngOnDestroy(): void {
    this.searchSubscription?.unsubscribe();
  }

  onSearchInputChange(value: string): void {
    this.searchTerm = value;
    this.searchSubject.next(value);
  }

  clearSearch(): void {
    this.searchTerm = '';
    this.searchSubject.next('');
  }
}
