import { Component, Signal } from '@angular/core';
import { UserMoviesService } from '../../services/user-movies.service';
import { SavedMovieItem } from '../../model/movie.type';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-watchlist',
  imports: [ RouterModule ],
  templateUrl: './watchlist-page.component.html',
  styleUrl: './watchlist-page.component.scss',
})
export class WatchlistPageComponent {
  watchList!: Signal<SavedMovieItem[]>;
  hoveringX: number | null = null;
  
  constructor(private userMovies: UserMoviesService) {
    this.watchList = this.userMovies.watchList;
  }

  remove(movieId: number) {
    this.userMovies.removeFromWatchList(movieId);
  }
}
