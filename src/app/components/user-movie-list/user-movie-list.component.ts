import { Component, EventEmitter, Input, Output, Signal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SavedMovieItem } from '../../model/movie.type';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-movie-list',
  standalone: true,
  imports: [ RouterModule, CommonModule ],
  templateUrl: './user-movie-list.component.html',
  styleUrl: './user-movie-list.component.scss',
})
export class UserMovieListComponent {
	@Input({ required: true }) title!: string;
	@Input() icon: 'heart' | 'bookmark' | 'star' = 'heart';
	@Input() colorClass = 'text-red-500';

	// Data
	@Input({ required: true }) movies!: Signal<SavedMovieItem[]>;
	@Input() emptyText = 'No movies yet.';

	// Events
	@Output() remove = new EventEmitter<number>();

	hoveringX: number | null = null;

	onRemove(movieId: number, event: Event) {
		event.stopPropagation();
		this.remove.emit(movieId);
	}
}
