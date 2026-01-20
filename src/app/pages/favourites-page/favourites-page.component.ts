import { Component, Signal } from '@angular/core';
import { UserMoviesService } from '../../services/user-movies.service';
import { SavedMovieItem } from '../../model/movie.type';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-favourites',
  imports: [ RouterModule ],
  templateUrl: './favourites-page.component.html',
  styleUrl: './favourites-page.component.scss',
})
export class FavouritesPageComponent {
  favourites!: Signal<SavedMovieItem[]>;
  hoveringX: number | null = null;

  constructor(private userMovies: UserMoviesService) {
    this.favourites = this.userMovies.favourites;
  }

  remove(movieId: number) {
    this.userMovies.removeFromFavourites(movieId);
  }

}
