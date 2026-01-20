import { Component, OnInit, signal } from '@angular/core';
import { MovieDetail } from '../../model/movie-detail.type';
import { MovieService } from '../../services/movie.service';
import { ActivatedRoute } from '@angular/router';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { MovieActionButtonComponent } from '../../components/movie-action-button/movie-action-button.component';
import { UserMoviesService } from '../../services/user-movies.service';
import { Movie } from '../../model/movie.type';

@Component({
  selector: 'app-movie-detail-page',
  standalone: true,
  imports: [ CommonModule, CurrencyPipe, MovieActionButtonComponent ],
  templateUrl: './movie-detail-page.component.html',
  styleUrl: './movie-detail-page.component.scss',
})
export class MovieDetailPageComponent implements OnInit {
  movieDetail = signal<MovieDetail | null>(null);
  isLoading = signal(false);
  error = signal<string | null>(null);
  genresString = signal<string>('');
  trailerKey = signal<string | null>(null);
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
      poster: detail.poster || '',   // fallback if undefined
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
