import { Component, inject } from '@angular/core';
import { UserMoviesService } from '../../services/user-movies.service';
import { RouterModule } from '@angular/router';
import { UserMovieListComponent } from '../../components/user-movie-list/user-movie-list.component';

@Component({
  selector: 'app-favourites',
  imports: [ RouterModule, UserMovieListComponent ],
  templateUrl: './favourites-page.component.html',
  styleUrl: './favourites-page.component.scss',
})
export class FavouritesPageComponent {

	private userMovies = inject(UserMoviesService);

  	favourites = this.userMovies.favourites;

	remove(id: number) {
		this.userMovies.removeFromFavourites(id);
	}

  /* favourites!: Signal<SavedMovieItem[]>;
  hoveringX: number | null = null;

  constructor(private userMovies: UserMoviesService) {
    this.favourites = this.userMovies.favourites;
  }

  remove(movieId: number) {
    this.userMovies.removeFromFavourites(movieId);
  } */

}
