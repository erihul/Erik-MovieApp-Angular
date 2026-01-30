// src/app/services/user-movies.service.ts
import { Injectable, signal } from '@angular/core';
import { Movie } from '../model/movie.model';

@Injectable({ providedIn: 'root' })
export class UserMoviesService {
  favourites = signal<Movie[]>([]);
  watchList = signal<Movie[]>([]);

  addToFavourites(movie: Movie) {
    if (!this.favourites().some(m => m.id === movie.id)) {
      this.favourites.update(list => [...list, movie]);
    }
  }
  removeFromFavourites(movieId: number) {
    this.favourites.update(list => list.filter(m => m.id !== movieId));
  }
  addToWatchList(movie: Movie) {
    if (!this.watchList().some(m => m.id === movie.id)) {
      this.watchList.update(list => [...list, movie]);
    }
  }
  removeFromWatchList(movieId: number) {
    this.watchList.update(list => list.filter(m => m.id !== movieId));
  }
}
