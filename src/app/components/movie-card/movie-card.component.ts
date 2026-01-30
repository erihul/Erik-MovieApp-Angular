import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Movie } from '../../model/movie.model';
import { RouterModule } from '@angular/router';
import { UserMoviesService } from '../../services/user-movies.service';
import { CommonModule } from '@angular/common';
import { MovieActionButtonComponent } from '../movie-action-button/movie-action-button.component';

@Component({
  selector: 'app-movie-card',
  standalone: true,
  imports: [ RouterModule, CommonModule, MovieActionButtonComponent ],
  templateUrl: './movie-card.component.html',
  styleUrl: './movie-card.component.scss',
})
export class MovieCardComponent {
	@Input({ required: true }) movie!: Movie;

	@Output() addToFavourites = new EventEmitter<Movie>();
	@Output() addToWatchList = new EventEmitter<Movie>();

	constructor(private userMovies: UserMoviesService) {}

	isFavourite() {
		return this.userMovies.favourites().some(m => m.id === this.movie.id);
	}
	isInWatchlist() {
		return this.userMovies.watchList().some(m => m.id === this.movie.id);
	}
	toggleFavourite() {
		if (this.isFavourite()) {
		this.userMovies.removeFromFavourites(this.movie.id);
		} else {
		this.userMovies.addToFavourites(this.movie);
		}
	}
	toggleWatchlist() {
		if (this.isInWatchlist()) {
		this.userMovies.removeFromWatchList(this.movie.id);
		} else {
		this.userMovies.addToWatchList(this.movie);
		}
	}
}
