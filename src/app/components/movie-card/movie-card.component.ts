import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Movie } from '../../model/movie.type';

@Component({
  selector: 'app-movie-card',
  standalone: true,
  imports: [],
  templateUrl: './movie-card.component.html',
  styleUrl: './movie-card.component.scss',
})
export class MovieCardComponent {
  @Input({ required: true }) movie!: Movie;

  @Output() addToFavourites = new EventEmitter<Movie>();
  @Output() addToWatchList = new EventEmitter<Movie>();

  onFavouriteClick() {
    this.addToFavourites.emit(this.movie);
  }

  onWatchListClick() {
    this.addToWatchList.emit(this.movie);
  }
}
