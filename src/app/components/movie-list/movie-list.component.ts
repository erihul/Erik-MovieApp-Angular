import { Component, OnInit, signal } from '@angular/core';
import { MovieCardComponent } from "../movie-card/movie-card.component";
import { MovieService } from '../../services/movie.service';
import { Movie, SavedMovieItem } from '../../model/movie.type';

@Component({
  selector: 'app-movie-list',
  standalone: true,
  imports: [MovieCardComponent],
  templateUrl: './movie-list.component.html',
  styleUrl: './movie-list.component.scss',
})
export class MovieListComponent implements OnInit{

  moviesArray = signal<readonly Movie[]>([]);
  favourites = signal<SavedMovieItem[]>([]);
  watchList = signal<SavedMovieItem[]>([]);

  constructor(private movieService: MovieService) {}

  ngOnInit() {
  this.movieService.getMoviesFromApi().subscribe({
    next: movies => this.moviesArray.set(movies),
    error: err => console.error(err)
  });
}

 onAddToFavourites(movie: Movie) {
    this.favourites.update(list => [...list, { 
      id: movie.id, title: movie.title, poster: movie.poster }]);
  }

  onAddToWatchList(movie: Movie) {
    this.watchList.update(list => [...list, { 
      id: movie.id, title: movie.title, poster: movie.poster }]);
  }

}
