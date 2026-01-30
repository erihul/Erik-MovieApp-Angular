import { Component, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Movie, MovieDetails } from '../../model/movie.model';
import { MovieActionButtonComponent } from '../../components/movie-action-button/movie-action-button.component';
import { UserMoviesService } from '../../services/user-movies.service';
@Component({
  selector: 'app-movie-detail-page',
  standalone: true,
  imports: [CommonModule, CurrencyPipe, MovieActionButtonComponent],
  templateUrl: './movie-detail-page.component.html',
  styleUrl: './movie-detail-page.component.scss',
})
export class MovieDetailPageComponent implements OnInit {
  movie = signal<MovieDetails | null>(null);
  error = signal<string | null>(null);
  trailerUrl = signal<SafeResourceUrl | null>(null);

  constructor(
    private route: ActivatedRoute,
    private sanitizer: DomSanitizer,
    private userMovies: UserMoviesService
  ) {}

  ngOnInit(): void {
    const resolvedMovie = this.route.snapshot.data['movie'] as MovieDetails | null;

    if (!resolvedMovie) {
      this.error.set('Movie could not be loaded');
      return;
    }

    this.movie.set(resolvedMovie);

    if (resolvedMovie.trailerKey) {
      this.trailerUrl.set(
        this.sanitizer.bypassSecurityTrustResourceUrl(
          `https://www.youtube.com/embed/${resolvedMovie.trailerKey}`
        )
      );
    }
  }

  // ---------- favourites / watchlist ----------

  private toMovie(movie: MovieDetails): Movie {
    return {
      id: movie.id,
      title: movie.title,
      posterUrl: movie.posterUrl,
      backdropUrl: movie.backdropUrl,
      year: movie.year,
      rating: movie.rating,
      description: movie.description,
      adult: movie.adult,
      language: movie.language,
      popularity: movie.popularity,
    };
  }

  isFavourite(): boolean {
    const movie = this.movie();
    return !!movie && this.userMovies.favourites().some(m => m.id === movie.id);
  }

  toggleFavourite(): void {
    const movie = this.movie();
    if (!movie) return;

    const lightMovie = this.toMovie(movie);

    this.isFavourite()
      ? this.userMovies.removeFromFavourites(movie.id)
      : this.userMovies.addToFavourites(lightMovie);
  }

  isInWatchlist(): boolean {
    const movie = this.movie();
    return !!movie && this.userMovies.watchList().some(m => m.id === movie.id);
  }

  toggleWatchlist(): void {
    const movie = this.movie();
    if (!movie) return;

    const lightMovie = this.toMovie(movie);

    this.isInWatchlist()
      ? this.userMovies.removeFromWatchList(movie.id)
      : this.userMovies.addToWatchList(lightMovie);
  }
}




/* export class MovieDetailPageComponent implements OnInit {
  movieDetail = signal<MovieDetail | null>(null);
  isLoading = signal(false);
  error = signal<string | null>(null);
  genresString = signal<string>('');
  trailerUrl = signal<SafeResourceUrl | null>(null);

  constructor(
    private movieService: MovieService,
    private route: ActivatedRoute,
    private sanitizer: DomSanitizer,
    private userMovies: UserMoviesService
  ) {}

  private movieDetailToMovie(detail: MovieDetail): Movie {
    return {
      id: detail.id,
      title: detail.title,
      poster: detail.poster || '',
      year: detail.year || 0,
      rating: detail.rating || 0,
      description: detail.description || '',
    };
  }

  isFavourite(): boolean {
    const movie = this.movieDetail();
    if (!movie) return false;

    return this.userMovies.favourites().some(m => m.id === movie.id);
  }
  toggleFavourite(): void {
      const movieDetail = this.movieDetail();
      if (!movieDetail) return;

      const movie = this.movieDetailToMovie(movieDetail);

      if (this.isFavourite()) {
        this.userMovies.removeFromFavourites(movie.id);
      } else {
        this.userMovies.addToFavourites(movie);
      }
    }
    isInWatchlist(): boolean {
    const movie = this.movieDetail();
    if (!movie) return false;

    return this.userMovies.watchList().some(m => m.id === movie.id);
  }

    toggleWatchlist(): void {
      const movieDetail = this.movieDetail();
      if (!movieDetail) return;

      const movie = this.movieDetailToMovie(movieDetail);

      if (this.isInWatchlist()) {
        this.userMovies.removeFromWatchList(movie.id);
      } else {
        this.userMovies.addToWatchList(movie);
      }
    }
  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.loadMovie(+id);
      } else {
        this.error.set('Movie ID not found');
      }
    });
  }
 
  loadMovie(movieId: number) {
    this.isLoading.set(true);
    this.error.set(null);

    this.movieService.getMovieDetails(movieId).subscribe({
      next: details => {
        this.movieDetail.set(details);
        this.genresString.set(
          details.genres?.map(g => g.name).join(', ') || ''
        );
        this.isLoading.set(false);
      },
      error: () => {
        this.error.set('Failed to load movie details');
        console.log("FEL FEL, ingen film hittades")
        this.isLoading.set(false);
      }
    });

    this.movieService.getMovieTrailer(movieId).subscribe(key => {
      if (key) {
        this.trailerUrl.set(
          this.sanitizer.bypassSecurityTrustResourceUrl(
            `https://www.youtube.com/embed/${key}`
          )
        );
      } else {
        this.trailerUrl.set(null);
      }
    });
  }
}
 */