import { Component, inject, Signal } from '@angular/core';
import { UserMoviesService } from '../../services/user-movies.service';
import { SavedMovieItem } from '../../model/movie.type';
import { RouterModule } from '@angular/router';
import { UserMovieListComponent } from "../../components/user-movie-list/user-movie-list.component";

@Component({
  selector: 'app-watchlist',
  imports: [RouterModule, UserMovieListComponent],
  templateUrl: './watchlist-page.component.html',
  styleUrl: './watchlist-page.component.scss',
})
export class WatchlistPageComponent {
	private userMovies = inject(UserMoviesService);

  	watchList = this.userMovies.watchList;

	remove(id: number) {
		this.userMovies.removeFromWatchList(id);
	}

  /* watchList!: Signal<SavedMovieItem[]>;
  hoveringX: number | null = null;
  
  constructor(private userMovies: UserMoviesService) {
    this.watchList = this.userMovies.watchList;
  }

  remove(movieId: number) {
    this.userMovies.removeFromWatchList(movieId);
  } */
}
