import { Component, OnInit, signal } from '@angular/core';
import { MovieCardComponent } from "../movie-card/movie-card.component";
import { MovieService } from '../../services/movie.service';
import { Movie } from '../../model/movie.type';
import { catchError, map } from 'rxjs';

@Component({
  selector: 'app-movie-list',
  standalone: true,
  imports: [MovieCardComponent],   /* CommonModule	@angular/common	To use NgIf and NgFor. */
  templateUrl: './movie-list.component.html',
  styleUrl: './movie-list.component.scss',
})
export class MovieListComponent implements OnInit{

  moviesArray = signal<readonly Movie[]>([]);
  favourites = signal<string[]>([]);
  watchList = signal<string[]>([]);

  constructor(private movieService: MovieService) {}

  ngOnInit() {
  this.movieService.getMoviesFromApi()
    .pipe(
      map(res => res.results),
      catchError(err => {
        console.error(err);
        throw err;
      })
    )
    .subscribe(movies => {
      this.moviesArray.set(movies);
      console.log(this.moviesArray())
    });
}

 onAddToFavourites(movie: Movie) {
    this.favourites.update(list => [...list, movie.title]);
  }

  onAddToWatchList(movie: Movie) {
    this.watchList.update(list => [...list, movie.title]);
  }

}

