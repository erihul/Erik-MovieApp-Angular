import { Routes } from '@angular/router';
import { MovieGuard } from './guards/movie.guard';
import { MovieListResolver } from './guards/movieList.resolver';
import { MovieResolver } from './guards/movie.resolver';

export const routes: Routes = [
	{ path: '', redirectTo: 'now_playing', pathMatch: 'full' },
	{ path: 'now_playing', loadComponent: () => import('./pages/now-playing-movie-page/now-playing-movie-page.component')
		.then(m => m.NowPlayingMoviePageComponent), resolve: { data: MovieListResolver } },
	{ path: 'popular', loadComponent: () => import('./pages/popular-movie-page/popular-movie-page.component')
		.then(m => m.PopularMoviePageComponent), resolve: { data: MovieListResolver }  },
	{ path: 'top_rated', loadComponent: () => import('./pages/top-rated-movie-page/top-rated-movie-page.component')
		.then(m => m.TopRatedMoviePageComponent), resolve: { data: MovieListResolver }  },
	{ path: 'upcoming', loadComponent: () => import('./pages/upcoming-movie-page/upcoming-movie-page.component')
		.then(m => m.UpcomingMoviePageComponent), resolve: { data: MovieListResolver }  },
	{ path: 'favourites', loadComponent: () => import('./pages/favourites-page/favourites-page.component')
		.then(m => m.FavouritesPageComponent), },
	{ path: 'watchlist', loadComponent: () => import('./pages/watchlist-page/watchlist-page.component')
		.then(m => m.WatchlistPageComponent), },
	{ path: 'movie/:id', loadComponent: () => import('./pages/movie-detail-page/movie-detail-page.component')
		.then(m => m.MovieDetailPageComponent), canActivate: [MovieGuard], resolve: { data: MovieResolver } },
  ];

