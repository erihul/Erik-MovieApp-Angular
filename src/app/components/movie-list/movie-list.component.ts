import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MovieCardComponent } from "../movie-card/movie-card.component";
import { Movie } from '../../model/movie.model';

type MovieCategory = 'now_playing' | 'popular' | 'top_rated' | 'upcoming';
@Component({
  selector: 'app-movie-list',
  standalone: true,
  imports: [MovieCardComponent],
  templateUrl: './movie-list.component.html',
  styleUrl: './movie-list.component.scss',
})
export class MovieListComponent {	
	@Input({ required: true }) movies: Movie[] = [];
	@Input() isLoading = false;

	@Output() loadMore = new EventEmitter<void>();
	@Output() addToFavourites = new EventEmitter<Movie>();
	@Output() addToWatchList = new EventEmitter<Movie>();
}


/* export class MovieListComponent {

  private _category!: MovieCategory;

  currentPage = 1;
  isLoading = false;

  moviesArray = signal<readonly Movie[]>([]);

  @Input()
  set category(value: MovieCategory) {
    if (this._category !== value) {
      this._category = value;
      this.resetAndLoad();
    }
  }

  get category() {
    return this._category;
  }

  constructor(
    private movieService: MovieService,
    private userMovies: UserMoviesService,
    private homeState: HomeStateService
  ) {
    this.currentPage = this.homeState.currentPage;
    this._category = this.homeState.category;
    if (this.homeState.movies.length > 0) {
      this.moviesArray.set(this.homeState.movies);
    } else {      
      this.loadMovies();
    }
  }

  private resetAndLoad() {
      this.homeState.category = this._category;
      this.homeState.movies = [];
      this.homeState.currentPage = 1;

      this.currentPage = 1;
      this.moviesArray.set([]);

      this.loadMovies();
  }

  loadMovies() {
    if (this.isLoading) return;

    this.isLoading = true;

    this.movieService
      .getMoviesFromApi(this._category, this.currentPage)
      .subscribe({
        next: movies => {
			const updated = [...this.moviesArray(), ...movies];
			this.moviesArray.set(updated);

			this.homeState.movies = updated;
			this.homeState.currentPage = this.currentPage + 1;
			this.currentPage++;

			queueMicrotask(() => {
					this.isLoading = false;
			});
        },
			error: err => {
			console.error(err);
			this.isLoading = false;
        }
      });
  }

  onAddToFavourites(movie: Movie) {
    this.userMovies.addToFavourites(movie);
  }

  onAddToWatchList(movie: Movie) {
    this.userMovies.addToWatchList(movie);
  }
}
 */