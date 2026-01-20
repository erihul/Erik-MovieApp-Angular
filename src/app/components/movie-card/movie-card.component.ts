import { Component, EventEmitter, Input, Output, signal } from '@angular/core';
import { Movie } from '../../model/movie.type';
import { MovieService } from '../../services/movie.service';
import { DurationPipe } from '../../pipes/duration-pipe';
import { RouterModule } from '@angular/router';
import { UserMoviesService } from '../../services/user-movies.service';
import { CommonModule } from '@angular/common';
import { MovieActionButtonComponent } from '../movie-action-button/movie-action-button.component';

@Component({
  selector: 'app-movie-card',
  standalone: true,
  imports: [ DurationPipe, RouterModule, CommonModule, MovieActionButtonComponent ],
  templateUrl: './movie-card.component.html',
  styleUrl: './movie-card.component.scss',
})
export class MovieCardComponent {
  @Input({ required: true }) movie!: Movie;
  
  @Output() addToFavourites = new EventEmitter<Movie>();
  @Output() addToWatchList = new EventEmitter<Movie>();

  showDetails = signal(false);
  runtime = signal<number | null>(null);
  loading = signal(false);

  constructor(private movieService: MovieService,
      private userMovies: UserMoviesService) {}
  
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

  showMoreDetailsClick() {
    if (this.showDetails()) {
      this.showDetails.set(false);
      return;
    }

    if (this.runtime()) {
      this.showDetails.set(true);
      return;
    }

    this.loading.set(true);

    this.movieService.getMovieCardDetail(this.movie.id).subscribe(details => {
      this.runtime.set(details.runtime);
      this.showDetails.set(true);
      this.loading.set(false);
    });
  }
}
