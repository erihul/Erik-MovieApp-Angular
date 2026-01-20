// src/app/services/user-movies.service.ts
import { Injectable, signal } from '@angular/core';
import { Movie, SavedMovieItem } from '../model/movie.type';

@Injectable({ providedIn: 'root' })
export class UserMoviesService {
  favourites = signal<SavedMovieItem[]>([]);
  watchList = signal<SavedMovieItem[]>([]);

  addToFavourites(movie: Movie) {
    if (!this.favourites().some(m => m.id === movie.id)) {
      this.favourites.update(list => [
        ...list,
        { id: movie.id, title: movie.title, poster: movie.poster }
      ]);
    }
  }
  removeFromFavourites(movieId: number) {
    this.favourites.update(list => list.filter(m => m.id !== movieId));
  }

  addToWatchList(movie: Movie) {
    if (!this.watchList().some(m => m.id === movie.id)) {
      this.watchList.update(list => [
        ...list,
        { id: movie.id, title: movie.title, poster: movie.poster }
      ]);
    }
  }
  removeFromWatchList(movieId: number) {
    this.watchList.update(list => list.filter(m => m.id !== movieId));
  }
}
