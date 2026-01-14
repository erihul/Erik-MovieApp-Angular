import { Component, EventEmitter, Input, Output, signal } from '@angular/core';
import { Movie } from '../../model/movie.type';
import { MovieService } from '../../services/movie.service';
import { DurationPipe } from '../../pipes/duration-pipe';

@Component({
  selector: 'app-movie-card',
  standalone: true,
  imports: [ DurationPipe ],
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

  constructor(private movieService: MovieService) {}

  onFavouriteClick() {
    this.addToFavourites.emit(this.movie);
  }

  onWatchListClick() {
    this.addToWatchList.emit(this.movie);
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

    this.movieService.getMovieDetails(this.movie.id).subscribe(details => {
      this.runtime.set(details.runtime);
      this.showDetails.set(true);
      this.loading.set(false);
    });
  }
}
